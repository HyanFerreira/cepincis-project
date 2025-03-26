import express from "express";
import {
  listUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUser
} from "../controllers/userController.js";

import { authenticateJWT } from "../middlewares/authenticate.js";
import { getAdminData } from "../controllers/adminController.js";

const router = express.Router();

// Rota para listar todos os usuários
router.get("/", listUsers);

// Rota para listar um usuário específico
router.get("/user/:id", getUser);

// Rota para autenticação de usuário
router.post("/login", loginUser);

// Rota protegida para acessar a página admin
router.get("/admin", authenticateJWT, getAdminData);

// Rota para criar um novo usuário
router.post("/create-user", authenticateJWT, createUserController);

// Rota para atualizar um usuário
router.put("/update-user/:id", authenticateJWT, updateUserController);

// Rota para deletar um usuário
router.delete("/delete-user/:id", authenticateJWT, deleteUserController);

export default router;
