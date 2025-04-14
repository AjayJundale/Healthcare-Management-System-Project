// pages/AppointmentHistory.jsx

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get the logged-in user

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointment/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        toast.error("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false); //  This is correct - keep it!
      }
    };
  
    fetchAppointments();
  }, []); //  Empty dependency array is correct here

  const handleExportCSV = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/export/appointments/csv`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // Important for file downloads
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "appointments.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to export appointments as CSV.");
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/export/appointments/pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // Important for file downloads
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "appointments.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to export appointments as PDF.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Appointment History
        </h1>

        {/* Export Buttons (Only for Admins) */}
        {user?.role === "admin" && (
          <div className="mb-6 flex space-x-4">
            <button
              onClick={handleExportCSV}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Export as CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Export as PDF
            </button>
          </div>
        )}

        {/* Appointment List */}
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="border-b border-gray-200 pb-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <p className="text-gray-800">
                  <strong>Doctor:</strong> {appointment.doctor?.name || "N/A"}
                </p>
                <p className="text-gray-800">
                  <strong>Patient:</strong> {appointment.patient?.name || "N/A"}
                </p>
                <p className="text-gray-800">
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p className="text-gray-800">
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p className="text-gray-800">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      appointment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentHistory;