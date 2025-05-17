// Verifica se o usuário está logado
if (!localStorage.getItem('usuarioLogado')) {
  alert('Você precisa estar logado para acessar esta página.');
  window.location.href = 'login.html';
} else {
  // Preenche o nome do usuário na página
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  document.getElementById('username').textContent = usuario.name || usuario.email || 'Usuário';
}

async function buscarArtigos() {
  const query = document.getElementById('query').value.trim();
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';

  if (!query) {
    resultadosDiv.innerHTML = '<p>Digite um termo de busca.</p>';
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
      resultadosDiv.innerHTML = '<p>Nenhum artigo encontrado.</p>';
      return;
    }

    resultados.forEach((artigo, index) => {
      const div = document.createElement('div');
      div.classList.add('article');

      div.innerHTML = `
        <strong>${index + 1}. ${artigo.title || "Sem título"}</strong><br>
        <em>Autores:</em> ${artigo.authors?.join(", ") || "Não informados"}<br>
        <em>Ano:</em> ${artigo.yearPublished || "Desconhecido"}<br>
        <a href="${artigo.downloadUrl || '#'}" target="_blank">
          ${artigo.downloadUrl ? "🔗 Acessar PDF" : "🔒 PDF não disponível"}
        </a>
      `;

      resultadosDiv.appendChild(div);
    });

  } catch (erro) {
    resultadosDiv.innerHTML = `<p style="color:red;">Erro ao buscar artigos: ${erro.message}</p>`;
  }
}


// Adiciona o evento de clique no botão para chamar buscarArtigos
document.getElementById('btnBuscar').addEventListener('click', buscarArtigos);

// Evento de logout
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
});
