import React from "react";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseTable: React.FC<Props> = ({ expenses, onDelete }) => {
  console.log("Despesas no componente ExpenseTable:", expenses);  // Verifique as despesas recebidas pelo componente

  return (
    <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-4 py-2">Descrição</th>
          <th className="px-4 py-2">Categoria</th>
          <th className="px-4 py-2">Valor</th>
          <th className="px-4 py-2">Data</th>
          <th className="px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <tr key={expense.id} className="border-b">
              <td className="px-4 py-2">{expense.description}</td>
              <td className="px-4 py-2">{expense.category}</td>
              <td className="px-4 py-2">
                {/* Garantir que 'amount' seja tratado como número */}
                R$ {expense.amount.toFixed(2)}
              </td>
              <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => onDelete(expense.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-4">Nenhuma despesa encontrada</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
