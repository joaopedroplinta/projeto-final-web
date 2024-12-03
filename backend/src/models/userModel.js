const db = require("../config/db");

// Obter usuário por ID
const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
};

// Obter usuário por e-mail
const getUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

// Criar novo usuário
const createUser = async (user) => {
    const { name, email, password } = user;
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
};

module.exports = { getUserById, getUserByEmail, createUser };