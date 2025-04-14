// routes/appointmentRoutes.js

const express = require("express");
const { auth, isDoctor, isAdmin } = require("../middleware/auth");
const {
  bookAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  adminCancelAppointment,
  getAppointmentHistory,
  rescheduleAppointment, 
  getAppointments// Import the rescheduleAppointment function
} = require("../controllers/appointmentController");

const router = express.Router();

//  Appointment Routes
router.post("/book", auth, bookAppointment); // Book an appointment
router.put("/status/:id", auth, isDoctor, updateAppointmentStatus); // Update appointment status
router.delete("/cancel/:id", auth, cancelAppointment); // Cancel appointment (patient)
router.delete("/admin/cancel/:id", auth, isAdmin, adminCancelAppointment); // Cancel appointment (admin)
router.get("/history", auth, getAppointmentHistory); // Get appointment history
router.put("/reschedule/:id", auth, rescheduleAppointment); // Reschedule appointment
router.get("/", auth, getAppointments); // Get all appointments
module.exports = router;