import express from "express";
import {
  listUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/userController.js";

const router = express.Router();

// Rota para listar todos os usuários
router.get("/users", listUsers);

// Rota para listar um usuário específico
router.get("/users/user/:id", getUser);

// Rota para criar um novo usuário
router.post("/users/create-user", createUserController);

// Rota para atualizar um usuário
router.put("/users/update-user/:id", updateUserController);

// Rota para deletar um usuário
router.delete("/users/delete-user/:id", deleteUserController);

export default router;
