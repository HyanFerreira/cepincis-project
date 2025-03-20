import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import livereload from "livereload";
// import connectLivereload from "connect-livereload";
import "./config/db.js";

// Importação das rotas
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Resolver corretamente o caminho do diretório (porque usamos ES Modules)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const frontendPath = path.join(__dirname, "../../frontend");

// Configuração do livereload
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(frontendPath);

// Conectar o livereload ao Express para injetar o script no HTML
// app.use(connectLivereload());

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend
// app.use(express.static(frontendPath));

app.get("/", (_, res) => {
  res.json({
    message: "Bem-vindo(a)!"
  });
});

// Rotas do frontend (HTML)
// app.get("/", (_, res) => res.sendFile(path.join(frontendPath, "index.html")));

// app.get("/about", (_, res) => res.sendFile(path.join(frontendPath, "pages/about.html")));

// app.get("/posts", (_, res) => res.sendFile(path.join(frontendPath, "pages/posts.html")));

// app.get("/production", (_, res) => res.sendFile(path.join(frontendPath, "pages/production.html")));

// app.get("/contact", (_, res) => res.sendFile(path.join(frontendPath, "pages/contact.html")));

// app.get("/admin", (_, res) => res.sendFile(path.join(frontendPath, "pages/admin.html")));

// Para garantir que todas as outras rotas sirvam o index.html (caso use SPA)
// app.get("*", (_, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// Rotas da API
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
