import React, { useState } from "react";
import { toast } from 'sonner';
import logo from "../assets/logo_projeto.png";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Se o cadastro for bem-sucedido, notificação de sucesso
        toast.success("Usuário cadastrado com sucesso!", {
          position: "bottom-right", // Posição do toast
          duration: 4000, // Duração do toast
        });
        window.location.href = "/login"; // Redirecionando para a página de login
      } else {
        const data = await response.json();
        toast.error(data.message || "Erro ao cadastrar usuário.", {
          position: "bottom-right",
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Erro na conexão com o servidor.", {
        position: "bottom-right",
        duration: 4000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC] dark:bg-[#011826]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-[#2A3A48] dark:text-white">

        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="h-40" /> {/* Logo com tamanho ajustado */}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Cadastrar</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-[#2A3A48] dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* E-mail */}
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

          {/* Senha */}
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

          <div className="flex justify-center">
            <button type="submit" className="w-full p-2 bg-[#03658C] text-white rounded-md hover:bg-[#025A73] dark:bg-[#03658C] dark:hover:bg-[#025A73]">
              Cadastrar
            </button>
          </div>
        </form>

        {/* Link para ir ao login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Já tem uma conta?{" "}
            <a href="/login" className="text-[#03658C] hover:underline dark:text-[#03658C]">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
