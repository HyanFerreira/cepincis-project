import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

// Importação das rotas
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Bem-vindo(a)!"
  });
});

// Rotas da API
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
