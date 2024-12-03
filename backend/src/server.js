const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/reports", reportRoutes);

app.get("/", (req, res) => res.send("API Controle de Gastos funcionando!"));

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
