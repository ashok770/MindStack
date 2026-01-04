import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../auth/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "#f4f6fb"
    }}>
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 style={{ marginTop: 0 }}>Login to MindStack</h2>
        
        {error && (
          <div style={{ 
            background: "#fee2e2", 
            color: "#991b1b", 
            padding: "12px", 
            borderRadius: "6px", 
            marginBottom: "16px" 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "12px" }}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", marginBottom: "12px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", margin: 0 }}>
          Don't have an account? <Link to="/signup" style={{ color: "#2563eb" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}


