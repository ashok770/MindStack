import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../tasks/addTask";
import { getUserTasks } from "../../tasks/getTasks";

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [contextNotes, setContextNotes] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const userTasks = await getUserTasks();
      setTasks(userTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      alert("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    if (!contextNotes.trim()) {
      alert("Please add context notes (what you did, why, next steps)");
      return;
    }

    setSaving(true);
    try {
      await addTask(title.trim(), contextNotes.trim());
      setTitle("");
      setContextNotes("");
      await loadTasks(); // Reload tasks to show the new one
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString() + " " + timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div>
      <div className="card">
        <h3>📝 Add New Task</h3>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task title (e.g., Learn React Hooks, Build API integration)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
          />
          <textarea
            placeholder="Context notes: What you did, why you did it, and what's next..."
            value={contextNotes}
            onChange={(e) => setContextNotes(e.target.value)}
            rows={6}
            disabled={saving}
          />
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Task"}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>📂 Your Tasks ({tasks.length})</h3>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={{ color: "#6b7280", fontStyle: "italic" }}>
            No tasks yet. Create your first task above to get started!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="task-item"
              onClick={() => navigate(`/resume/${task.id}`)}
              style={{ cursor: "pointer" }}
            >
              <strong style={{ fontSize: "16px", display: "block", marginBottom: "4px" }}>
                {task.title}
              </strong>
              <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
                Last updated: {formatDate(task.lastUpdated)}
              </div>
              <div style={{ fontSize: "13px", color: "#4b5563", maxHeight: "60px", overflow: "hidden", textOverflow: "ellipsis" }}>
                {task.contextNotes?.substring(0, 100)}
                {task.contextNotes?.length > 100 ? "..." : ""}
              </div>
              <div style={{ marginTop: "8px", color: "#2563eb", fontSize: "12px", fontWeight: "500" }}>
                Click to resume with AI →
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}