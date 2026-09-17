document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mainNav = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-button');
  const revealItems = document.querySelectorAll('.reveal');
  const cursor = document.querySelector('.cursor');
  const interactiveEls = document.querySelectorAll('a, button, .motion-card, .story-card, .stack-box');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = mainNav?.classList.toggle('mobile-open');
      menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (mainNav && mainNav.classList.contains('mobile-open')) {
        mainNav.classList.remove('mobile-open');
      }
      if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

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

  if (cursor) {
    window.addEventListener('pointermove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      hero.style.setProperty('--lift-x', `${x}px`);
      hero.style.setProperty('--lift-y', `${y}px`);

      const orbA = document.querySelector('.orb-a');
      const orbB = document.querySelector('.orb-b');
      const artifact = document.querySelector('.artifact-card');

      if (orbA) orbA.style.transform = `translate(${x * 1.2}px, ${y * 1.2}px)`;
      if (orbB) orbB.style.transform = `translate(${x * 1.8}px, ${y * 1.8}px)`;
      if (artifact) artifact.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    });
  }

  let idleTimer = null;
  const setIdleState = () => {
    document.body.classList.remove('idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => document.body.classList.add('idle'), 20000);
  };

  ['mousemove', 'touchstart', 'scroll', 'keydown'].forEach((eventName) => {
    window.addEventListener(eventName, setIdleState, { passive: true });
  });

  setIdleState();
});
