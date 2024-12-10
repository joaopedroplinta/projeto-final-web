import React from "react";

interface MonthlySummaryProps {
  totalSpent: number;
  categories: { category: string; total: number }[];
  variation: number;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({
  totalSpent,
  categories,
  variation,
}) => {
  return (
    <div className="p-6 bg-white dark:bg-[#1e2a47] shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Resumo Mensal</h2>
      <p className="text-lg mb-2 text-gray-800 dark:text-white">
        Total gasto no mês: R$ {totalSpent.toFixed(2)}
      </p>
      <p className="text-lg mb-4">
        Variação em relação ao mês anterior:{" "}
        <span
          className={`${
            variation >= 0 ? "text-red-500" : "text-green-500"
          } font-semibold`}
        >
          {variation.toFixed(2)}%
        </span>
      </p>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        Principais Categorias:
      </h3>
      <ul className="list-disc pl-6">
        {categories.map((cat, index) => (
          <li key={index} className="mb-1 text-gray-800 dark:text-white">
            {cat.category}: R$ {cat.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlySummary;
