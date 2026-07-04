import SectionHeading from "./SectionHeading";

// Add real roles here as you gain professional experience.
// If you have none yet, this section highlights internships,
// freelance work, or significant self-directed projects instead.
const experience = [
  {
    hash: "3d8a90c",
    role: "Independent Backend Projects",
    place: "Self-directed",
    period: "2025 — Present",
    detail:
      "Designed and built REST APIs (DevPulse issue tracker, a football ticket booking system) covering role-based access, JWT auth, and relational data modeling in PostgreSQL, plus MongoDB-backed applications like this portfolio's dashboard.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="experience"
          title="Experience"
          subtitle="Early in my career — here's what I've built so far. Swap this in for internships or jobs as they come."
        />

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-10">
            {experience.map((e) => (
              <div key={e.hash} className="relative">
                <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-ink border-2 border-amber" />
                <p className="font-mono text-xs text-accent2">
                  commit {e.hash} <span className="text-muted">· {e.period}</span>
                </p>
                <h3 className="font-display text-lg font-semibold mt-1.5">
                  {e.role}
                </h3>
                <p className="text-sm text-muted">{e.place}</p>
                <p className="text-sm text-muted mt-2 max-w-xl leading-relaxed">
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
