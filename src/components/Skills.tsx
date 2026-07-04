import { connectDB } from "@/lib/mongodb";
import Skill, { ISkill } from "@/models/Skill";
import SectionHeading from "./SectionHeading";

const fallbackSkills: ISkill[] = [
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "TypeScript", category: "Frontend", level: 80 },
  { name: "React / Next.js", category: "Frontend", level: 75 },
  { name: "Tailwind CSS", category: "Frontend", level: 80 },
  { name: "Node.js", category: "Backend", level: 85 },
  { name: "Express", category: "Backend", level: 85 },
  { name: "REST API Design", category: "Backend", level: 80 },
  { name: "JWT / Auth", category: "Backend", level: 75 },
  { name: "PostgreSQL", category: "Database", level: 80 },
  { name: "MongoDB", category: "Database", level: 75 },
  { name: "NeonDB", category: "Database", level: 70 },
  { name: "Git & GitHub", category: "Tools", level: 85 },
  { name: "Postman / curl", category: "Tools", level: 80 },
  { name: "Docker", category: "Tools", level: 55 },
];

async function getSkills(): Promise<ISkill[]> {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ category: 1, order: 1 }).lean();
    if (skills.length === 0) return fallbackSkills;
    return JSON.parse(JSON.stringify(skills));
  } catch {
    return fallbackSkills;
  }
}

export default async function Skills() {
  const skills = await getSkills();
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="skills"
          title="What I work with"
          subtitle="Content here is pulled live from MongoDB — update it any time from the admin dashboard."
        />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="font-mono text-sm text-accent mb-4 uppercase tracking-wide">
                {cat}
              </h3>
              <div className="space-y-4">
                {skills
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{s.name}</span>
                        <span className="text-muted font-mono">{s.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
