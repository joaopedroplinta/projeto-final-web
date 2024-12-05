import React, { useState } from "react";

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
        // Se o cadastro for bem-sucedido, você pode redirecionar para a página de login
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "/login"; // Redirecionando para a página de login
      } else {
        const data = await response.json();
        alert(data.message || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
              Cadastrar
            </button>
          </div>
        </form>

        {/* Link para ir ao login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
