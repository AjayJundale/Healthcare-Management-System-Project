const Appointment = require("../models/Appointment");
const DoctorAvailability = require("../models/DoctorAvailability");
const User = require("../models/User");
const logger = require("../utils/Logger");

//  Set Availability
exports.setAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;

    // Use req.user.id as the doctorId
    const availability = new DoctorAvailability({
      doctor: req.user.id, // Automatically set the doctorId
      date,
      timeSlots,
    });

    await availability.save();

    res.status(201).json({ message: "Availability set successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Availability
exports.updateAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;
    const availability = await DoctorAvailability.findById(req.params.id);
    if (!availability)
      return res.status(404).json({ message: "Availability not found" });

    if (availability.doctor.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    availability.date = date || availability.date;
    availability.timeSlots = timeSlots || availability.timeSlots;
    await availability.save();

    res.json({ message: "Availability updated successfully" });
  } catch (error) {
    logger.error("Update Availability Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Delete Availability
exports.deleteAvailability = async (req, res) => {
  try {
    const availability = await DoctorAvailability.findById(req.params.id);
    if (!availability)
      return res.status(404).json({ message: "Availability not found" });

    if (availability.doctor.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await availability.deleteOne();
    res.json({ message: "Availability deleted successfully" });
  } catch (error) {
    logger.error("Delete Availability Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Get Available Slots (For Patients)
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const query = { doctor: req.params.doctorId };
    if (date) query.date = date;

    const slots = await DoctorAvailability.find(query);
    res.json(slots);
  } catch (error) {
    logger.error("Get Available Slots Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Update Doctor Profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, contact } = req.body;
    const doctor = await User.findById(req.user.id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    doctor.specialization = specialization || doctor.specialization;
    doctor.experience = experience || doctor.experience;
    doctor.contact = contact || doctor.contact;

    await doctor.save();
    res.json({ message: "Profile updated successfully", doctor });
  } catch (error) {
    logger.error("Update Doctor Profile Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Get Doctors
exports.getDoctors = async (req, res) => {
  try {
    const { specialization, date, page = 1, limit = 10 } = req.query;
    const query = { role: "doctor", isApproved: true };

    if (specialization) query.specialization = specialization;

    // Filter by availability date (if provided)
    if (date) {
      const availability = await DoctorAvailability.find({ date });
      const doctorIds = availability.map((a) => a.doctor);
      query._id = { $in: doctorIds };
    }

    const doctors = await User.find(query)
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      doctors,
    });
  } catch (error) {
    logger.error("Get Doctors Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Get Doctor Appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate("patient", "name email")
      .populate("doctor", "name")
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
