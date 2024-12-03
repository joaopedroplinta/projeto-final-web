const express = require("express");
const {
    getSummary,
    getExpensesByCategory,
    getExpensesByMonth,
} = require("../controllers/reportController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Rotas protegidas para relatórios
router.get("/summary", authenticate, getSummary);
router.get("/by-category", authenticate, getExpensesByCategory);
router.get("/by-month", authenticate, getExpensesByMonth);

module.exports = router;