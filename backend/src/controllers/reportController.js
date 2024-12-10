const reportModel = require("../models/reportModel");

// Função para calcular a variação percentual
const calculateVariation = (currentMonthExpenses, previousMonthExpenses) => {
  return previousMonthExpenses > 0
    ? ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
    : 0;
};

// Resumo geral das despesas (total gasto, principais categorias e variação)
const getMonthlySummary = async (userId) => {
  try {
    // Dados do mês atual
    const currentMonthExpenses = await reportModel.getTotalByMonth(userId, new Date());
    const previousMonthExpenses = await reportModel.getTotalByMonth(
      userId,
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );

    const categories = await reportModel.getTotalByCategory(userId, new Date());
    const variation = calculateVariation(currentMonthExpenses, previousMonthExpenses);

    return {
      totalSpent: currentMonthExpenses,
      categories,
      variation,
    };
  } catch (error) {
    throw new Error("Erro ao gerar o resumo mensal.");
  }
};

// Despesas agrupadas por categoria
const getExpensesByCategory = async (userId) => {
  try {
    const expenses = await reportModel.getTotalByCategory(userId, new Date());
    return expenses;
  } catch (error) {
    throw new Error("Erro ao agrupar despesas por categoria.");
  }
};

// Despesas agrupadas por mês (para tendências ao longo do tempo)
const getExpensesByMonth = async (userId) => {
  try {
    const expenses = await reportModel.getExpensesByMonth(userId);
    return expenses;
  } catch (error) {
    throw new Error("Erro ao agrupar despesas por mês.");
  }
};

// Função para obter o relatório completo
const getFullReport = async (req, res) => {
  const userId = req.userId;
  try {
    // Obter dados do resumo mensal, despesas por categoria e por mês
    const summary = await getMonthlySummary(userId);
    const byCategory = await getExpensesByCategory(userId);
    const byMonth = await getExpensesByMonth(userId);

    // Retorna todos os dados em um único objeto
    res.json({ summary, byCategory, byMonth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportando as funções
module.exports = {
  getFullReport,
  getMonthlySummary, // Agora exportando também getMonthlySummary
  getExpensesByCategory, // Exportando getExpensesByCategory
  getExpensesByMonth, // Exportando getExpensesByMonth
};
