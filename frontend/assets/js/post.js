document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    document.querySelector(".container__postById").innerHTML =
      "<p>Post não encontrado.</p>";
    return;
  }

  // Simulando uma busca pelo post específico (substitua pela chamada real da API se necessário)
  const posts = await getPosts();
  const post = posts.find(p => p.id == postId);

  if (!post) {
    document.querySelector(".container__postById").innerHTML =
      "<p>Post não encontrado.</p>";
    return;
  }

  // Formatando a data para o formato brasileiro
  const dataPublicacao = new Date(post.data_publicacao).toLocaleDateString(
    "pt-BR"
  );

  // Criando o HTML do post
  document.querySelector(".container__postById").innerHTML = `
      <div class="postById_content">
        <h1 class="post__title f--22">${post.titulo}</h1>
        <p class="post__description">${post.descricao}</p>
        <p class="post__content">${post.conteudo}</p>
        <small class="post__date">Publicado em: <strong>${dataPublicacao}</strong></small>
      </div>
    `;
});
