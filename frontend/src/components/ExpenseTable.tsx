import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Ícone de lixeira

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
  console.log("Despesas no componente ExpenseTable:", expenses); // Verifique as despesas recebidas pelo componente

  return (
    <table className="table-auto w-full bg-white dark:bg-[#1e2a47] shadow-md rounded-lg overflow-hidden">
      <thead className="bg-[#012840] dark:bg-[#03658C] text-white">
        <tr>
          <th className="px-4 py-2 text-center">Descrição</th>
          <th className="px-4 py-2 text-center">Categoria</th>
          <th className="px-4 py-2 text-center">Valor</th>
          <th className="px-4 py-2 text-center">Data</th>
          <th className="px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <tr key={expense.id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2 text-center">{expense.description}</td>
              <td className="px-4 py-2 text-center">{expense.category}</td>
              <td className="px-4 py-2 text-center">
                {/* Garantir que 'amount' seja tratado como número */}
                R$ {expense.amount.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-center">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => onDelete(expense.id)}
                  aria-label={`Excluir despesa ${expense.description}`} // Melhorando a acessibilidade
                >
                  <FaTrashAlt className="inline-block mr-2" />
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
