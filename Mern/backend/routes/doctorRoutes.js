const express = require("express");
const { auth, isDoctor } = require("../middleware/auth");
const {
  setAvailability,
  updateAvailability,
  deleteAvailability,
  getAvailableSlots,
  updateDoctorProfile,
  getDoctors,
  getDoctorAppointments, // Add this import
} = require("../controllers/doctorController");

const router = express.Router();

//  Doctor Routes
router.post("/set-availability", auth, isDoctor, setAvailability); // Set availability
router.put("/update-availability/:id", auth, isDoctor, updateAvailability); // Update availability
router.delete("/delete-availability/:id", auth, isDoctor, deleteAvailability); // Delete availability
router.put("/update-profile", auth, isDoctor, updateDoctorProfile); // Update doctor profile
router.get("/appointments", auth, isDoctor, getDoctorAppointments); // Add this route

// Public Routes
router.get("/available-slots/:doctorId", getAvailableSlots); // Get available slots
router.get("/doctors", getDoctors); // Get all doctors

module.exports = router;