document.addEventListener('DOMContentLoaded', () => {
  const usuarioStr = localStorage.getItem('usuarioLogado');
  if (!usuarioStr) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
    return;
  } else {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    document.getElementById('username').textContent = usuario.name || usuario.email || 'Usuário';
  }

  const btnBuscar = document.getElementById('btnBuscar');
  const inputBusca = document.getElementById('busca');
  const resultadosBox = document.querySelector('.results-box');

  if (btnBuscar && inputBusca && resultadosBox) {
    btnBuscar.addEventListener('click', async (e) => {
      e.preventDefault();
      const query = inputBusca.value.trim();
      resultadosBox.innerHTML = '';

      if (!query) {
        resultadosBox.innerHTML = '<p>Digite um termo de busca.</p>';
        return;
      }

      const apiKey = 'v1hHV96Bw50g2zlpQOTAIF7eRjJ8mcob';
      const url = 'http://localhost:8080/api/v1/artigos/buscar';

      const data = {
        q: query,
        page: 1,
        pageSize: 10
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const json = await response.json();
        const resultados = json.results || [];

        if (resultados.length === 0) {
          resultadosBox.innerHTML = '<p>Nenhum artigo encontrado.</p>';
          return;
        }

        resultados.forEach((artigo, index) => {
          const div = document.createElement('div');
          div.classList.add('article');

          // array pra armazenar o nome dos autores
          const autores = Array.isArray(artigo.authors)
            ? artigo.authors.map(a => a.nome || a.name || "Desconhecido").join(", ")
            : "Não informados";


            // retorno
          div.innerHTML = `
  <strong>${index + 1}. ${artigo.title || "Sem título"}</strong><br>
         <em>Autores:</em> ${autores}<br>
  <em>Ano:</em> ${artigo.yearPublished || "Desconhecido"}<br>
  <a href="${artigo.downloadUrl || '#'}" target="_blank">
    ${artigo.downloadUrl ? "🔗 Acessar PDF" : "🔒 PDF não disponível"}
  </a>
`;
          resultadosBox.appendChild(div);
        });

      } catch (erro) {
        resultadosBox.innerHTML = `<p style="color:red;">Erro ao buscar artigos: ${erro.message}</p>`;
      }
    });
  }

  // Evento de logout — usando o <a> da div.logout
  const logoutLink = document.querySelector('.logout a');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('usuarioLogado');
      window.location.href = 'login.html';
    });
  }
});
