const express = require("express");
const { register, login, forgotPassword, resetPassword, getCurrentUser } = require("../controllers/authController");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login); //  Keep only this login route
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", auth, getCurrentUser);
module.exports = router;