"use client";

import { useEffect, useState } from "react";

type ScheduleItem = {
  _id: string;
  name: string;
  location: string;
  host: string;
  description: string;
  event_created_by: string;
  start_time: string; // ISO
  end_time: string;   // ISO
  column: 1 | 2 | 3 | 4;
  discord_auto_announce: boolean;
  event_type: "ceremony" | "workshop" | "food" | "fireside chat" | "mentoring" | "event";
};

const EVENT_TYPES = ["ceremony", "workshop", "food", "fireside chat", "mentoring", "event"] as const;

export default function SchedulePage() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    host: "",
    description: "",
    event_created_by: "",
    start_time: "",
    end_time: "",
    column: 1 as 1 | 2 | 3 | 4,
    discord_auto_announce: false,
    event_type: "event" as ScheduleItem["event_type"],
  });

  const fetchItems = async () => {
    const res = await fetch("/api/schedule", { cache: "no-store" });
    if (!res.ok) return;
    const data: ScheduleItem[] = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        // `datetime-local` gives 'YYYY-MM-DDTHH:mm'; send ISO for backend Date
        start_time: new Date(form.start_time).toISOString(),
        end_time: new Date(form.end_time).toISOString(),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert("Failed to create schedule" + (err?.fields ? `: ${err.fields.join(", ")}` : ""));
      return;
    }

    const created: ScheduleItem = await res.json();
    // Keep list sorted by start_time ascending
    setItems((prev) => [...prev, created].sort((a, b) => +new Date(a.start_time) - +new Date(b.start_time)));
    // reset minimal fields
    setForm((f) => ({ ...f, name: "", description: "", start_time: "", end_time: "", location: "", host: "", event_created_by: "", column: 1, event_type: "event", discord_auto_announce: false }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Schedule</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 520, marginBottom: 16 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Host" value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Created by" value={form.event_created_by} onChange={(e) => setForm({ ...form, event_created_by: e.target.value })} />

        <label>
          Start time
          <input
            type="datetime-local"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
          />
        </label>

        <label>
          End time
          <input
            type="datetime-local"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
          />
        </label>

        <label>
          Column (1-4)
          <select
            value={form.column}
            onChange={(e) => setForm({ ...form, column: Number(e.target.value) as 1 | 2 | 3 | 4 })}
          >
            {[1, 2, 3, 4].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Event type
          <select
            value={form.event_type}
            onChange={(e) => setForm({ ...form, event_type: e.target.value as ScheduleItem["event_type"] })}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.discord_auto_announce}
            onChange={(e) => setForm({ ...form, discord_auto_announce: e.target.checked })}
          />
          Discord auto announce
        </label>

        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Create"}</button>
      </form>

      <ul>
        {items.map((it) => (
          <li key={it._id} style={{ marginBottom: 8 }}>
            <strong>{it.name}</strong> — {it.location} · {it.host} · {it.event_type} · col {it.column} ·{" "}
            {new Date(it.start_time).toLocaleString()} → {new Date(it.end_time).toLocaleString()} ·{" "}
            {it.discord_auto_announce ? "🔔 announces" : "no announce"}
            {" Event added by " + it.event_created_by}
            <div style={{ color: "#555" }}>{it.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
