import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { summarizeContext } from "../../ai/gemini";

export default function TaskResume() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      const taskDoc = await getDoc(doc(db, "tasks", taskId));
      if (taskDoc.exists()) {
        setTask({ id: taskDoc.id, ...taskDoc.data() });
      } else {
        alert("Task not found");
        navigate("/tasks");
      }
    } catch (error) {
      console.error("Error loading task:", error);
      alert("Failed to load task");
      navigate("/tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleResume = async () => {
    if (!task) return;
    
    setAnalyzing(true);
    setAiSummary("");
    
    try {
      const summary = await summarizeContext(task.contextNotes || "", task.title || "");
      setAiSummary(summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate AI summary. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div>
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <button 
            onClick={() => navigate("/tasks")}
            style={{ marginBottom: "16px", background: "#6b7280" }}
          >
            ← Back to Tasks
          </button>
          <h2 style={{ marginTop: 0 }}>{task.title}</h2>
          <div className="muted" style={{ marginBottom: "16px" }}>
            Last updated: {formatDate(task.lastUpdated)}
          </div>
        </div>

        <div className="card" style={{ background: "#f9fafb", marginBottom: "20px" }}>
          <h3 style={{ marginTop: 0, fontSize: "18px" }}>Your Saved Context</h3>
          <div style={{ 
            whiteSpace: "pre-wrap", 
            lineHeight: "1.6",
            padding: "12px",
            background: "white",
            borderRadius: "6px",
            border: "1px solid #e5e7eb"
          }}>
            {task.contextNotes || "No context notes saved."}
          </div>
        </div>

        <button 
          onClick={handleResume} 
          disabled={analyzing}
          style={{ 
            width: "100%", 
            padding: "12px",
            fontSize: "16px",
            fontWeight: "600"
          }}
        >
          {analyzing ? "AI is analyzing your context..." : "Resume with AI"}
        </button>
      </div>
      
      {aiSummary && (
        <div className="card" style={{ background: "#f0f9ff", border: "2px solid #2563eb" }}>
          <div style={{ 
            whiteSpace: "pre-wrap", 
            lineHeight: "1.8",
            fontSize: "15px"
          }}>
            {aiSummary}
          </div>
        </div>
      )}
    </div>
  );
}