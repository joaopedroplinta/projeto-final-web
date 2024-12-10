const express = require("express");
const {
  getFullReport, // Função principal do relatório
  getMonthlySummary, // Função do resumo mensal
  getExpensesByCategory, // Função de despesas por categoria
  getExpensesByMonth // Função de despesas por mês
} = require("../controllers/reportController"); // Certifique-se de que o caminho está correto
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Rotas protegidas para relatórios
router.get("/", authenticate, getFullReport); // Endpoint principal

module.exports = router;