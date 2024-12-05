import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Para redirecionar o usuário após o logout

  // Verifica se o token está presente no localStorage quando a página carrega
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Atualiza o estado com base no token
  }, []); // Esse useEffect será executado apenas uma vez ao carregar o componente

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado para não autenticado
    navigate("/login"); // Redireciona o usuário para a página de login
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
            </li>
            <li>
              <Link to="/add-expense" className="text-white">Adicionar Despesa</Link>
            </li>
            <li>
              <Link to="/reports" className="text-white">Relatórios</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white">Sair</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="text-white">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
