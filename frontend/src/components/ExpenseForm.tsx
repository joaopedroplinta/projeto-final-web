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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ description: "", category: "", amount: 0, date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96">
      <input
        type="text"
        placeholder="Descrição"
        className="w-full mb-4 p-2 border rounded"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Categoria"
        className="w-full mb-4 p-2 border rounded"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Valor"
        className="w-full mb-4 p-2 border rounded"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
      />
      <input
        type="date"
        className="w-full mb-4 p-2 border rounded"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
        Salvar
      </button>
    </form>
  );
};

export default ExpenseForm;
