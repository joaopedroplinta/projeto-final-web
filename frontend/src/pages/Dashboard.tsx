import React, { useEffect, useState } from "react";
import ExpenseTable from "../components/ExpenseTable";

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    console.log("Fetching expenses...");
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verifique os dados que estão sendo recebidos
        setExpenses(data);
      } else {
        alert("Erro ao carregar as despesas.");
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } else {
      alert("Erro ao excluir a despesa.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ExpenseTable expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
