"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="text-white font-semibold text-base tracking-tight">
          claudio<span className="text-neutral-400">.</span>
        </a>
        <div className="flex items-center gap-8">
          <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">
            About
          </a>
          <a href="#work" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Work
          </a>
          <a
            href="#contact"
            className="text-sm bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
