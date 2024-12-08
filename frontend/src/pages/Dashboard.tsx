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

  // Função para atualizar o total de despesas
  const updateTotalExpenses = (expenses: Expense[]) => {
    const total = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalExpenses(total);  // Atualizando o total de despesas
  };

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
          } else {
            console.log("A estrutura de despesas não é um array:", data);
          }
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

  console.log("Despesas no Dashboard:", expenses);  // Verifique se o estado das despesas está correto

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6">
        {/* Garantir que totalExpenses seja um número */}
        <h2 className="text-xl">
          Total das Despesas: R$ {Number(totalExpenses).toFixed(2)}
        </h2>
      </div>
      {/* Passando as despesas para o ExpenseTable */}
      <ExpenseTable expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
