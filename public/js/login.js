document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    // Requisição para o backend com email e senha
    const resposta = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!resposta.ok) {
      throw new Error('Email ou senha inválidos');
    }

    const dados = await resposta.json();

    // Armazena o usuário logado no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(dados.user));

    alert('Login realizado com sucesso! Bem-vindo, ' + dados.user.name);
    window.location.href = '/home.html'; // redireciona para a página principal

  } catch (error) {
    alert(error.message);
  }
});
