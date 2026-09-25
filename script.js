const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.transitionDelay = `${Math.min((index % 4) * 45, 135)}ms`;
    revealObserver.observe(el);
  });

  const glow = document.getElementById('cursorGlow');
  let targetX = innerWidth * 0.65;
  let targetY = innerHeight * 0.35;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  const moveGlow = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(moveGlow);
  };
  requestAnimationFrame(moveGlow);
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

const copyButton = document.getElementById('copyHandle');
copyButton?.addEventListener('click', async () => {
  const value = copyButton.dataset.copy || '@sushxnthd';
  const initial = copyButton.textContent;
  try {
    await navigator.clipboard.writeText(value);
    copyButton.textContent = 'Copied @sushxnthd';
  } catch {
    copyButton.textContent = value;
  }
  window.setTimeout(() => {
    copyButton.textContent = initial;
  }, 1600);
});

const navLinks = [...document.querySelectorAll('.nav-links a')];
const targetSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }, { threshold: [0.18, 0.35, 0.55], rootMargin: '-18% 0px -55% 0px' });

  targetSections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', id);
  });
});
