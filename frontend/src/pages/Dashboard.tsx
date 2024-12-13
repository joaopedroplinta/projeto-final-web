import React, { useEffect, useState } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { toast } from 'sonner'; // Importando o toast
import { Pie } from 'react-chartjs-2'; // Importando o gráfico de pizza
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'; 

// Registrando os componentes do Chart.js para o gráfico de pizza
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);  // Lista de despesas
  const [loading, setLoading] = useState<boolean>(true); // Controle de carregamento
  const [totalExpenses, setTotalExpenses] = useState<number>(0); // Total das despesas
  const [errorMessage, setErrorMessage] = useState<string>(""); // Controle de erros

  // Função para normalizar categorias
  const normalizeCategory = (category: string): string => {
    return category.trim().toLowerCase(); // Remove espaços e converte para minúsculas
  };

  // Função para atualizar o total de despesas
  const updateTotalExpenses = (expenses: Expense[]) => {
    const total = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalExpenses(total);  // Atualizando o total de despesas
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
          console.log("Resposta completa da API:", data);

          if (Array.isArray(data)) {
            const expensesData = data.map((expense: any) => {
              const amount = parseFloat(expense.amount);
              const date = expense.date ? new Date(expense.date).toISOString() : '';
              return {
                ...expense,
                amount: isNaN(amount) ? 0 : amount,
                date,
                category: normalizeCategory(expense.category), // Normaliza a categoria
              };
            });

            setExpenses(expensesData);
            updateTotalExpenses(expensesData);
            toast.success("Despesas carregadas com sucesso!");
          } else {
            setErrorMessage("Erro ao carregar as despesas.");
            toast.error("Erro ao carregar as despesas.");
          }
        } else {
          setErrorMessage("Erro ao carregar as despesas.");
          toast.error("Erro ao carregar as despesas.");
        }
      } catch (error) {
        console.error("Erro durante a requisição:", error);
        setErrorMessage("Erro ao carregar as despesas.");
        toast.error("Erro ao carregar as despesas.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para excluir uma despesa.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);
        updateTotalExpenses(updatedExpenses);
        toast.success("Despesa excluída com sucesso!");
      } else {
        toast.error("Erro ao excluir a despesa.");
      }
    } catch (error) {
      console.error("Erro ao excluir a despesa:", error);
      toast.error("Erro ao excluir a despesa.");
    }
  };

  // Agrupando despesas por categoria
  const groupExpensesByCategory = () => {
    const grouped: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      grouped[expense.category] = (grouped[expense.category] || 0) + expense.amount;
    });
    return grouped;
  };

  const groupedExpenses = groupExpensesByCategory();

  // Preparando os dados para o gráfico de pizza
  const chartData = {
    labels: Object.keys(groupedExpenses).map((category) => 
      category.charAt(0).toUpperCase() + category.slice(1) // Capitaliza a categoria
    ),
    datasets: [
      {
        label: "Despesas por Categoria",
        data: Object.values(groupedExpenses),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", 
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
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
      <div className="mb-6">
        <h2 className="text-xl text-gray-800 dark:text-white">
          Total das Despesas: R$ {Number(totalExpenses).toFixed(2)}
        </h2>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl mb-4 text-gray-800 dark:text-white">Distribuição das Despesas por Categoria</h3>
        <div className="w-64 h-64">
          <Pie data={chartData} />
        </div>
      </div>

      <ExpenseTable expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
