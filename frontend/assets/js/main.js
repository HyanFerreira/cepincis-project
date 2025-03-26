document.addEventListener("DOMContentLoaded", async () => {
  const postsList = document.getElementById("postsList");
  // const usersContainer = document.getElementById("usersContainer");

  // Buscar postagens e exibir na página
  const posts = await getPosts();
  posts.forEach(post => {
    const postElementBlock = document.createElement("div");
    postElementBlock.classList.add("posts__item");

    // Convertendo a data para o formato brasileiro
    const dataPublicacao = new Date(post.data_publicacao).toLocaleDateString(
      "pt-BR"
    );

    // Convertendo as tags em uma lista
    const tagsList = post.tags
      .split(", ")
      .map(tag => `<span class="tag"><strong>${tag}</strong></span>`)
      .join(", "); // Agora as tags são separadas por vírgula

    postElementBlock.innerHTML = `
      <div class="block__top">
          <h2 class="posts__title f--18">${post.titulo}</h2>
          <p class="posts__description">${post.descricao}</p>
      </div>
      <div class="block__bottom">
        <small class="posts__date">Publicado em: <strong>${dataPublicacao}</strong></small>
        <div class="postsList__tags">
          <small>Tags: ${tagsList}</small>
        </div>
        <button class="btn__openPost">Saiba mais</button>
      </div>
    `;

    // Adicionando evento no botão
    const button = postElementBlock.querySelector(".btn__openPost");
    button.addEventListener("click", () => {
      const postId = post.id;
      const postTitulo = encodeURIComponent(
        post.titulo.replace(/\s+/g, "-").toLowerCase()
      );
      window.location.href = `../frontend/pages/post.html?id=${postId}&titulo=${postTitulo}`;
    });

    postsList.appendChild(postElementBlock);
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
