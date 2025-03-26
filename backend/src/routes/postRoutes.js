import express from "express";
import {
  listPosts,
  getPost,
  createPostController,
  updatePostController,
  deletePostController
} from "../controllers/postController.js";
import { authenticateJWT } from "../middlewares/authenticate.js";

const router = express.Router();

// Rota para listar todos os usuários
router.get("/", listPosts);

// Rota para lista uma postagem específica
router.get("/post/:id", getPost);

// Rota para criar uma nova postagem
router.post("/create-post", authenticateJWT, createPostController);

// Rota para atualizar uma postagem
router.put("/update-post/:id", authenticateJWT, updatePostController);

// Rota para deletar uma postagem
router.delete("/delete-post/:id", authenticateJWT, deletePostController);

export default router;
