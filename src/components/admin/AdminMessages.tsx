"use client";

import { IMessage } from "@/models/Message";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/messages", { credentials: "include" });
      const data = await res.json().catch(() => ({ messages: [] }));
      setMessages(res.ok ? data.messages || [] : []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(m: IMessage) {
    await fetch(`/api/messages/${m._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
      credentials: "include",
    });
    load();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/messages/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    load();
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">
        Messages from visitors
      </h2>

      {loading ? (
        <p className="text-muted text-sm">Loading...</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`rounded-lg border px-4 py-3 ${
                m.read ? "border-border bg-surface" : "border-accent/40 bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {m.name} <span className="text-muted font-normal">— {m.email}</span>
                  </p>
                  <p className="text-sm text-muted mt-1">{m.message}</p>
                  <p className="text-xs text-muted font-mono mt-2">
                    {m.createdAt && new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleRead(m)}
                    className="p-1.5 rounded hover:bg-surface2 text-muted hover:text-accent2"
                    title={m.read ? "Mark unread" : "Mark read"}
                  >
                    {m.read ? <MailOpen size={15} /> : <Mail size={15} />}
                  </button>
                  <button
                    onClick={() => handleDelete(m._id!)}
                    className="p-1.5 rounded hover:bg-surface2 text-muted hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-muted text-sm">No messages yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
