const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // Example: "10:00 AM"
  status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);