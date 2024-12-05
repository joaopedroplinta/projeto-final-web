const expenseModel = require("../models/expenseModel");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // Aqui você pega o userId do token, por exemplo
    const expenses = await expenseModel.getExpensesByUserId(userId);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    return res.json({
      expenses,
      totalExpenses,
    });
  } catch (error) {
    console.error("Erro ao carregar as despesas:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { getDashboardData };
