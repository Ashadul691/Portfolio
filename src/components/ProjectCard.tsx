import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IProject } from "@/models/Project";

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/50 transition-colors">
      <div className="aspect-video bg-surface2 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-muted mt-2 leading-relaxed line-clamp-2">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-1 rounded bg-surface2 text-accent2"
            >
              {t}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 mt-5 text-sm font-mono text-accent hover:text-accent2 transition-colors"
        >
          View Details <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
