import connection from "../config/db.js"; // Importa a conexão com o db

// Função para listar todos as postagens
export const getAllPosts = async () => {
  const [rows] = await connection.execute("SELECT * FROM postagens");
  return rows;
};

// Função para listar uma postagem por ID
export const getPostById = async id => {
  const [
    rows
  ] = await connection.execute("SELECT * FROM postagens WHERE id = ?", [id]);
  return rows;
};

// Função para criar uma nova postagem
export const createPost = async post => {
  const { titulo, descricao, conteudo, data_publicacao } = post;
  const [
    result
  ] = await connection.execute(
    "INSERT INTO postagens (titulo, descricao, conteudo, data_publicacao) VALUES (?, ?, ?, ?)",
    [titulo, descricao, conteudo, data_publicacao]
  );
  return result.insertId; // Retorna o ID da nova postagem inserida
};

// Função para atualizar uma postagem
export const updatePost = async (id, post) => {
  const { titulo, descricao, conteudo } = post;
  const [
    result
  ] = await connection.execute(
    "UPDATE postagens SET titulo = ?, descricao = ?, conteudo = ? WHERE id = ?",
    [titulo, descricao, conteudo, id]
  );
  return result.affectedRows > 0 ? { id, titulo, descricao, conteudo } : null; // Retorna a postagem atualizada, ou null se não encontrada
};

// Função para deletar uma postagem
export const deletePost = async id => {
  const [
    result
  ] = await connection.execute("DELETE FROM postagens WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
