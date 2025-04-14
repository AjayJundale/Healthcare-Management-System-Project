const mongoose = require("mongoose");

const doctorAvailabilitySchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  timeSlots: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model("DoctorAvailability", doctorAvailabilitySchema);