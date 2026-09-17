document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-button');
  const revealItems = document.querySelectorAll('.reveal');
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  hashLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
      }

      if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav?.classList.toggle('mobile-open');
      menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  let idleTimer = null;
  const resetIdle = () => {
    document.body.classList.remove('idle');
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => document.body.classList.add('idle'), 20000);
  };

  ['mousemove', 'scroll', 'touchstart', 'keydown'].forEach((eventName) => {
    window.addEventListener(eventName, resetIdle, { passive: true });
  });

  resetIdle();
});
