import { connectDB } from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { fallbackProjects } from "@/data/projects";

async function getProjects(): Promise<IProject[]> {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    if (projects.length === 0) return fallbackProjects;
    return JSON.parse(JSON.stringify(projects));
  } catch {
    return fallbackProjects;
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="projects"
          title="Selected projects"
          subtitle="Managed from the admin dashboard — add, edit, or remove projects any time without touching code."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
