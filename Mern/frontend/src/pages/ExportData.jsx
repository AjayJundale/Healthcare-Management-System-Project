// pages/ExportData.jsx

import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ExportData = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Export Data</h1>
        <div className="space-y-4">
          <button
            onClick={handleExportCSV}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Export Appointments as CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export Appointments as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportData;