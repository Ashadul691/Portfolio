import SectionHeading from "./SectionHeading";

const education = [
  {
    hash: "a1c9e2f",
    degree: "B.Sc. in Computer Science & Engineering",
    place: "International Islamic University Chittagong (IIUC)",
    period: "2023 — Present",
    cgpa:"3.6/4",
    detail:
      "Coursework spanning data structures, databases, and web application development. Building backend-focused course and personal projects alongside the curriculum.",
  },
  {
    hash: "7f0b41d",
    degree: "Higher Secondary Certificate (HSC)",
    place: "Chittagong Port Colleage",
    //period: "2021 — 2023",
    detail: "Science group.",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="education" title="Educational background" />

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-10">
            {education.map((e) => (
              <div key={e.hash} className="relative">
                <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-ink border-2 border-accent" />
                <p className="font-mono text-xs text-accent2">
                  commit {e.hash} <span className="text-muted">· {e.period}</span>
                </p>
                <h3 className="font-display text-lg font-semibold mt-1.5">
                  {e.degree}
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
