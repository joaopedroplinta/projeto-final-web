import React, { useState, useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Verifica o modo preferido do usuário no localStorage ao carregar a página
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Alterna entre os modos claro e escuro
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
    <label className="flex items-center cursor-pointer">
      <span className="mr-3 text-sm">{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="sr-only" // Esconde o checkbox real
        />
        <div
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-gray-300"}`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 transform ${isDarkMode ? "translate-x-6" : "translate-x-0"}`}
          />
        </div>
      </div>
    </label>
  );
};

export default DarkModeToggle;
