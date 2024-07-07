const express = require("express");
const router = express.Router();

// authentication
const authMiddleware = require("../middleware/authMiddleware");

// user controllers
const { register, login, checkUser } = require("../controller/userController");

// Register Route
router.post("/register", register);

// Login user
router.post("/login", login);

// Check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
