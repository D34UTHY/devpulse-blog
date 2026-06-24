document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
    reveals.forEach(el => revealObs.observe(el));
  }

  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }

  const tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length) {
    const headings = Array.from(document.querySelectorAll('.post-body h2, .post-body h3'));
    const tocObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.toc-list a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -75% 0px' });
    headings.forEach(h => { if (h.id) tocObs.observe(h); });
  }

  document.querySelectorAll('.nl-form, .newsletter-widget form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"], .btn-nl, .btn-full');
      const input = form.querySelector('input[type="email"]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = '✓ Inscrito!';
        btn.style.background = 'var(--green)';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          if (input) input.value = '';
        }, 3000);
      }
    });
  });
});