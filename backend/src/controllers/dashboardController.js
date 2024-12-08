const expenseModel = require("../models/expenseModel");

const getDashboardData = async (req, res) => {
    try {
        const userId = req.userId; // O 'userId' deve vir do middleware de autenticação
        if (!userId) {
            return res.status(400).json({ message: "User ID não encontrado." });
        }

        const expenses = await expenseModel.getExpensesByUserId(userId);

        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: "Nenhuma despesa encontrada." });
        }

        res.status(200).json(expenses); // Envia as despesas como resposta
    } catch (error) {
        console.error("Erro ao carregar as despesas:", error);
        res.status(500).json({ message: "Erro ao carregar as despesas.", error });
    }
};

module.exports = { getDashboardData };
