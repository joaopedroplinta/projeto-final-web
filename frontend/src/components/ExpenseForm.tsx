import React, { useState } from "react";

interface FormData {
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface Props {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
}

const ExpenseForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>(
    initialData || { description: "", category: "", amount: 0, date: "" }
  );
  
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!formData.description || !formData.category || !formData.amount || !formData.date) {
      setError("Todos os campos devem ser preenchidos.");
      return;
    }

    if (formData.amount <= 0) {
      setError("O valor deve ser maior que zero.");
      return;
    }

    setError(""); // Limpar mensagens de erro
    onSubmit(formData);
    setFormData({ description: "", category: "", amount: 0, date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96 dark:bg-gray-800 dark:text-white">
      <input
        type="text"
        placeholder="Descrição"
        aria-label="Descrição da despesa"
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Categoria"
        aria-label="Categoria da despesa"
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Valor"
        aria-label="Valor da despesa"
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
      />
      <input
        type="date"
        aria-label="Data da despesa"
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="bg-[#03658C] text-white w-full py-2 rounded hover:bg-[#023E55]"
      >
        Salvar
      </button>
    </form>
  );
};

export default ExpenseForm;
