"use client";

import { useState, useEffect, useRef } from "react";

// --- Grid constants ---
const CELL    = 60;
const GAP     = 8;
const PITCH   = CELL + GAP; // 68px
const NAVBAR_H = 72;        // height reserved for the fixed navbar

// Dot pattern for the baseplate — uses CSS vars so theme toggle works automatically
const DOT_BG = {
  backgroundImage:    "radial-gradient(circle, var(--dot-color) 2.5px, transparent 2.5px)",
  backgroundSize:     `${PITCH}px ${PITCH}px`,
  backgroundPosition: `${CELL / 2}px ${CELL / 2}px`,
};

// Slightly brighter dots on piece surface
const DOT_BG_PIECE = {
  backgroundImage:    "radial-gradient(circle, var(--piece-dot-color) 2.5px, transparent 2.5px)",
  backgroundSize:     `${PITCH}px ${PITCH}px`,
  backgroundPosition: `${CELL / 2}px ${CELL / 2}px`,
};

// --- Pure helpers ---
function pieceSize(cols, rows) {
  return { w: cols * PITCH - GAP, h: rows * PITCH - GAP };
}
function piecePos(col, row) {
  return { x: col * PITCH, y: row * PITCH };
}
function snapToGrid(rawX, rawY, pieceCols, pieceRows, maxCols, maxRows) {
  const col = Math.max(0, Math.min(Math.round(rawX / PITCH), maxCols - pieceCols));
  const row = Math.max(0, Math.min(Math.round(rawY / PITCH), maxRows - pieceRows));
  return { col, row };
}
function hasCollision(pieces, activeId, col, row, cols, rows) {
  return pieces.some((p) => {
    if (p.id === activeId) return false;
    return col < p.col + p.cols &&
           col + cols > p.col &&
           row < p.row + p.rows &&
           row + rows > p.row;
  });
}

// --- Pure helpers (module-level, no React) ---
function calcBoardDims() {
  if (typeof window === "undefined") return { cols: 20, rows: 12 };
  return {
    cols: Math.floor(window.innerWidth / PITCH),
    rows: Math.floor((window.innerHeight - NAVBAR_H) / PITCH),
  };
}
function calcInitialPieces(cols, rows) {
  const colOffset   = Math.max(0, Math.floor((cols - 14) / 2));
  const leftH       = Math.min(8, rows - 1);
  const rightTopH   = Math.min(4, Math.floor(leftH / 2));
  const rightBotRow = rightTopH + 1;
  const rightBotH   = Math.min(3, leftH - rightBotRow);
  return [
    { id: 1, col: colOffset + 0,  row: 0,           cols: 5, rows: leftH    },
    { id: 2, col: colOffset + 6,  row: 0,           cols: 8, rows: rightTopH },
    { id: 3, col: colOffset + 6,  row: rightBotRow, cols: 4, rows: rightBotH },
    { id: 4, col: colOffset + 11, row: rightBotRow, cols: 3, rows: rightBotH },
  ];
}

// --- Component ---
export default function LegoBoard() {
  const [boardCols, setBoardCols] = useState(() => calcBoardDims().cols);
  const [boardRows, setBoardRows] = useState(() => calcBoardDims().rows);
  const [pieces, setPieces]       = useState(() => {
    const { cols, rows } = calcBoardDims();
    return cols > 0 ? calcInitialPieces(cols, rows) : null;
  });
  const [dragging, setDragging]   = useState(null);
  const boardRef                  = useRef(null);

  // Resize listener only — no setState in synchronous effect body
  useEffect(() => {
    function handleResize() {
      const { cols, rows } = calcBoardDims();
      setBoardCols(cols);
      setBoardRows(rows);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Window-level drag listeners (only active while dragging)
  useEffect(() => {
    if (!dragging || !pieces) return;

    function handleMouseMove(e) {
      const rect = boardRef.current.getBoundingClientRect();
      setDragging((prev) => ({
        ...prev,
        currentX: e.clientX - rect.left,
        currentY: e.clientY - rect.top,
      }));
    }

    function handleMouseUp() {
      const active = pieces.find((p) => p.id === dragging.id);
      const rawX   = dragging.currentX - dragging.offsetX;
      const rawY   = dragging.currentY - dragging.offsetY;
      const { col, row } = snapToGrid(rawX, rawY, active.cols, active.rows, boardCols, boardRows);

      // Only commit if the target slot is free; otherwise piece reverts automatically
      if (!hasCollision(pieces, dragging.id, col, row, active.cols, active.rows)) {
        setPieces((prev) =>
          prev.map((p) => (p.id === dragging.id ? { ...p, col, row } : p))
        );
      }
      setDragging(null);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup",   handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup",   handleMouseUp);
    };
  }, [dragging, pieces, boardCols, boardRows]);

  function handleMouseDown(e, piece) {
    e.preventDefault();
    const rect    = boardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - piece.col * PITCH;
    const offsetY = e.clientY - rect.top  - piece.row * PITCH;
    setDragging({
      id: piece.id,
      offsetX,
      offsetY,
      currentX: e.clientX - rect.left,
      currentY: e.clientY - rect.top,
    });
  }

  // Compute ghost position + collision state while dragging
  let ghost = null;
  if (dragging && pieces) {
    const active   = pieces.find((p) => p.id === dragging.id);
    const rawX     = dragging.currentX - dragging.offsetX;
    const rawY     = dragging.currentY - dragging.offsetY;
    const { col, row } = snapToGrid(rawX, rawY, active.cols, active.rows, boardCols, boardRows);
    const collides = hasCollision(pieces, dragging.id, col, row, active.cols, active.rows);
    const { x, y } = piecePos(col, row);
    const { w, h } = pieceSize(active.cols, active.rows);
    ghost = { x, y, w, h, collides };
  }

  // Don't render until measured (prevents layout flash)
  if (!pieces) return null;

  return (
    <div
      ref={boardRef}
      style={{
        width:      "100%",
        height:     "100%",
        position:   "relative",
        overflow:   "hidden",
        userSelect: "none",
        ...DOT_BG,
      }}
    >
      {/* Ghost — dashed outline at snap target, red if blocked */}
      {ghost && (
        <div
          style={{
            position:        "absolute",
            left:            ghost.x,
            top:             ghost.y,
            width:           ghost.w,
            height:          ghost.h,
            border:          `2px dashed ${ghost.collides ? "rgba(239,68,68,0.6)" : "var(--ghost-border)"}`,
            borderRadius:    8,
            backgroundColor: ghost.collides ? "rgba(239,68,68,0.06)" : "var(--ghost-bg)",
            pointerEvents:   "none",
            transition:      "left 60ms ease, top 60ms ease",
          }}
        />
      )}

      {/* Pieces */}
      {pieces.map((piece) => {
        const isDragging = dragging?.id === piece.id;
        const { w, h }   = pieceSize(piece.cols, piece.rows);
        let x, y;
        if (isDragging) {
          x = dragging.currentX - dragging.offsetX;
          y = dragging.currentY - dragging.offsetY;
        } else {
          ({ x, y } = piecePos(piece.col, piece.row));
        }

        return (
          <div
            key={piece.id}
            onMouseDown={(e) => handleMouseDown(e, piece)}
            style={{
              position:        "absolute",
              left:            x,
              top:             y,
              width:           w,
              height:          h,
              backgroundColor: "var(--piece-bg)",
              border:          "1px solid var(--piece-border)",
              borderRadius:    8,
              cursor:          isDragging ? "grabbing" : "grab",
              zIndex:          isDragging ? 10 : 1,
              // Transition only when at rest — animates snap-back on revert too
              transition:      isDragging ? "none" : "left 150ms ease, top 150ms ease",
              ...DOT_BG_PIECE,
            }}
          />
        );
      })}
    </div>
  );
}
