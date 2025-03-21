document.addEventListener("DOMContentLoaded", async () => {
  const postsListAdmin = document.getElementById("postsListAdmin");

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
            <div class="block__content">
                <h2 class="posts__title f--18">${post.titulo}</h2>
                <p class="posts__description">${post.descricao}</p>
                <small class="posts__date">Publicado em: <strong>${dataPublicacao}</strong></small>
            </div>
            <div class="block__panel">
                <button class="btn__editPost f--16" id="btnEditPost"><ion-icon class="ion-icons f--16" name="create-outline"></ion-icon> Editar</button>
                <button class="btn__deletePost f--16" id="btnDeletePost"><ion-icon class="ion-icons f--16" name="trash-outline"></ion-icon> Excluir</button>
            </div>
        `;

    // Adicionando evento no botão "Deletar"
    const buttonDelete = postElement.querySelector("#btnDeletePost");
    buttonDelete.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Você tem certeza que deseja excluir esta postagem?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `${API_URL}/api/posts/delete-post/${post.id}`,
            { method: "DELETE" }
          );
          if (response.ok) {
            alert("Postagem excluída com sucesso!");
            postElement.remove(); // Remover o post da lista
          } else {
            alert("Erro ao excluir postagem.");
          }
        } catch (error) {
          console.error("Erro ao excluir postagem:", error);
          alert("Erro ao excluir postagem.");
        }
      }
    });

    // Adicionando evento no botão "Editar"
    const buttonEdit = postElement.querySelector("#btnEditPost");
    const modalEdit = document.getElementById("modalEdit");
    const body = document.body;

    buttonEdit.addEventListener("click", () => {
      // Preenche os campos do modal com os dados do post
      document.getElementById("editTitulo").value = post.titulo;
      document.getElementById("editDescricao").value = post.descricao;
      document.getElementById("editConteudo").value = post.conteudo;

      modalEdit.classList.add("active");
      body.classList.add("scrolling--disabled");

      // Evento para salvar as alterações
      const formEditPost = document.getElementById("formEditPost");
      formEditPost.onsubmit = async e => {
        e.preventDefault();

        // Dados atualizados
        const updatedPost = {
          titulo: formEditPost.titulo.value,
          descricao: formEditPost.descricao.value,
          conteudo: formEditPost.conteudo.value
        };

        try {
          const response = await fetch(
            `${API_URL}/api/posts/update-post/${post.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedPost)
            }
          );

          if (response.ok) {
            alert("Postagem atualizada com sucesso!");

            // Atualizar a postagem na lista sem recarregar a página
            postElement.querySelector(".posts__title").textContent =
              updatedPost.titulo;
            postElement.querySelector(".posts__description").textContent =
              updatedPost.descricao;

            // Fechar o modal
            modalEdit.classList.remove("active");
            body.classList.remove("scrolling--disabled");
          } else {
            alert("Erro ao atualizar postagem.");
          }
        } catch (error) {
          console.error("Erro ao atualizar postagem:", error);
          alert("Erro ao atualizar postagem.");
        }
      };
    });

    // Fechar modal
    const buttonCloseModalEdit = document.getElementById("btnCloseModalEdit");
    buttonCloseModalEdit.addEventListener("click", () => {
      modalEdit.classList.remove("active");
      body.classList.remove("scrolling--disabled");
    });

    postsListAdmin.appendChild(postElement);
  });
});
