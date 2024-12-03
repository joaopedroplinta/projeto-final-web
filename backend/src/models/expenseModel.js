const db = require("../config/db");

// Criar nova despesa
const createExpense = async ({ userId, description, category, amount, date }) => {
    await db.query("INSERT INTO expenses (user_id, description, category, amount, date) VALUES (?, ?, ?, ?, ?)", [userId, description, category, amount, date]);
};

// Listar todas as despesas do usuário
const getExpensesByUserId = async (userId) => {
    const [rows] = await db.query("SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC", [userId]);
    return rows;
};

// Atualizar despesa
const updateExpense = async (id, { description, category, amount, date }) => {
    const [result] = await db.query("UPDATE expenses SET description = ?, category = ?, amount = ?, date = ? WHERE id = ?", [description, category, amount, date, id]);
    return result.affectedRows > 0;
};

// Deletar despesa
const deleteExpense = async (id) => {
    const [result] = await db.query("DELETE FROM expenses WHERE id = ?", [id]);
    return result.affectedRows > 0;
};

module.exports = { createExpense, getExpensesByUserId, updateExpense, deleteExpense };