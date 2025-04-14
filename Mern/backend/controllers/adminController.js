const User = require("../models/User");
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/emailService");

//  Approve/Reject Doctor
exports.approveDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { isApproved } = req.body;

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.isApproved = isApproved;
    await doctor.save();

    // Notify the doctor
    await sendEmail(
      doctor.email,
      `Your Account ${isApproved ? "Approved" : "Rejected"}`,
      `Hello ${doctor.name}, your account has been ${isApproved ? "approved" : "rejected"} by the admin.`
    );

    res.json({
      message: `Doctor ${isApproved ? "approved" : "rejected"} successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const users = await User.find()
      .select("-password")
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments();

    res.json({ total, page, pages: Math.ceil(total / limit), users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin Cancel Appointment
exports.adminCancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "email"
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    await appointment.deleteOne();

    // Notify the patient
    if (appointment.patient && appointment.patient.email) {
      await sendEmail(
        appointment.patient.email,
        "Appointment Canceled",
        `Your appointment on ${appointment.date} at ${appointment.time} has been canceled by the admin.`
      );
    }

    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", isApproved: true });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Appointment Status (Admin)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const allowedStatuses = ["pending", "confirmed", "canceled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "name email"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // Notify the patient
    await sendEmail(
      appointment.patient.email,
      `Appointment ${status}`,
      `Your appointment on ${appointment.date} at ${appointment.time} has been ${status}.`
    );

    res.json({ message: `Appointment ${status} successfully`, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};