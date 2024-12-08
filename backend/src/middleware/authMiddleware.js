const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Supondo que o `id` está no payload do token
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido." });
    }
};

module.exports = { authenticate };
