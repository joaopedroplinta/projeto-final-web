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
router.post("/", authenticate, createExpense); // Criar despesa
router.get("/", authenticate, getExpenses);   // Listar despesas
router.put("/:id", authenticate, updateExpense); // Atualizar despesa por ID
router.delete("/:id", authenticate, deleteExpense); // Deletar despesa por ID

module.exports = router;
