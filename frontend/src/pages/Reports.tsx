import React, { useEffect, useState } from "react";
import { toast } from 'sonner';

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null); // Estado para armazenar os dados do relatório
  const [loading, setLoading] = useState(true);

  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token não encontrado!"); // Toast para erro ao não encontrar o token
        return;
      }

      const response = await fetch("http://localhost:3000/reports", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        toast.error("Erro ao buscar dados do relatório"); // Toast para erro ao buscar os dados
        return;
      }

      const data = await response.json();
      console.log("Dados do relatório completo:", data);
      setReportData(data); // Atualiza o estado com os dados do relatório
      toast.success("Relatório carregado com sucesso!"); // Toast de sucesso ao carregar os dados
    } catch (error) {
      toast.error("Erro ao buscar dados do relatório: " + error); // Toast para erro ao tentar buscar os dados
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Array com os nomes dos meses
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-700 dark:text-white">Carregando relatório...</div>;
  }

  if (!reportData) {
    return <div className="text-center text-red-500 dark:text-red-400">Nenhum dado encontrado.</div>;
  }

  // Função para formatar valores monetários
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg dark:bg-[#012840] dark:text-white transition-all">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">Relatório Completo</h1>

      {/* Resumo Mensal */}
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-[#2A3A48] dark:text-white">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Resumo Mensal</h2>
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p><strong>Total gasto:</strong> {formatCurrency(reportData.summary.totalSpent)}</p>

          <h3 className="mt-4 font-semibold">Categorias principais:</h3>
          <ul className="space-y-2 mt-2 text-gray-600 dark:text-gray-400">
            {reportData.summary.categories.map((cat: any, index: number) => (
              <li key={index} className="flex justify-between">
                <span>{cat.category}</span>
                <span>{formatCurrency(cat.total)}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4"><strong>Variação em relação ao mês anterior:</strong> {reportData.summary.variation.toFixed(2)}%</p>
        </div>
      </div>

      {/* Gastos por Categoria */}
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-[#2A3A48] dark:text-white">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Gastos por Categoria</h2>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          {reportData.byCategory.map((cat: any, index: number) => (
            <li key={index} className="flex justify-between">
              <span>{cat.category}</span>
              <span>{formatCurrency(cat.total)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gastos por Mês */}
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-[#2A3A48] dark:text-white">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Gastos por Mês</h2>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          {reportData.byMonth.map((month: any, index: number) => (
            <li key={index} className="flex justify-between">
              {/* Transformando o número do mês para o nome correspondente */}
              <span>{months[month.month - 1]}</span>
              <span>{formatCurrency(month.total)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
