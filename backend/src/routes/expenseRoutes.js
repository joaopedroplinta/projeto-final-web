const express = require("express");
const {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
} = require("../controllers/expenseController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Rotas protegidas para despesas
router.post("/", authenticate, getExpenses);
router.get("/", authenticate, createExpense);
router.put("/:id", authenticate, updateExpense);
router.delete("/:id", authenticate, deleteExpense);

module.exports = router;