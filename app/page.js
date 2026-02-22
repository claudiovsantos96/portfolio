"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, ArrowUpRight } from "lucide-react";

// ─── Grid: 12 cols × 54px + 11 gutters × 24px = 912px ───────────────────────
const COLS   = 12;
const COL_W  = 54;
const GUTTER = 24;
const GRID_W = COLS * COL_W + (COLS - 1) * GUTTER; // 912px
function span(n) { return n * COL_W + (n - 1) * GUTTER; }

// ─── Flags ───────────────────────────────────────────────────────────────────
function FlagPT() {
  return (
    <span style={{ display: "inline-block", width: 13.5, height: 9, verticalAlign: "middle", position: "relative", top: -1, overflow: "hidden", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/flag-pt.svg" alt="PT" style={{ width: "100%", height: "100%", display: "block" }} />
    </span>
  );
}

function FlagDE() {
  return (
    <span style={{ display: "inline-block", width: 13.5, height: 9, verticalAlign: "middle", position: "relative", top: -1, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ height: 3, backgroundColor: "#000" }} />
      <div style={{ height: 3, backgroundColor: "#DD0000" }} />
      <div style={{ height: 3, backgroundColor: "#FFCC00" }} />
    </span>
  );
}

// ─── Figma-style hover frame ──────────────────────────────────────────────────
const FIGMA_BLUE = "#0d99ff";
const PAD = 4;

function ProductDesignerText() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [dims,    setDims]    = useState({ w: 0, h: 0 });

  function onEnter() {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setDims({ w: Math.round(r.width), h: Math.round(r.height) });
    }
    setHovered(true);
  }

  const insetX = -(PAD + 1);
  const insetY = -PAD;

  const handleBase = {
    position: "absolute", width: 7, height: 7,
    backgroundColor: "#fff",
    border: `1.5px solid ${FIGMA_BLUE}`,
    pointerEvents: "none",
    opacity: hovered ? 1 : 0,
    transition: "opacity 150ms ease-in-out",
  };
  const hx = -(PAD + 3.5);
  const hy = -(PAD - 1 + 3.5);

  return (
    <span
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "inline", cursor: "default" }}
    >
      Product Designer
      {/* Border */}
      <span style={{
        position: "absolute", top: insetY, bottom: insetY, left: insetX, right: insetX,
        border: `1.5px solid ${FIGMA_BLUE}`, borderRadius: 1, pointerEvents: "none",
        opacity: hovered ? 1 : 0, transition: "opacity 150ms ease-in-out",
      }} />
      {/* Handles */}
      <span style={{ ...handleBase, top: hy,    left: hx  }} />
      <span style={{ ...handleBase, top: hy,    right: hx }} />
      <span style={{ ...handleBase, bottom: hy, left: hx  }} />
      <span style={{ ...handleBase, bottom: hy, right: hx }} />
      <span style={{ ...handleBase, top: hy,    left: "calc(50% - 3.5px)" }} />
      <span style={{ ...handleBase, bottom: hy, left: "calc(50% - 3.5px)" }} />
      {/* Label — above */}
      <span style={{
        position: "absolute",
        bottom: `calc(100% + ${PAD - 1 + 8}px)`,
        left: "50%", transform: "translateX(-50%)",
        backgroundColor: FIGMA_BLUE, color: "#fff",
        fontFamily: "var(--font-geist-mono), monospace", fontWeight: 400,
        fontSize: 10, lineHeight: 1, padding: "3px 5px", borderRadius: 2,
        whiteSpace: "nowrap", pointerEvents: "none", zIndex: 10,
        opacity: hovered ? 1 : 0, transition: "opacity 150ms ease-in-out",
      }}>
        {dims.w} × {dims.h}
      </span>
    </span>
  );
}

// ─── Pixelmatters link ────────────────────────────────────────────────────────
function PixelmattersLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://pixelmatters.com"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: "#ff8904",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: 3,
        transition: "text-decoration 150ms ease-in-out",
      }}
    >
      Pixelmatters
    </a>
  );
}

// ─── Collapsible section ──────────────────────────────────────────────────────
function Section({ label, children, defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [hovered,  setHovered]  = useState(false);

  return (
    <div style={{ marginTop: 64 }}>
      <div
        onClick={() => setExpanded(e => !e)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "4px 8px",
          borderRadius: 9999,
          cursor: "pointer",
          backgroundColor: hovered ? "var(--section-hover)" : "transparent",
          transition: "background-color 150ms ease",
          userSelect: "none",
        }}
      >
        <span style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontWeight: 400, fontSize: 13, lineHeight: 1,
          color: "#737373", whiteSpace: "nowrap",
        }}>
          {label}
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: "var(--divider)" }} />
      </div>

      <div style={{
        overflow: "hidden",
        maxHeight: expanded ? 3000 : 0,
        opacity: expanded ? 1 : 0,
        transition: "max-height 400ms ease-in-out, opacity 250ms ease",
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Work card ────────────────────────────────────────────────────────────────
function WorkCard({ label, width }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width, height: 309, flexShrink: 0,
        backgroundColor: "var(--card-bg)",
        border: "0.5px solid var(--card-border)",
        borderRadius: 6,
        cursor: "pointer",
        transition: "background-color 150ms ease",
        padding: 10,
        display: "flex", flexDirection: "column",
        ...(hovered && { backgroundColor: "color-mix(in srgb, var(--card-bg) 85%, white)" }),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontWeight: 400, fontSize: 12, lineHeight: 1.6,
          color: "var(--title)", letterSpacing: "1.44px",
        }}>
          {label}
        </span>
        <ArrowUpRight size={16} color="var(--title)" />
      </div>
      <div style={{
        flex: 1, marginTop: 8,
        border: "0.5px solid rgba(255,255,255,0.12)",
        borderRadius: 4,
      }} />
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────
const CAROUSEL_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8];

function Carousel() {
  const [paused, setPaused] = useState(false);
  const items = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS]; // duplicate for seamless loop

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        marginLeft:  `calc(-50vw + ${GRID_W / 2}px)`,
        marginRight: `calc(-50vw + ${GRID_W / 2}px)`,
        overflow: "hidden",
        marginTop: 20,
      }}
    >
      <div style={{
        display: "flex",
        gap: GUTTER,
        animationName: "carouselScroll",
        animationDuration: "35s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationPlayState: paused ? "paused" : "running",
        width: "fit-content",
      }}>
        {items.map((_, i) => (
          <div
            key={i}
            style={{
              width: 198, height: 352,
              backgroundColor: "var(--card-bg)",
              border: "0.5px solid var(--card-border)",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Thought item ─────────────────────────────────────────────────────────────
const THOUGHTS = [
  { title: "The Gray-fication of Our World",          date: "Dec. '23" },
  { title: "Building a Design System: What, How and Why?", date: "Dec. '23" },
  { title: "Journey and learnings in the world of Web 3",  date: "Dec. '23" },
];

function ThoughtItem({ title, date }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: 600,
        padding: "6px 8px",
        borderRadius: 4,
        cursor: "pointer",
        backgroundColor: hovered ? "var(--section-hover)" : "transparent",
        transition: "background-color 150ms ease",
      }}
    >
      <span style={{
        fontFamily: "var(--font-geist-mono), monospace",
        fontWeight: 400, fontSize: 15, lineHeight: 1.6,
        color: "var(--title)",
      }}>
        {title}
      </span>
      <span style={{
        fontFamily: "var(--font-geist-mono), monospace",
        fontWeight: 400, fontSize: 15, lineHeight: 1.6,
        color: "#a3a3a3",
        flexShrink: 0, marginLeft: 16,
      }}>
        {date}
      </span>
    </div>
  );
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const dark = localStorage.getItem("theme") !== "light";
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, []);

  function setMode(dark) {
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  const activeBtn = {
    width: 34, height: 34, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
    background: "linear-gradient(to bottom, var(--toggle-active-from), var(--toggle-active-to))",
    border: "0.5px solid var(--toggle-active-border)",
    boxShadow: "var(--toggle-active-shadow)",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
  const idleBtn = {
    width: 34, height: 34, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
    background: "none", border: "none",
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  return (
    <div style={{
      display: "flex", gap: 4,
      padding: "3px 2px", height: 40,
      borderRadius: 9999, backgroundColor: "var(--toggle-pill)",
      alignItems: "center",
    }}>
      <button onClick={() => setMode(true)}  style={isDark  ? activeBtn : idleBtn} aria-label="Dark mode">
        <Moon size={16} color="var(--toggle-icon)" />
      </button>
      <button onClick={() => setMode(false)} style={!isDark ? activeBtn : idleBtn} aria-label="Light mode">
        <Sun  size={16} color="var(--toggle-icon)" />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh", transition: "background 200ms ease" }}>

      {/* ── Fixed top bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "center",
        backgroundColor: "var(--topbar-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}>
        <div style={{
          width: GRID_W, height: 64,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          paddingBottom: 0,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
            position: "relative", overflow: "hidden",
            border: "1px solid var(--logo-border)",
            boxShadow: "0px 1px 2px var(--logo-shadow)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo_1.png" alt="logo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: "inset 0px 1px 1px var(--logo-highlight)", pointerEvents: "none" }} />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: GRID_W, paddingTop: 88 }}>

          {/* ── Title ── */}
          <p style={{
            marginTop: 64, marginBottom: 0,
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 400, fontSize: 18, lineHeight: 1.6,
            color: "var(--title)",
            whiteSpace: "nowrap",
            transition: "color 200ms ease",
          }}>
            Claudio Santos : <ProductDesignerText />
          </p>

          {/* ── Text block — 7 of 12 cols ── */}
          <div style={{ marginTop: 16, width: span(7), display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--body)", transition: "color 200ms ease" }}>
              My craft started by designing signatures for gaming forums and playing around with a{" "}
              <span style={{ textDecoration: "line-through", color: "var(--strike)" }}>pirated</span>
              {" "}Sony Vegas. It evolved by zooming out and ctrl+z&apos;ing!
            </p>

            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--body)", transition: "color 200ms ease" }}>
              Currently designing products at <PixelmattersLink />, a digital studio focused on quality.
            </p>

            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--body)", transition: "color 200ms ease" }}>
              Vibing from <FlagPT /> Portugal, engineered in <FlagDE /> Germany. I&apos;m a huge fan of BoJack Horseman, visiting the globe, doing sports and finances.
            </p>
          </div>

          {/* ── Work section ── */}
          <Section label="work">
            <div style={{ display: "flex", gap: GUTTER, marginTop: 20 }}>
              <WorkCard label="AMIGO"     width={span(5)} />
              <WorkCard label="CJ MOBILE" width={span(7)} />
            </div>
          </Section>

          {/* ── Thoughts section ── */}
          <Section label="thoughts">
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 16 }}>
              {THOUGHTS.map((t, i) => (
                <ThoughtItem key={i} title={t.title} date={t.date} />
              ))}
            </div>
          </Section>

          {/* ── Around the globe section ── */}
          <Section label="around the globe">
            <Carousel />
          </Section>

          <div style={{ height: 80 }} />
        </div>
      </div>
    </div>
  );
}
