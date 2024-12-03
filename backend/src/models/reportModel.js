const db = require("../config/db");

// Resumo geral das despesas
const getSummary = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      COUNT(*) AS total_expenses,
      COALESCE(SUM(amount), 0) AS total_amount,
      COALESCE(AVG(amount), 0) AS average_amount
    FROM expenses
    WHERE user_id = ?`,
    [userId]
  );
  return rows[0];
};

// Despesas agrupadas por categoria
const getExpensesByCategory = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      category,
      COALESCE(SUM(amount), 0) AS total_amount
    FROM expenses
    WHERE user_id = ?
    GROUP BY category
    ORDER BY total_amount DESC`,
    [userId]
  );
  return rows;
};

// Despesas agrupadas por mês
const getExpensesByMonth = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      DATE_FORMAT(date, '%Y-%m') AS month,
      COALESCE(SUM(amount), 0) AS total_amount
    FROM expenses
    WHERE user_id = ?
    GROUP BY DATE_FORMAT(date, '%Y-%m')
    ORDER BY month DESC`,
    [userId]
  );
  return rows;
};

module.exports = { getSummary, getExpensesByCategory, getExpensesByMonth };
