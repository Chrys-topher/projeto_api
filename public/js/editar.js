document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  if (!token || !userId) {
    alert("Você precisa estar logado.");
    window.location.href = "login.html";
    return;
  }

  // buscar dados do usuario atual
  fetch(`/api/v1/users/get/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    nomeInput.value = data.name;
    emailInput.value = data.email;
  })
  .catch(err => {
    console.error("Erro ao carregar dados:", err);
  });

  // editar usuário (PUT)
  document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`/api/v1/users/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Perfil atualizado!");
    })
    .catch(err => {
      console.error("Erro ao atualizar perfil:", err);
    });
  });

  // deletar conta (DELETE)
  document.getElementById("deleteAccount").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {
      fetch(`/api/v1/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Conta deletada.");
        localStorage.clear();
        window.location.href = "index.html";
      })
      .catch(err => {
        console.error("Erro ao deletar conta:", err);
      });
    }
  });
});
