import { useState } from "react";
import { signupUser } from "./auth/signup";
import { loginUser } from "./auth/login";
import { addTask } from "./tasks/addTask";
import { getUserTasks } from "./tasks/getTasks";
import { summarizeContext } from "./ai/gemini";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [contextNotes, setContextNotes] = useState("");

  const [tasks, setTasks] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  /* ================= AUTH ================= */

  const handleSignup = async () => {
    try {
      await signupUser(email, password);
      alert("Signup successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      alert("Login successful");
      await loadTasks();
    } catch (error) {
      alert(error.message);
    }
  };

  /* ================= TASKS ================= */

  const loadTasks = async () => {
    try {
      const data = await getUserTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await addTask(title, contextNotes);
      alert("Task added successfully");
      setTitle("");
      setContextNotes("");
      await loadTasks();
    } catch (error) {
      alert(error.message);
    }
  };

  /* ================= AI ================= */

  const runAIResume = async (context) => {
    try {
      setLoadingAI(true);
      setAiSummary("");

      const summary = await summarizeContext(context);
      setAiSummary(summary);
    } catch (error) {
      console.error(error);
      setAiSummary("❌ Failed to generate summary");
    } finally {
      setLoadingAI(false);
    }
  };

  const resumeTask = (task) => {
    runAIResume(task.contextNotes || task.title);
  };

  const testGemini = () => {
    runAIResume(contextNotes || "Test context for AI analysis");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>MindStack</h1>
        <p>AI-powered context resume for focused learning</p>
      </div>

      <div className="grid">
        {/* AUTH */}
        <div className="card">
          <h3>🔐 Authentication</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Sign Up</button>
          <button
            className="secondary"
            onClick={handleLogin}
            style={{ marginLeft: "8px" }}
          >
            Log In
          </button>
        </div>

        {/* ADD TASK */}
        <div className="card">
          <h3>📝 Add Task</h3>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Context notes (what you did, why, next steps)"
            value={contextNotes}
            onChange={(e) => setContextNotes(e.target.value)}
          />
          <button onClick={handleAddTask}>Save Task</button>
        </div>
      </div>

      {/* SAVED TASKS */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>📂 Your Saved Tasks</h3>
        {tasks.length === 0 && <p>No tasks yet</p>}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-item"
            onClick={() => resumeTask(task)}
          >
            <strong>{task.title}</strong>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Click to resume this task
            </div>
          </div>
        ))}
      </div>

      {/* AI RESUME */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>🤖 Resume with AI</h3>
        <button onClick={testGemini} disabled={loadingAI}>
          {loadingAI ? "Analyzing..." : "Resume with AI"}
        </button>

        {aiSummary && (
          <div className="ai-box" style={{ marginTop: "16px" }}>
            <strong>AI Resume Summary</strong>
            <div>{aiSummary}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
