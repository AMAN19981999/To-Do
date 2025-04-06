"use client";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // const updateTask = async (id: number, completed: boolean) => {
  //   await fetch(`/api/tasks/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ completed }),
  //   });
  //   fetchTasks();
  // };

  // const updateTaskTitle = async (id: number, title: string) => {
  //   await fetch(`/api/tasks/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ title }),
  //   });
  //   setEditingId(null);
  //   setEditingTitle("");
  //   fetchTasks();
  // };
 

  const updateTask = async (id: number, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // ✅ This is important
      },
      body: JSON.stringify({ completed }),
    });
    fetchTasks();
  };
  
  const updateTaskTitle = async (id: number, title: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // ✅ This is important
      },
      body: JSON.stringify({ title }),
    });
    setEditingId(null);
    setEditingTitle("");
    fetchTasks();
  };
  







  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    return !task.completed;
  });

  return (
    <div className="space-y-6">
      {/* Task Form */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <TaskForm onAdd={fetchTasks} />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as "all" | "completed" | "pending")}

            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === f
                ? " bg-gray-800 text-white"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            {editingId === task.id ? (
              <input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={() => updateTaskTitle(task.id, editingTitle)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTaskTitle(task.id, editingTitle);
                  }
                }}
                autoFocus
                className="flex-1 mr-4 px-2 py-1 border border-gray-300 rounded-md text-gray-800"
              />
            ) : (
              <span
                className={`text-lg font-medium flex-1 ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800 cursor-pointer"
                }`}
                onDoubleClick={() => {
                  if (!task.completed) {
                    setEditingId(task.id);
                    setEditingTitle(task.title);
                  }
                }}
              >
                {task.title}
              </span>
            )}

            <div className="flex items-center gap-3">
              {!task.completed && editingId !== task.id && (
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setEditingTitle(task.title);
                  }}
                  className="px-3 py-1 text-sm rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => updateTask(task.id, !task.completed)}
                className="px-3 py-1 text-sm rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
