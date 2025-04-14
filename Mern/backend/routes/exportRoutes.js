// routes/exportRoutes.js

const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");
const {
  exportAppointmentsCSV,
  exportAppointmentsPDF,
} = require("../controllers/exportController");

const router = express.Router();

// Export Routes
router.get("/appointments/csv", auth, isAdmin, exportAppointmentsCSV);
router.get("/appointments/pdf", auth, isAdmin, exportAppointmentsPDF);

module.exports = router;