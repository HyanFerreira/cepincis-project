document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("postsContainer");
  const usersContainer = document.getElementById("usersContainer");

  // Buscar postagens e exibir na página
  const posts = await getPosts();
  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
        <h2>${post.titulo}</h2>
        <p>${post.descricao}</p>
        <p>${post.conteudo}</p>
        <small>Publicado em: ${post.data_publicacao}</small>
        <hr>
      `;
    postsContainer.appendChild(postElement);
  });

  // Buscar usuários e exibir na página
//   const users = await getUsers();
//   users.forEach(user => {
//     const userElement = document.createElement("div");
//     userElement.innerHTML = `
//         <p>Nome: <strong>${user.nome}</strong></p>
//         <p>Email: ${user.email}</p>
//         <p>Senha: ${user.senha}</p>
//         <hr>
//     `;
//     usersContainer.appendChild(userElement);
//   });
});
