document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('/api/v1/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, senha })
    });

    const resultado = await resposta.json();
    const mensagem = document.getElementById('mensagem');

    if (resultado.success) {
      alert('Cadastro realizado com sucesso!');
      window.location.href = '/login.html';
    } else {
      mensagem.textContent = resultado.message || 'Erro ao cadastrar.';
      mensagem.style.color = 'red';
    }
  } catch (error) {
    console.error('Erro ao enviar cadastro:', error);
    document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
  }
});
