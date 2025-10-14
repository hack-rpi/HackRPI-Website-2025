"use client";

import { useEffect, useState } from "react";

type Cat = {
  _id: string;
  name: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
};

export default function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    const res = await fetch("/api/cats", { cache: "no-store" });
    if (!res.ok) return;
    const data: Cat[] = await res.json();
    setCats(data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const res = await fetch("/api/cats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Mittens",
        age: 3,
        color: "orange",
        isFriendly: true
      })
    });

    setLoading(false);

    if (!res.ok) return alert("Failed to create cat");

    const created: Cat = await res.json();
    setCats((prev) => [created, ...prev]);
    setName("");
    setAge(0)
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cats</h1>

      <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
        <input
          placeholder="Cat name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Cat age"
          value={age ? age : 0}
          onChange={(e) => setAge(Number(e.target.value))}
          style={{ marginRight: 8 }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create"}
        </button>
      </form>

      <ul>
        {cats.map((c) => (
          <li key={c._id}>
            <strong>{c.name}</strong>{" "}
            <small>{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</small>
            <small>{c.age ? c.age : 0}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
