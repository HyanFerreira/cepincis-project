document.addEventListener("DOMContentLoaded", async () => {
  const postsList = document.getElementById("postsList");
  // const usersContainer = document.getElementById("usersContainer");

  // Buscar postagens e exibir na página
  const posts = await getPosts();
  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("posts__item");

    // Convertendo a data para o formato brasileiro
    const dataPublicacao = new Date(post.data_publicacao).toLocaleDateString(
      "pt-BR"
    );

    postElement.innerHTML = `
      <div class="block__top">
          <h2 class="posts__title f--18">${post.titulo}</h2>
          <p class="posts__description">${post.descricao}</p>
      </div>
      <div class="block__bottom">
          <small class="posts__date">Publicado em: <strong>${dataPublicacao}</strong></small>
          <button class="btn__openPost">Saiba mais</button>
      </div>
    `;

    // Adicionando evento no botão
    const button = postElement.querySelector(".btn__openPost");
    button.addEventListener("click", () => {
      const postId = post.id;
      const postTitulo = encodeURIComponent(
        post.titulo.replace(/\s+/g, "-").toLowerCase()
      );
      window.location.href = `../frontend/pages/post.html?id=${postId}&titulo=${postTitulo}`;
    });

    postsList.appendChild(postElement);
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
