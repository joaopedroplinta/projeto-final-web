import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";
import { Toaster } from 'sonner';
import DarkModeToggle from "./components/DarkModeToggle"; // Importando o Toggle de Light/Dark Mode

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Verifica o token no localStorage para autenticação
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Verifica a preferência de tema do usuário no localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); // Aplica o dark mode
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark"); // Aplica o light mode
    }
  }, []);

  // Função para alternar entre light e dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#011826] text-gray-900 dark:text-white transition-all">
        <Toaster position="bottom-right" />
        
        {/* Exibe o Navbar apenas se o usuário estiver autenticado */}
        {isAuthenticated && <Navbar />}

        {/* Adiciona o botão de toggle do dark mode no topo */}
        <div className="absolute top-4 right-4">
          <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
