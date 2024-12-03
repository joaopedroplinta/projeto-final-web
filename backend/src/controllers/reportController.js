const reportModel = require("../models/reportModel");

// Resumo geral das despesas
const getSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const summary = await reportModel.getSummary(userId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Erro ao gerar o resumo.", error });
  }
};

// Despesas agrupadas por categoria
const getExpensesByCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await reportModel.getExpensesByCategory(userId);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Erro ao agrupar despesas por categoria.", error });
  }
};

// Despesas agrupadas por mês
const getExpensesByMonth = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await reportModel.getExpensesByMonth(userId);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Erro ao agrupar despesas por mês.", error });
  }
};

// Exportando as funções
module.exports = { getSummary, getExpensesByCategory, getExpensesByMonth };
