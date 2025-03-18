import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import "./src/config/db.js";

// Importação das rotas
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do LiveReload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.resolve("public"));
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.resolve("public")));

// Rota inicial
app.get("/", (_, res) => res.send("API está rodando!"));

// Definir as rotas do frontend
app.get("/home", (_, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/login", (_, res) => {
  res.sendFile(path.resolve("public/views/login.html"));
});

// Usar rotas da API
app.use(userRoutes);
app.use(postRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
