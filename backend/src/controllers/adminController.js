import { getAllUsers } from "../models/User.js"; // Importa a função que busca todos os usuários

// Função que será chamada quando a rota /admin for acessada
export const getAdminData = async (_, res) => {
  try {
    // Aqui você pode buscar informações específicas para o painel admin
    const users = await getAllUsers(); // Supondo que getAllUsers retorne todos os usuários do banco de dados

    res.status(200).json({
      message: "Dados do painel de administração",
      users // Envia os dados dos usuários para o frontend
    });
  } catch (error) {
    console.error("Erro ao obter dados do painel", error);
    res.status(500).json({ message: "Erro ao obter dados do painel", error });
  }
};
