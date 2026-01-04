import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import Home from "./pages/dashboard/Home.jsx";
import Tasks from "./pages/dashboard/Tasks.jsx";
import TaskResume from "./pages/dashboard/TaskResume.jsx";
import Snapshots from "./pages/dashboard/Snapshots.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="resume/:taskId" element={<TaskResume />} />
            <Route path="snapshots" element={<Snapshots />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
