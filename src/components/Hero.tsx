"use client";

import { socials } from "@/data/social";
import { Download, Facebook, Github, Linkedin, Twitter } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 dot-grid bg-grid-fade"
    >
      <div className="max-w-6xl w-full mx-auto px-5 sm:px-8 grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <p className="font-mono text-sm text-accent2 mb-4">
            <span className="caret-blink">_</span> const role ={" "}
            <span className="text-amber">&quot;Backend Web Developer&quot;</span>;
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance">
            Hi, I&apos;m Rafi 
            <br />
            I build reliable{" "}
            <span className="text-accent">APIs</span> and clean{" "}
            <span className="text-accent">web systems</span>.
          </h1>

          <p className="mt-6 text-muted text-base sm:text-lg max-w-xl leading-relaxed">
            Undergraduate CS student and backend-focused developer working with
            TypeScript, Express, PostgreSQL and MongoDB — turning course
            projects into production-shaped systems, one endpoint at a time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-sm text-white hover:bg-accent2 transition-colors"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm text-text hover:border-accent/60 transition-colors"
            >
              View Projects
            </a>
          </div>

          <div className="mt-9 flex items-center gap-5">
            {[
              { href: socials.github, Icon: Github, label: "GitHub" },
              { href: socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: socials.twitter, Icon: Twitter, label: "Twitter" },
              { href: socials.facebook, Icon: Facebook, label: "Facebook" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent2 hover:border-accent/50 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="absolute -inset-4 rounded-2xl bg-accent/10 blur-2xl" />
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl border border-border overflow-hidden bg-surface">
            
            <img
              src="/profile.jpg"
              alt="Portrait of Ashadul"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-surface border border-border rounded-lg px-4 py-2 font-mono text-xs text-muted">
            status: <span className="text-amber">Let&apos;s collaborate!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
