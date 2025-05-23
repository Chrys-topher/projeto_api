// espera a página carregar
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      document.body.classList.add('fade-in');
    });
  });

  // transição ao sair da página
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      const isSamePageAnchor = href.startsWith('#') || href.startsWith('javascript:');

      if (!isSamePageAnchor) {
        e.preventDefault();
        document.body.classList.remove('fade-in');
        document.body.style.opacity = 0;
        document.body.style.transform = 'translateY(20px)';
        setTimeout(() => {
          window.location.href = href;
        }, 500); // tempo menor que a transição para resposta rápida
      }
    });
  });