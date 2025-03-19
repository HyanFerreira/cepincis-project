const API_URL = "http://localhost:3000"; // URL do backend

// Buscar todas as postagens
async function getPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
  }
}

// Buscar todos os usuários
async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();
    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
  }
}
