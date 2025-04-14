import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments for the logged-in doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/doctor/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data); // Debugging: Log the API response
        setAppointments(response.data);
      } catch (error) {
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle updating appointment status (confirm/cancel)
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await API.put(
        `/appointment/status/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Use the updated appointment object from the API response
      const updatedAppointment = response.data.appointment;

      // Update the local state to reflect the new status
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id
            ? updatedAppointment // Replace the old appointment with the updated one
            : appointment
        )
      );

      toast.success(`Appointment ${status} successfully!`);
    } catch (error) {
      toast.error("Failed to update appointment status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Doctor Appointments
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className="border-b border-gray-200 pb-4"
              >
                <p className="text-gray-800">
                  <strong>Patient:</strong> {appointment.patient?.name}
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

                {/* Buttons to confirm or cancel the appointment */}
                {appointment.status === "pending" && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateStatus(appointment._id, "confirmed")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(appointment._id, "canceled")
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;