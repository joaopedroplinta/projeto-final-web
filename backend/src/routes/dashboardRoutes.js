// routes/dashboardRoutes.js
const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");  // Importando o controlador

const router = express.Router();

// Defina a rota para o dashboard
router.get("/", dashboardController.getDashboardData);

module.exports = router;
