import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../models/User.js";

// Controlador para listar todos os usuários
export const listUsers = async (_, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users); // Retorna a lista de usuários no formato JSON
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar usuários", error });
  }
};

// Controlador para listar um usuário específico
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};

// Controlador para criar um novo usuário
export const createUserController = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Dados incompletos" });
    }
    const newUserId = await createUser({ nome, email, senha });
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", id: newUserId });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

// Controlador para atualizar um usuário
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const updatedUser = await updateUser(id, { nome, email, senha });
    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

// Controlador para deletar um usuário
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
};
