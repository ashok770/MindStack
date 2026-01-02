import { useState } from "react";
import { signupUser } from "./auth/signup";
import { loginUser } from "./auth/login";
import { addTask } from "./tasks/addTask";
import { getUserTasks } from "./tasks/getTasks";
import { summarizeContext } from "./ai/gemini";

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

  return (
    <div style={{ padding: "40px", maxWidth: "800px" }}>
      <h1>MindStack – Phase C</h1>

      {/* ================= AUTH ================= */}
      <h3>Auth</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
        Log In
      </button>

      <hr />

      {/* ================= ADD TASK ================= */}
      <h3>Add Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />

      <textarea
        placeholder="Context notes (what you did, why, next steps)"
        value={contextNotes}
        onChange={(e) => setContextNotes(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <br />
      <br />

      <button onClick={handleAddTask}>Save Task</button>

      <hr />

      {/* ================= TASK LIST ================= */}
      <h3>Your Saved Tasks</h3>

      {tasks.length === 0 && <p>No tasks saved yet.</p>}

      <ul style={{ paddingLeft: "0" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              listStyle: "none",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => runAIResume(task.contextNotes)}
          >
            <strong>{task.title}</strong>
            <br />
            <small>Click to resume this task</small>
          </li>
        ))}
      </ul>

      <hr />

      {/* ================= AI RESUME ================= */}
      <h3>Resume Current Context with AI</h3>

      <button
        onClick={() =>
          runAIResume(contextNotes || "Solved logic, need to code edge cases")
        }
        disabled={loadingAI}
      >
        {loadingAI ? "Analyzing..." : "Resume with AI"}
      </button>

      {loadingAI && <p>🤖 AI is analyzing your context...</p>}

      {aiSummary && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            borderRadius: "8px",
            background: "#f4f7fb",
            border: "1px solid #dcdcdc",
          }}
        >
          <h4>📌 AI Resume Summary</h4>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
            {aiSummary}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
