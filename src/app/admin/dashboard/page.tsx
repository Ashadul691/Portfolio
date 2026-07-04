"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminSkills from "@/components/admin/AdminSkills";
import AdminMessages from "@/components/admin/AdminMessages";

const tabs = ["Projects", "Skills", "Messages"] as const;

export default function Dashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Projects");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-ink">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-semibold">
            <LayoutDashboard size={18} className="text-accent" /> Dashboard
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-red-400"
          >
            <LogOut size={15} /> logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-mono border-b-2 -mb-px transition-colors ${
                tab === t
                  ? "border-accent text-text"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              {t.toLowerCase()}
            </button>
          ))}
        </div>

        {tab === "Projects" && <AdminProjects />}
        {tab === "Skills" && <AdminSkills />}
        {tab === "Messages" && <AdminMessages />}
      </div>
    </main>
  );
}
