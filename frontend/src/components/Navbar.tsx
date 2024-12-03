import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
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
          <Link to="/login" className="text-white">Sair</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
