const jwt = require("jsonwebtoken");

// Middleware para verificar o token JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Acesso não autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Adiciona o ID do usuário na requisição
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = { authenticate };