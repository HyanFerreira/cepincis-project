import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import "./src/config/db.js"; // Importando o banco de dados para executar a conexão

// Importações referente aos usuários
import userRoutes from "./src/routes/userRoutes.js"; // Importe as rotas de usuários

// Importações referente as postagens
import postRoutes from "./src/routes/postRoutes.js"; // Importe as rotas de postagens

dotenv.config(); // Carrega as variáveis do .env

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Libera acesso para diferentes origens
app.use(express.json()); // Permite receber JSON no corpo das requisições

// Servir arquivos estáticos
app.use(express.static(path.resolve("public"))); // Serve os arquivos estáticos da pasta public

// Rota inicial
app.get("/", (_, res) => {
  res.send("API está rodando!");
});

// Definir as rotas do frontend
app.get("/home", (_, res) => {
  res.sendFile(path.resolve("public/index.html")); // Serve o index.html da pasta public
});

// Usar a rota para listar usuários
app.use(userRoutes);

// Usar a rota para listar postagens
app.use(postRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
