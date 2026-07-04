import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import { fallbackProjects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

async function getProject(slug: string): Promise<IProject | null> {
  try {
    await connectDB();
    const project = await Project.findOne({ slug }).lean();
    if (project) return JSON.parse(JSON.stringify(project));
  } catch {
    // fall through to fallback data below
  }
  return fallbackProjects.find((p) => p.slug === slug) ?? null;
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <main>
      <Navbar />
      <article className="pt-28 pb-20 max-w-3xl mx-auto px-5 sm:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent2 transition-colors"
        >
          <ArrowLeft size={15} /> back to projects
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-6">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-1 rounded bg-surface2 text-accent2"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="rounded-xl overflow-hidden border border-border mt-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent2 transition-colors"
            >
              <ExternalLink size={15} /> Live Project
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm hover:border-accent/50 transition-colors"
            >
              <Github size={15} /> GitHub (client)
            </a>
          )}
        </div>

        <section className="mt-10 space-y-8 text-muted leading-relaxed">
          <div>
            <h2 className="font-mono text-sm text-accent mb-2">
              {"// description"}
            </h2>
            <p>{project.description}</p>
          </div>

          {project.challenges && (
            <div>
              <h2 className="font-mono text-sm text-accent mb-2">
                {"// challenges"}
              </h2>
              <p>{project.challenges}</p>
            </div>
          )}

          {project.improvements && (
            <div>
              <h2 className="font-mono text-sm text-accent mb-2">
                {"// future improvements"}
              </h2>
              <p>{project.improvements}</p>
            </div>
          )}
        </section>
      </article>
      <Footer />
    </main>
  );
}
