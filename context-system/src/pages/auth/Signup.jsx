import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../../auth/signup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signupUser(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
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
        <h2 style={{ marginTop: 0 }}>🚀 Create Your MindStack Account</h2>
        
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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "12px" }}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "16px", marginBottom: 0 }}>
          Already have an account? <Link to="/login" style={{ color: "#2563eb" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

