import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis do .env

// Criar conexão com o banco de dados
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testar conexão
try {
  await connection.connect();
  console.log("✅ Conectado ao banco de dados!");
} catch (error) {
  console.error("❌ Erro ao conectar ao banco de dados:", error);
}

export default connection;
