import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h1>
          <button
            onClick={handleLogout}
            className="mt-4 lg:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600 mb-8">Role: {user.role}</p>

        {/* Patient Dashboard */}
        {user.role === "patient" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Dashboard</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Book Appointment
              </button>
              <button
                onClick={() => navigate("/appointment-history")}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                View Appointment History
              </button>
            </div>
          </div>
        )}

        {/* Doctor Dashboard */}
        {user.role === "doctor" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Doctor Dashboard</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/manage-availability")}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Manage Availability
              </button>
              <button
                onClick={() => navigate("/doctor-appointments")}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                View Appointments
              </button>
            </div>
          </div>
        )}
        {/* Admin Dashboard */}
        {user.role === "admin" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Dashboard</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/manage-users")}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Manage Users
              </button>
              <button
                onClick={() => navigate("/manage-appointments")}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Manage Appointments
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;