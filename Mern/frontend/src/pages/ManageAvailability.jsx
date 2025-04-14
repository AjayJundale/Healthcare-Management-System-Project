import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageAvailability = () => {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/doctor/set-availability`,
        { date, timeSlots: timeSlots.split(",") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Show success message
      toast.success("Availability set successfully!");

      // Clear the form fields
      setDate("");
      setTimeSlots("");
    } catch (error) {
      // Show error message
      toast.error(error.response?.data?.message || "Failed to set availability");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Availability</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Time Slots (e.g., 10:00 AM, 11:00 AM)"
            value={timeSlots}
            onChange={(e) => setTimeSlots(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> // Loading spinner
            ) : (
              "Set Availability"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAvailability;