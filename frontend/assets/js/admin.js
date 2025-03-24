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
        <button class="btn__editPost f--16" data-id="${post.id}">
          <ion-icon class="ion-icons f--16" name="create-outline"></ion-icon> Editar
        </button>
        <button class="btn__deletePost f--16" data-id="${post.id}">
          <ion-icon class="ion-icons f--16" name="trash-outline"></ion-icon> Excluir
        </button>
      </div>
    `;

    // Adicionando evento no botão "Deletar"
    const buttonDelete = postElement.querySelector(".btn__deletePost");
    buttonDelete.addEventListener("click", async event => {
      const postId = event.target.getAttribute("data-id");
      const confirmDelete = confirm(
        "Você tem certeza que deseja excluir esta postagem?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `${API_URL}/api/posts/delete-post/${postId}`,
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
    const buttonEdit = postElement.querySelector(".btn__editPost");
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

    // Adicionando evento no botão "Adicionar"
    const buttonAdd = document.getElementById("btnAddPost");
    const modalAdd = document.getElementById("modalAdd");

    buttonAdd.addEventListener("click", () => {
      modalAdd.classList.add("active");
      body.classList.add("scrolling--disabled");

      // Evento para salvar as alterações
      const formAddPost = document.getElementById("formAddPost");

      formAddPost.onsubmit = async e => {
        e.preventDefault();

        // Criar a data atual corrigindo o fuso horário
        const now = new Date();
        const dataPublicacao = new Date(
          now.getTime() - now.getTimezoneOffset() * 60000
        ).toISOString();

        const newPost = {
          titulo: formAddPost.titulo.value,
          descricao: formAddPost.descricao.value,
          conteudo: formAddPost.conteudo.value,
          data_publicacao: dataPublicacao
        };

        try {
          const response = await fetch(`${API_URL}/api/posts/create-post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
          });

          const responseData = await response.json(); // Espera uma resposta JSON com o ID do novo post
          console.log("Resposta do servidor:", responseData);

          if (response.ok) {
            alert("Postagem criada com sucesso!");

            // Adicionar o novo post na lista sem recarregar a página
            const newPostElement = document.createElement("div");
            newPostElement.classList.add("posts__item");
            newPostElement.innerHTML = `
              <div class="block__content">
                <h2 class="posts__title f--18">${newPost.titulo}</h2>
                <p class="posts__description">${newPost.descricao}</p>
                <small class="posts__date">Publicado em: <strong>${new Date(
                  newPost.data_publicacao
                ).toLocaleDateString("pt-BR")}</strong></small>
              </div>
              <div class="block__panel">
                <button class="btn__editPost f--16" data-id="${responseData.id}">
                  <ion-icon class="ion-icons f--16" name="create-outline"></ion-icon> Editar
                </button>
                <button class="btn__deletePost f--16" data-id="${responseData.id}">
                  <ion-icon class="ion-icons f--16" name="trash-outline"></ion-icon> Excluir
                </button>
              </div>
            `;

            // Reassociar os eventos de excluir e editar para o novo post
            const buttonDelete = newPostElement.querySelector(
              ".btn__deletePost"
            );
            buttonDelete.addEventListener("click", async event => {
              const postId = event.target.getAttribute("data-id");
              const confirmDelete = confirm(
                "Você tem certeza que deseja excluir esta postagem?"
              );
              if (confirmDelete) {
                try {
                  const response = await fetch(
                    `${API_URL}/api/posts/delete-post/${postId}`,
                    { method: "DELETE" }
                  );
                  if (response.ok) {
                    alert("Postagem excluída com sucesso!");
                    newPostElement.remove(); // Remover o post da lista
                  } else {
                    alert("Erro ao excluir postagem.");
                  }
                } catch (error) {
                  console.error("Erro ao excluir postagem:", error);
                  alert("Erro ao excluir postagem.");
                }
              }
            });

            const buttonEdit = newPostElement.querySelector(".btn__editPost");
            const modalEdit = document.getElementById("modalEdit");

            buttonEdit.addEventListener("click", () => {
              // Preenche os campos do modal com os dados do post
              document.getElementById("editTitulo").value = newPost.titulo;
              document.getElementById("editDescricao").value =
                newPost.descricao;
              document.getElementById("editConteudo").value = newPost.conteudo;

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
                    `${API_URL}/api/posts/update-post/${responseData.id}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(updatedPost)
                    }
                  );

                  if (response.ok) {
                    alert("Postagem atualizada com sucesso!");

                    // Atualizar a postagem na lista sem recarregar a página
                    newPostElement.querySelector(".posts__title").textContent =
                      updatedPost.titulo;
                    newPostElement.querySelector(
                      ".posts__description"
                    ).textContent =
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

            postsListAdmin.appendChild(newPostElement); // Adiciona o novo post na lista

            // Fechar o modal de adicionar e limpar o formulário
            modalAdd.classList.remove("active");
            body.classList.remove("scrolling--disabled");
            formAddPost.reset(); // Limpar o formulário
          } else {
            alert("Erro ao criar postagem.");
          }
        } catch (error) {
          console.error("Erro ao criar postagem:", error);
          alert("Erro ao criar postagem.");
        }
      };
    });

    // Fechar modal
    const buttonCloseModal = () => {
      if (modalEdit.classList.contains("active"))
        modalEdit.classList.remove("active");
      if (modalAdd.classList.contains("active"))
        modalAdd.classList.remove("active");
      body.classList.remove("scrolling--disabled");
    };

    const buttonCloseModalEdit = document.getElementById("btnCloseModalEdit");
    const buttonCloseModalAdd = document.getElementById("btnCloseModalAdd");

    buttonCloseModalEdit.addEventListener("click", buttonCloseModal);
    buttonCloseModalAdd.addEventListener("click", buttonCloseModal);

    postsListAdmin.appendChild(postElement);
  });
});
