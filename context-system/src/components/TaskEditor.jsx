import { useState } from "react";

export default function TaskEditor({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  const handleSave = () => {
    if (!title) return alert("Enter task title");
    onAddTask(title, context);
    setTitle("");
    setContext("");
  };

  return (
    <div className="card">
      <h3>📝 Task Editor</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Context notes (what you did, why, next steps)"
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />

      <button onClick={handleSave}>Save Task</button>
    </div>
  );
}
