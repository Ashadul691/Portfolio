"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Pencil, X } from "lucide-react";
import { IProject } from "@/models/Project";

const emptyForm: IProject = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  image: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
  challenges: "",
  improvements: "",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [editing, setEditing] = useState<IProject | null>(null);
  const [form, setForm] = useState<IProject>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(p: IProject) {
    setEditing(p);
    setForm(p);
    setShowForm(true);
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    load();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      techStack:
        typeof form.techStack === "string"
          ? (form.techStack as unknown as string)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : form.techStack,
    };

    if (editing) {
      await fetch(`/api/projects/${editing.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowForm(false);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">Projects</h2>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm text-white hover:bg-accent2"
        >
          <Plus size={16} /> New project
        </button>
      </div>

      {loading ? (
        <p className="text-muted text-sm">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-xs text-muted font-mono">/{p.slug}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(p)}
                    className="p-1.5 rounded hover:bg-surface2 text-muted hover:text-accent2"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.slug)}
                    className="p-1.5 rounded hover:bg-surface2 text-muted hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted mt-2 line-clamp-2">{p.summary}</p>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-muted text-sm">
              No projects yet. Click &quot;New project&quot; to add one.
            </p>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-surface p-6 space-y-3"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold">
                {editing ? "Edit project" : "New project"}
              </h3>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={18} className="text-muted" />
              </button>
            </div>

            {[
              ["title", "Title"],
              ["slug", "Slug (url-friendly, unique)"],
              ["image", "Image URL (e.g. /projects/name.png)"],
              ["liveUrl", "Live URL (optional)"],
              ["githubUrl", "GitHub URL (client)"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="text-xs font-mono text-muted">{label}</label>
                <input
                  value={(form as unknown as Record<string, string>)[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full mt-1 rounded-md bg-surface2 border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  required={key === "title" || key === "slug" || key === "image"}
                />
              </div>
            ))}

            <div>
              <label className="text-xs font-mono text-muted">
                Tech stack (comma separated)
              </label>
              <input
                value={
                  Array.isArray(form.techStack)
                    ? form.techStack.join(", ")
                    : form.techStack
                }
                onChange={(e) =>
                  setForm({ ...form, techStack: e.target.value as unknown as string[] })
                }
                className="w-full mt-1 rounded-md bg-surface2 border border-border px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            {[
              ["summary", "Short summary (shown on card)"],
              ["description", "Full description"],
              ["challenges", "Challenges faced"],
              ["improvements", "Future improvements"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="text-xs font-mono text-muted">{label}</label>
                <textarea
                  rows={2}
                  value={(form as unknown as Record<string, string>)[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full mt-1 rounded-md bg-surface2 border border-border px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                  required={key === "summary" || key === "description"}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full rounded-md bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent2 mt-2"
            >
              {editing ? "Save changes" : "Create project"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
