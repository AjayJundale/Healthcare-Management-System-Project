// pages/RescheduleAppointment.jsx

import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RescheduleAppointment = () => {
  const { id } = useParams(); // Get appointment ID from URL
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate date and time
    if (!date || !time) {
      toast.error("Please select a date and time.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/appointment/reschedule/${id}`,
        { date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Check if the appointment was successfully rescheduled
      if (response.data.appointment) {
        toast.success("Appointment rescheduled successfully!");
        navigate("/appointment-history");
      } else {
        toast.error("Failed to reschedule appointment. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reschedule appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Reschedule Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              "Reschedule"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RescheduleAppointment;