"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { ISkill } from "@/models/Skill";

const categories = ["Frontend", "Backend", "Database", "Tools", "Other"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [form, setForm] = useState({ name: "", category: "Frontend", level: 70 });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data.skills || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", category: "Frontend", level: 70 });
    load();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Skills</h2>

      <form
        onSubmit={handleAdd}
        className="flex flex-wrap gap-3 items-end mb-8 rounded-lg border border-border bg-surface p-4"
      >
        <div>
          <label className="text-xs font-mono text-muted block mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md bg-surface2 border border-border px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted block mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-md bg-surface2 border border-border px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-mono text-muted block mb-1">
            Level ({form.level}%)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={form.level}
            onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm text-white hover:bg-accent2"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {loading ? (
        <p className="text-muted text-sm">Loading...</p>
      ) : (
        <div className="space-y-2">
          {skills.map((s) => (
            <div
              key={s._id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-accent2 w-20">
                  {s.category}
                </span>
                <span className="text-sm">{s.name}</span>
                <span className="text-xs text-muted font-mono">{s.level}%</span>
              </div>
              <button
                onClick={() => handleDelete(s._id!)}
                className="p-1.5 rounded hover:bg-surface2 text-muted hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-muted text-sm">No skills yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
