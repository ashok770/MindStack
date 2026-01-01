import { useState } from "react";
import { signupUser } from "./auth/signup";
import { loginUser } from "./auth/login";
import { addTask } from "./tasks/addTask";
import { getResumeSummary } from "./ai/gemini";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contextNotes, setContextNotes] = useState("");

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
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddTask = async () => {
    try {
      await addTask(title, contextNotes);
      alert("Task added successfully");
      setTitle("");
      setContextNotes("");
    } catch (error) {
      alert(error.message);
    }
  };

  const testGemini = async () => {
    try {
      const summary = await getResumeSummary(
        "DSA Practice",
        "Solved logic, need to code edge cases"
      );

      console.log("Gemini Summary:", summary);
      alert(summary);
    } catch (error) {
      console.error(error);
      alert("Gemini API error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>MindStack – Phase 2 Test</h1>

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
      />
      <br />
      <br />

      <button onClick={handleAddTask}>Save Task</button>
      <hr />
      <h3>Test Gemini Resume</h3>
      <button onClick={testGemini}>Resume with AI</button>
    </div>
  );
}

export default App;
