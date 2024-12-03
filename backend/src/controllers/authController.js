const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Registrar novo usuário
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se o e-mail já está cadastrado
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: "E-mail já cadastrado" });

        // Criptografar senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cadastrar usuário
        await userModel.createUser({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error });
    }
};

// Login do usuário
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o e-mail está cadastrado
        const user = await userModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Senha incorreta." });

        // Gerar token de autenticação
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login realizado com sucesso", token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error });
    }
};

// Obter dados do usuário autenticado
const getUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.userId);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error });
    }
};

module.exports = { register, login, getUser };