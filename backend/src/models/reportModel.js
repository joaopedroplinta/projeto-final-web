const db = require("../config/db");

// Obter o total de despesas por mês
const getTotalByMonth = async (userId, date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const query = `
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM expenses
    WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ?;
  `;

  const [result] = await db.execute(query, [userId, year, month]);
  return result[0].total;
};

// Obter o total de despesas agrupadas por categoria no mês atual
const getTotalByCategory = async (userId, date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const query = `
    SELECT category, COALESCE(SUM(amount), 0) AS total
    FROM expenses
    WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ?
    GROUP BY category;
  `;

  const [result] = await db.execute(query, [userId, year, month]);
  return result;
};

// Obter despesas agrupadas por mês para tendências
const getExpensesByMonth = async (userId) => {
  const query = `
    SELECT YEAR(date) AS year, MONTH(date) AS month, COALESCE(SUM(amount), 0) AS total
    FROM expenses
    WHERE user_id = ?
    GROUP BY YEAR(date), MONTH(date)
    ORDER BY year, month;
  `;

  const [result] = await db.execute(query, [userId]);
  return result;
};

module.exports = {
  getTotalByMonth,
  getTotalByCategory,
  getExpensesByMonth,
};
