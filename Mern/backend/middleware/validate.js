const { body, validationResult } = require("express-validator");

//  Validate User Registration
exports.validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

//  Validate Appointment Booking
exports.validateAppointment = [
  body("doctorId").notEmpty().withMessage("Doctor ID is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("timeSlot").notEmpty().withMessage("Time slot is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];