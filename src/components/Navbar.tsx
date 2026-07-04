"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? "bg-ink/85 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <a href="#top" className="font-display font-semibold text-lg tracking-tight">
          <span className="text-accent">&lt;</span>Rafi
          <span className="text-accent">/&gt;</span>
        </a>

        {/* Pill-shaped button group for nav links */}
        <ul className="hidden md:flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm text-muted hover:text-text hover:bg-surface2 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent2 transition-colors"
        >
          Say hi
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
        >
          <span
            className={`block h-px w-6 bg-text transition-transform ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span className={`block h-px w-6 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-6 bg-text transition-transform ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-5 pb-5 text-sm bg-ink/95 border-b border-border">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-muted hover:text-text hover:bg-surface2 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-accent px-4 py-2.5 text-center font-medium text-white"
            >
              Say hi
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}