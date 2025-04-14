const jwt = require("jsonwebtoken");
const User = require("../models/User");

//  Authentication Middleware
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

//  Admin Access Middleware
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

//  Doctor Access Middleware
exports.isDoctor = (req, res, next) => {
  if (!req.user || req.user.role !== "doctor") {
    return res.status(403).json({ message: "Doctor access required" });
  }
  next();
};

//  Patient Access Middleware
exports.isPatient = (req, res, next) => {
  if (!req.user || req.user.role !== "patient") {
    return res.status(403).json({ message: "Patient access required" });
  }
  next();
};