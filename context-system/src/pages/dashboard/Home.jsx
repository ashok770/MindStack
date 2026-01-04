import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserTasks } from "../../tasks/getTasks";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [taskCount, setTaskCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTaskCount();
  }, []);

  const loadTaskCount = async () => {
    try {
      const tasks = await getUserTasks();
      setTaskCount(tasks.length);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>🧠 Welcome to MindStack</h1>
        <p style={{ fontSize: "18px", color: "#4b5563" }}>
          Your smart productivity & learning dashboard
        </p>
        {user && (
          <p style={{ color: "#6b7280", marginTop: "8px" }}>
            Logged in as: <strong>{user.email}</strong>
          </p>
        )}
      </div>

      <div className="grid">
        <div className="card" style={{ cursor: "pointer" }} onClick={() => navigate("/tasks")}>
          <h3 style={{ marginTop: 0 }}>📝 Tasks</h3>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
            Create and manage your learning tasks with context
          </p>
          {!loading && (
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>
              {taskCount} {taskCount === 1 ? "task" : "tasks"}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>🤖 AI Resume</h3>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Get intelligent summaries to quickly resume your work
          </p>
        </div>
      </div>

      <div className="card" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
        <h3 style={{ marginTop: 0 }}>🚀 How It Works</h3>
        <ol style={{ lineHeight: "1.8", paddingLeft: "20px" }}>
          <li><strong>Create Tasks:</strong> Add tasks with context notes (what you did, why, next steps)</li>
          <li><strong>Save Progress:</strong> Your context is automatically saved to Firestore</li>
          <li><strong>Resume with AI:</strong> Click any task to get an AI-powered summary for quick resumption</li>
        </ol>
      </div>
    </div>
  );
}