import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Para redirecionar o usuário após o logout
  const location = useLocation(); // Para verificar a URL atual

  // Verifica se o token está presente no localStorage sempre que a página carregar ou quando o token for alterado
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Atualiza o estado com base no token
  }, [location.pathname]); // Atualiza sempre que o path mudar, o que ajuda a refletir alterações no estado

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado para não autenticado
    navigate("/login"); // Redireciona o usuário para a página de login
  };

  // Condição para não mostrar a navbar nas páginas de login e register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null; // Não renderiza a Navbar nessas páginas
  }

  return (
    <nav className="bg-[#0BB3D9] p-4">
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
