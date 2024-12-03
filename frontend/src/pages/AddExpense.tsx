import React from "react";
import ExpenseForm from "../components/ExpenseForm";

const AddExpense: React.FC = () => {
  const handleSubmit = async (data: {
    description: string;
    category: string;
    amount: number;
    date: string;
  }) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Despesa adicionada com sucesso!");
    } else {
      alert("Erro ao adicionar despesa.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddExpense;
