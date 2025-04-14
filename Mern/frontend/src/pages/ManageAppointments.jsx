import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments for the admin
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/admin/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data); // Debugging
        setAppointments(response.data);
      } catch (error) {
        toast.error("Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, []);

  // Handle updating appointment status
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      // Optimistically update the UI
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
  
      // Show success notification immediately
      toast.success(`Appointment status updated to ${status} successfully!`);
  
      // Make the API call
      const response = await API.put(
        `/admin/update-status/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", response.data);
  
      // Update the state again with the confirmed data
      const updatedAppointment = response.data.appointment;
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
  
      // Revert the UI change if the API call fails
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status: appointment.status } : appointment
        )
      );
  
      toast.error("Failed to update appointment status");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Appointments</h1>
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="border-b border-gray-200 pb-4">
              <p className="text-gray-800"><strong>Patient:</strong> {appointment.patient?.name}</p>
              <p className="text-gray-800"><strong>Doctor:</strong> {appointment.doctor?.name}</p>
              <p className="text-gray-800"><strong>Date:</strong> {appointment.date}</p>
              <p className="text-gray-800"><strong>Time:</strong> {appointment.time}</p>
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

              {/* Buttons to update appointment status */}
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleUpdateStatus(appointment._id, "confirmed")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateStatus(appointment._id, "canceled")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageAppointments;