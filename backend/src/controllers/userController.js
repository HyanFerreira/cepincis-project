import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
} from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }

    // Comparar senha fornecida com a senha armazenada
    const senhaCorreta = await bcryptjs.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "2h" // Expira em 2 horas
    });

    res.status(200).json({ token, user: { id: user.id, nome: user.nome } });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
};

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

    // Chama a função para criar o usuário, que agora já criptografa a senha
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
