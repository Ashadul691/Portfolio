"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { contact } from "@/data/social";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="contact"
          title="Let's work together"
          subtitle="Have a role, project, or question? Reach out directly or send a message — it lands straight in my dashboard."
        />

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-5">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface px-5 py-4 hover:border-accent/50 transition-colors"
            >
              <Mail className="text-accent" size={20} />
              <div>
                <p className="text-xs font-mono text-muted">Email</p>
                <p className="text-sm">{contact.email}</p>
              </div>
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface px-5 py-4 hover:border-accent/50 transition-colors"
            >
              <Phone className="text-accent" size={20} />
              <div>
                <p className="text-xs font-mono text-muted">Phone</p>
                <p className="text-sm">{contact.phone}</p>
              </div>
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-border bg-surface px-5 py-4 hover:border-accent/50 transition-colors"
            >
              <MessageCircle className="text-accent" size={20} />
              <div>
                <p className="text-xs font-mono text-muted">WhatsApp</p>
                <p className="text-sm">{contact.whatsapp}</p>
              </div>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md bg-surface border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md bg-surface border border-border px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <textarea
              required
              rows={4}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md bg-surface border border-border px-4 py-3 text-sm outline-none focus:border-accent resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-md bg-accent px-5 py-3 font-medium text-sm text-white hover:bg-accent2 transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-emerald-400">
                Thanks — your message has been sent!
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
