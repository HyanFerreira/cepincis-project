import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../models/Posts.js";

// Função auxiliar para formatar a data
const formatDate = date => {
  const formattedDate = new Date(date).toISOString().split("T")[0]; // Formato YYYY-MM-DD
  return formattedDate;
};

// Controlador para a rota de postagens
export const listPosts = async (_, res) => {
  try {
    const posts = await getAllPosts();

    // Formatar a data de publicação de cada postagem
    const formattedPosts = posts.map(post => ({
      ...post,
      data_publicacao: formatDate(post.data_publicacao) // Formata a data de publicação
    }));

    res.status(200).json(formattedPosts); // Retorna as postagens com a data formatada
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar postagens", error });
  }
};

// Controlador para listar uma postagem específica
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    if (post.length === 0) {
      // Verifique se o array está vazio
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    // Formatar a data de publicação da postagem
    const formattedPost = {
      ...post[0], // Pega a postagem
      data_publicacao: formatDate(post[0].data_publicacao) // Formata a data de publicação
    };

    res.status(200).json(formattedPost); // Retorna a postagem com a data formatada
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar postagem", error });
  }
};

// Controlador para criar uma nova postagem
export const createPostController = async (req, res) => {
  const { titulo, descricao, conteudo, data_publicacao } = req.body;
  try {
    if (!titulo || !descricao || !conteudo || !data_publicacao) {
      return res.status(400).json({ message: "Dados incompletos" });
    }
    const newPostId = await createPost({
      titulo,
      descricao,
      conteudo,
      data_publicacao
    });
    res
      .status(201)
      .json({ message: "Postagem criada com sucesso", id: newPostId });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar postagem", error });
  }
};

// Controlador para atualizar uma postagem
export const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, conteudo } = req.body;
  try {
    if (!titulo || !descricao || !conteudo) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const updatedPost = await updatePost(id, { titulo, descricao, conteudo });
    res
      .status(200)
      .json({ message: "Postagem atualizada com sucesso", updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar postagem", error });
  }
};

// Controlador para deletar um usuário
export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await deletePost(id);
    if (deletedPost) {
      res.status(200).json({ message: "Postagem deletada com sucesso" });
    } else {
      res.status(404).json({ message: "Postagem não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar postagem", error });
  }
};
