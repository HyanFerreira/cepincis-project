import express from "express";
import {
  listPosts,
  getPost,
  createPostController,
  updatePostController,
  deletePostController
} from "../controllers/postController.js";

const router = express.Router();

// Rota para listar todos os usuários
router.get("/", listPosts);

// Rota para lista uma postagem específica
router.get("/post/:id", getPost);

// Rota para criar uma nova postagem
router.post("/create-post", createPostController);

// Rota para atualizar uma postagem
router.put("/update-post/:id", updatePostController);

// Rota para deletar uma postagem
router.delete("/delete-post/:id", deletePostController);

export default router;
