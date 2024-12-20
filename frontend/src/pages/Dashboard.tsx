import React, { useEffect, useState } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { toast } from "sonner";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

// Função para normalizar texto (remove acentuações e converte para minúsculas)
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim(); // Remove espaços em branco
}

// Função para normalizar categorias
function normalizeCategory(category: string): string {
  return normalizeText(category); // Usa a mesma lógica de texto
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("2024-12"); // Exemplo: "2024-12"

  // Função para atualizar o total de despesas
  const updateTotalExpenses = (filteredExpenses: Expense[]) => {
    const total = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalExpenses(total);
  };

  // Função para carregar as despesas
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token não encontrado");
        alert("Você precisa estar logado para ver as despesas.");
        return;
      }

      try {
        console.log("Iniciando requisição...");
        const response = await fetch("http://localhost:3000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const expensesData = data.map((expense: any) => ({
              ...expense,
              amount: parseFloat(expense.amount) || 0,
              date: expense.date ? new Date(expense.date).toISOString() : "",
              description: normalizeText(expense.description), // Normaliza a descrição
              category: normalizeCategory(expense.category), // Normaliza a categoria
            }));

            setExpenses(expensesData);
            toast.success("Despesas carregadas com sucesso!");
          } else {
            toast.error("Erro ao carregar as despesas.");
          }
        } else {
          toast.error("Erro ao carregar as despesas.");
        }
      } catch (error) {
        console.error("Erro durante a requisição:", error);
        toast.error("Erro ao carregar as despesas.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Filtrar despesas pelo mês selecionado
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, "0")}`;
    return expenseMonth === selectedMonth;
  });

  useEffect(() => {
    updateTotalExpenses(filteredExpenses);
  }, [filteredExpenses]);

  // Agrupar e preparar os dados para o gráfico de pizza
  const groupedExpenses = filteredExpenses.reduce((acc, expense) => {
    const normalizedCategory = normalizeCategory(expense.category);
    if (!acc[normalizedCategory]) {
      acc[normalizedCategory] = 0;
    }
    acc[normalizedCategory] += expense.amount;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(groupedExpenses), // Categorias únicas normalizadas
    datasets: [
      {
        label: "Despesas por Categoria",
        data: Object.values(groupedExpenses), // Soma das despesas por categoria
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div>Carregando despesas...</div>;
  }

  return (
    <div className="p-8 dark:bg-[#011826]">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard</h1>

      {/* Seleção de mês */}
      <div className="mb-6">
        <label htmlFor="month-selector" className="block text-gray-800 dark:text-white">
          Selecionar Mês:
        </label>
        <input
          id="month-selector"
          type="month"
          className="border rounded-md p-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {/* Total de despesas */}
      <div className="mb-6">
        <h2 className="text-xl text-gray-800 dark:text-white">
          Total das Despesas no Mês: R$ {Number(totalExpenses).toFixed(2)}
        </h2>
      </div>

      {/* Gráfico de pizza */}
      <div className="mb-6">
        <h3 className="text-2xl mb-4 text-gray-800 dark:text-white">Distribuição das Despesas por Categoria</h3>
        <div className="w-64 h-64">
          <Pie data={chartData} />
        </div>
      </div>

      {/* Tabela de despesas */}
      <ExpenseTable expenses={filteredExpenses} onDelete={() => {}} />
    </div>
  );
};

export default Dashboard;
