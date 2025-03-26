import connection from "../config/db.js";
import bcryptjs from "bcryptjs"; // Certifique-se de importar o bcryptjs

export const getUserByEmail = async email => {
  const [
    rows
  ] = await connection.execute("SELECT * FROM usuarios WHERE email = ?", [
    email
  ]);
  return rows[0]; // Retorna o usuário encontrado ou undefined
};

// Função para listar todos os usuários
export const getAllUsers = async () => {
  const [rows] = await connection.execute("SELECT * FROM usuarios");
  return rows;
};

// Função para listar um usuário por ID
export const getUserById = async id => {
  const [
    rows
  ] = await connection.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0];
};

// Função para criar um novo usuário
export const createUser = async user => {
  const { nome, email, senha } = user;

  // Criptografar a senha antes de armazenar
  const senhaCriptografada = await bcryptjs.hash(senha, 10); // 10 é o número de saltos (quanto maior, mais seguro)

  const [result] = await connection.execute(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaCriptografada] // Armazenando a senha criptografada
  );

  return result.insertId; // Retorna o ID do novo usuário inserido
};

// Função para atualizar um usuário
export const updateUser = async (id, user) => {
  const { nome, email, senha } = user;
  const [
    result
  ] = await connection.execute(
    "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
    [nome, email, senha, id]
  );
  return result.affectedRows > 0 ? { id, nome, email, senha } : null; // Retorna o usuário atualizado, ou null se não encontrado
};

// Função para deletar um usuário
export const deleteUser = async id => {
  const [
    result
  ] = await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
