import React from "react";

interface DarkModeToggleProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <span className="mr-3 text-sm">{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="sr-only"
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
