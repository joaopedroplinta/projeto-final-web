const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authenticate, getUser);

module.exports = router;