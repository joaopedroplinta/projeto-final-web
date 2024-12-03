const expenseModel = require("../models/expenseModel");

// Criar uma nova despesa
const createExpense = async (req, res) => {
    try {
        const { description, category, amount, date } = req.body;
        const userId = req.userId;

        if (!description || !category || !amount || !date) {
            return res.status(400).json({ message: "Preencha todos os campos." });
        }

        await expenseModel.createExpense({ userId, description, category, amount, date });
        res.status(201).json({ message: "Despesa criada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar despesa.", error });
    }
};

// Listar todas as depesas do usuário
const getExpenses = async (req, res) => {
    try {
        const userId = req.userId;
        const expenses = await expenseModel.getExpensesByUserId(userId);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscas despesas.", error });
    }
};

// Atualizar uma despesa
const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { description, category, amount, date } = req.body;

        const updated = await expenseModel.updateExpense(expenseId, { description, category, amount, date });

        if (!updated) {
            return res.status(404).json({ message: "Despesa não encontrada." });
        }

        res.json({ message: "Despesa atualizada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar despesa.", error });
    }
};

// Deletar uma despesa
const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        const deleted = await expenseModel.deleteExpense(expenseId);
        if (!deleted) {
            return res.status(404).json({ message: "Despesa não encontrada." });
        }

        res.json({ message: "Despesa deletada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar despesa.", error });
    }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };