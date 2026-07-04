"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) {
      window.location.assign("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-ink px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-surface p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock size={18} className="text-accent" />
          <h1 className="font-display text-xl font-semibold">Admin Login</h1>
        </div>

        <label className="block text-xs font-mono text-muted mb-1.5">
          Username
        </label>
        <input
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full rounded-md bg-surface2 border border-border px-4 py-2.5 text-sm outline-none focus:border-accent mb-4"
        />

        <label className="block text-xs font-mono text-muted mb-1.5">
          Password
        </label>
        <input
          required
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-md bg-surface2 border border-border px-4 py-2.5 text-sm outline-none focus:border-accent mb-6"
        />

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent px-5 py-2.5 font-medium text-sm text-white hover:bg-accent2 transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
