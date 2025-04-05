"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    setTitle("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
         className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition font-medium"
      >
        Add
      </button>
    </form>
  );
}
