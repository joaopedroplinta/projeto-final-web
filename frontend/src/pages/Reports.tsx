import React, { useEffect, useState } from "react";

const Reports: React.FC = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/reports/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data);
      } else {
        alert("Erro ao carregar o relatório.");
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Relatórios</h1>
      {summary ? (
        <div>
          <p>Total de despesas: R$ {summary.total.toFixed(2)}</p>
          {/* Adicione outros dados do resumo aqui */}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Reports;
