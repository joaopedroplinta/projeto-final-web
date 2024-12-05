import React, { useEffect, useState } from "react";
import ExpenseTable from "../components/ExpenseTable";

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
          console.log("Despesas recebidas:", data);  // Verifique o que vem da API

          setExpenses(data.expenses);  // Definir as despesas
          setTotalExpenses(data.totalExpenses);  // Definir o total das despesas
        } else {
          console.log("Erro ao carregar as despesas", response.status);
          alert("Erro ao carregar as despesas.");
        }
      } catch (error) {
        console.error("Erro durante a requisição:", error);
        alert("Erro ao carregar as despesas.");
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
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } else {
        alert("Erro ao excluir a despesa.");
      }
    } catch (error) {
      console.error("Erro ao excluir a despesa:", error);
      alert("Erro ao excluir a despesa.");
    }
  };

  if (loading) {
    return <div>Carregando despesas...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl">Total das Despesas: R$ {totalExpenses.toFixed(2)}</h2>
      </div>
      <ExpenseTable expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
