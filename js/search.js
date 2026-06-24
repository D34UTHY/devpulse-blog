const postsIndex = [
  { slug: 'post-rust-backend', title: 'Por que o Rust está conquistando o back-end em 2025', category: 'back-end', tags: ['Rust', 'Back-end', 'Performance'] },
  { slug: 'post-typescript-55', title: 'TypeScript 5.5: as features que você precisa conhecer agora', category: 'front-end', tags: ['TypeScript', 'Node.js'] },
  { slug: 'post-kubernetes-devs', title: 'Kubernetes para devs: do zero ao primeiro deploy em produção', category: 'devops', tags: ['DevOps', 'Kubernetes'] },
  { slug: 'post-rag-langchain', title: 'Construindo um RAG do zero com LangChain e PostgreSQL', category: 'ia', tags: ['IA', 'Python', 'LLMs'] },
  { slug: 'post-jwt-autenticacao', title: 'JWT não é suficiente: como implementar autenticação de verdade', category: 'seguranca', tags: ['Segurança', 'Autenticação'] },
  { slug: 'post-docker-podman', title: 'Docker vs Podman em 2025: qual usar no seu workflow?', category: 'devops', tags: ['DevOps', 'Containers'] }
];

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.nav-search-input');
  const searchDropdown = document.querySelector('.search-dropdown');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (!query) {
        searchDropdown.innerHTML = '';
        searchDropdown.style.display = 'none';
        return;
      }
      
      const results = postsIndex.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
      
      if (results.length === 0) {
        searchDropdown.innerHTML = '<div class="search-result-empty">Nenhum resultado</div>';
      } else {
        searchDropdown.innerHTML = results.map(post => 
          `<a href="${post.slug}.html" class="search-result">${post.title}</a>`
        ).join('');
      }
      searchDropdown.style.display = 'block';
    });
  }

  // Filtro de categoria
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      const category = pill.getAttribute('data-category');
      document.querySelectorAll('[data-category]').forEach(card => {
        card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? '' : 'none';
      });
    });
  });
});