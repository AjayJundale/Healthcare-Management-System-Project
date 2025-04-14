const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");
const adminController = require("../controllers/adminController");

const router = express.Router();

//  Admin Routes
router.get("/users", auth, isAdmin, adminController.getAllUsers);
router.delete("/user/:id", auth, isAdmin, adminController.deleteUser);
router.put("/approve-doctor/:doctorId", auth, isAdmin, adminController.approveDoctor);
router.delete("/cancel/:id", auth, isAdmin, adminController.adminCancelAppointment);
router.put("/update-status/:id", auth, isAdmin, adminController.updateAppointmentStatus); // Add this route
router.get("/doctors", auth, isAdmin, adminController.getDoctors);
router.get("/appointments", auth, isAdmin, adminController.getAppointments);

module.exports = router;