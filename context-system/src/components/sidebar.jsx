import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await signOut();
    }
  };

  return (
    <aside className="sidebar">
      <h2 style={{ marginBottom: "8px" }}>🧠 MindStack</h2>
      <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "24px" }}>
        Context Resume System
      </p>

      <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            padding: "10px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#2563eb" : "transparent",
            transition: "background 0.2s"
          })}
        >
          🏠 Home
        </NavLink>
        <NavLink 
          to="/tasks"
          style={({ isActive }) => ({
            padding: "10px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#2563eb" : "transparent",
            transition: "background 0.2s"
          })}
        >
          📋 Tasks
        </NavLink>
        <NavLink 
          to="/snapshots"
          style={({ isActive }) => ({
            padding: "10px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "white",
            background: isActive ? "#2563eb" : "transparent",
            transition: "background 0.2s"
          })}
        >
          📸 Snapshots
        </NavLink>
      </nav>

      <div style={{ 
        marginTop: "auto", 
        paddingTop: "20px", 
        borderTop: "1px solid #374151" 
      }}>
        {user && (
          <div style={{ 
            fontSize: "12px", 
            color: "#9ca3af", 
            marginBottom: "12px",
            wordBreak: "break-word"
          }}>
            {user.email}
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="logout"
          style={{
            width: "100%",
            padding: "10px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
