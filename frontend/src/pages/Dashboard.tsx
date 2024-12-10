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

          // Verificando se a resposta é um array
          if (Array.isArray(data)) {
            console.log("Estrutura de despesas:", data);

            // Processando as despesas
            const expensesData = data.map((expense: any) => {
              const amount = parseFloat(expense.amount);
              const date = expense.date ? new Date(expense.date).toISOString() : '';

              console.log(`Processando despesa: ${expense.id}, amount: ${amount}, date: ${date}`);
              
              return {
                ...expense,
                amount: isNaN(amount) ? 0 : amount,  // Garantir que amount seja um número válido
                date: date,
              };
            });

            console.log("Despesas processadas:", expensesData);

            setExpenses(expensesData);  // Atualizando as despesas no estado
            updateTotalExpenses(expensesData);  // Atualizando o total de despesas
            toast.success("Despesas carregadas com sucesso!"); // Toast de sucesso ao carregar as despesas
          } else {
            console.log("A estrutura de despesas não é um array:", data);
            setErrorMessage("Erro ao carregar as despesas.");
            toast.error("Erro ao carregar as despesas."); // Toast de erro se a estrutura não for um array
          }
        } else {
          console.log("Erro ao carregar as despesas", response.status);
          setErrorMessage("Erro ao carregar as despesas.");
          toast.error("Erro ao carregar as despesas."); // Toast de erro ao falhar ao buscar as despesas
        }
      } catch (error) {
        console.error("Erro durante a requisição:", error);
        setErrorMessage("Erro ao carregar as despesas.");
        toast.error("Erro ao carregar as despesas."); // Toast de erro em caso de erro na requisição
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []); // Certifique-se de que o useEffect seja executado apenas uma vez na carga da página

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
        updateTotalExpenses(updatedExpenses);  // Atualizando o total de despesas após a exclusão
        toast.success("Despesa excluída com sucesso!"); // Toast de sucesso ao excluir a despesa
      } else {
        toast.error("Erro ao excluir a despesa."); // Toast de erro ao falhar ao excluir a despesa
      }
    } catch (error) {
      console.error("Erro ao excluir a despesa:", error);
      toast.error("Erro ao excluir a despesa."); // Toast de erro em caso de erro na exclusão
    }
  };

  // Preparando os dados para o gráfico de pizza
  const chartData = {
    labels: [...new Set(expenses.map(expense => expense.category))], // Categorias únicas
    datasets: [
      {
        label: "Despesas por Categoria",
        data: [...new Set(expenses.map(expense => expense.category))].map(
          (category) =>
            expenses
              .filter((expense) => expense.category === category)
              .reduce((sum, expense) => sum + expense.amount, 0)
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)"
        ], // Cores diferentes para as fatias
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

  console.log("Despesas no Dashboard:", expenses);  // Verifique se o estado das despesas está correto

  return (
    <div className="p-8 dark:bg-[#011826]">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard</h1>
      <div className="mb-6">
        {/* Garantir que totalExpenses seja um número */}
        <h2 className="text-xl text-gray-800 dark:text-white">
          Total das Despesas: R$ {Number(totalExpenses).toFixed(2)}
        </h2>
      </div>

      {/* Gráfico de pizza */}
      <div className="mb-6">
        <h3 className="text-2xl mb-4 text-gray-800 dark:text-white">Distribuição das Despesas por Categoria</h3>
        <div className="w-64 h-64">
        <Pie data={chartData} />
        </div>
      </div>

      {/* Passando as despesas para o ExpenseTable */}
      <ExpenseTable expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
