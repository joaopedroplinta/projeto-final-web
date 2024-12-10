import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'sonner'; // Importando o toast
import logo from "../assets/logo_projeto.png"; // Importe a logo

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para exibir mensagens de erro
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token no localStorage
        localStorage.setItem("token", data.token);

        // Exibe um toast de sucesso
        toast.success("Login realizado com sucesso!");

        // Redireciona para o dashboard
        navigate("/dashboard");
      } else {
        // Exibe a mensagem de erro retornada pela API
        setErrorMessage(data.message || "Erro ao fazer login.");
        toast.error(data.message || "Erro ao fazer login."); // Exibe o erro como toast
      }
    } catch (error) {
      setErrorMessage("Erro na conexão com o servidor.");
      toast.error("Erro na conexão com o servidor."); // Exibe o erro de conexão como toast
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC] dark:bg-[#011826]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-[#2A3A48] dark:text-white">
        {/* Logo acima do título Login */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="h-40" /> {/* Logo com tamanho ajustado */}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-[#2A3A48] dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-[#2A3A48] dark:border-gray-600 dark:text-white"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}
          <div className="flex justify-center">
            <button type="submit" className="w-full p-2 bg-[#03658C] text-white rounded-md hover:bg-[#025A73] dark:bg-[#03658C] dark:hover:bg-[#025A73]">
              Entrar
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-[#03658C] hover:underline dark:text-[#03658C]">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
