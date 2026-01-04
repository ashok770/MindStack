import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}