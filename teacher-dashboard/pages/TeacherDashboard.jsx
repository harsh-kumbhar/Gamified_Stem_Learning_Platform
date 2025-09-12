import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
