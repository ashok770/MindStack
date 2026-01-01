import { useState } from "react";
import { signupUser } from "./auth/signup";
import { loginUser } from "./auth/login";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const user = await signupUser(email, password);
      alert("Signup successful: " + user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      alert("Login successful: " + user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>MindStack Auth Test</h1>

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
      <br />
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default App;
