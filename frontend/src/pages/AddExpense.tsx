import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { toast } from 'sonner'; // Importando o toast

const AddExpense: React.FC = () => {
  const handleSubmit = async (data: {
    description: string;
    category: string;
    amount: number;
    date: string;
  }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado para adicionar uma despesa.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Despesa adicionada com sucesso!"); // Toast de sucesso
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Erro ao adicionar despesa.";
        toast.error(errorMessage); // Toast de erro com mensagem detalhada
      }
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      toast.error("Erro ao adicionar despesa."); // Toast de erro em caso de falha na requisição
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#F8FAFC] dark:bg-[#011826]">
      <div className="w-full max-w-md p-6 bg-white dark:bg-[#1e2a47] rounded-lg shadow-md">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddExpense;
  