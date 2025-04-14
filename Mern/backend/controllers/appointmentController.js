const Appointment = require("../models/Appointment");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");
const logger = require("../utils/Logger");

//  Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Use req.user.id as the patientId
    const appointment = new Appointment({
      patient: req.user.id, // Automatically set the patientId
      doctor: doctorId,
      date,
      time,
      status: "pending",
    });

    await appointment.save();
    logger.info(
      `Appointment booked by patient ${req.user.id} with doctor ${doctorId}`
    );

    // Send email confirmation
    await sendEmail(
      req.user.email,
      "Appointment Booked",
      `Your appointment on ${date} at ${time} is pending approval.`
    );

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    logger.error("Book Appointment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Update Appointment Status (Doctor Approves/Rejects)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "name email"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // Return the updated appointment
    res.json({ message: `Appointment ${status} successfully`, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Appointment History (For Patients)
exports.getAppointmentHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("patient", "name email") // Populate patient details
      .populate("doctor", "name email"); // Populate doctor details

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  Cancel Appointment (Patient)
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.patient.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await appointment.deleteOne();
    logger.info(
      `Appointment ${req.params.id} canceled by patient ${req.user.id}`
    );

    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    logger.error("Cancel Appointment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Cancel Appointment (Admin)
exports.adminCancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "email"
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    await appointment.deleteOne();
    logger.info(
      `Appointment ${req.params.id} canceled by admin ${req.user.id}`
    );

    // Notify the patient
    await sendEmail(
      appointment.patient.email,
      "Appointment Canceled",
      `Your appointment on ${appointment.date} at ${appointment.time} has been canceled by admin.`
    );

    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    logger.error("Admin Cancel Appointment Error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.setAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;

    // Ensure the authenticated user is a doctor
    if (req.user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can set availability" });
    }

    // Create new availability
    const availability = new DoctorAvailability({
      doctor: req.user.id, // Set the doctorId from the authenticated user
      date,
      timeSlots,
    });

    await availability.save();

    res.status(201).json({ message: "Availability set successfully" });
  } catch (error) {
    logger.error("Set Availability Error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAppointments = async (req, res) => {
  try {
    const { status, date, doctorId, patientId } = req.query;
    const query = {};

    if (status) query.status = status;
    if (date) query.date = date;
    if (doctorId) query.doctor = doctorId;
    if (patientId) query.patient = patientId;

    const appointments = await Appointment.find(query)
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Backend: Reschedule Appointment
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "email name")
      .populate("doctor", "email name");

    console.log("Appointment:", appointment); // Debugging: Log the appointment

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if patient and doctor exist
    if (!appointment.patient || !appointment.doctor) {
      return res.status(400).json({ message: "Invalid appointment data" });
    }

    // Update appointment date and time
    appointment.date = date;
    appointment.time = time;
    await appointment.save();

    // Notify patient and doctor
    await sendEmail(
      appointment.patient.email,
      "Appointment Rescheduled",
      `Your appointment has been rescheduled to ${date} at ${time}.`
    );
    await sendEmail(
      appointment.doctor.email,
      "Appointment Rescheduled",
      `Your appointment with ${appointment.patient.name} has been rescheduled to ${date} at ${time}.`
    );

    res.json({ message: "Appointment rescheduled successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};