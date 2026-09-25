const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('in'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min((index % 3) * 45, 90)}ms`;
    observer.observe(item);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const selector = link.getAttribute('href');
    if (!selector || selector === '#') return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
    history.replaceState(null, '', selector);
  });
});

const copyButton = document.getElementById('copyHandle');
copyButton?.addEventListener('click', async () => {
  const value = copyButton.dataset.copy || '@sushxnthd';
  const label = copyButton.querySelector('b');
  const original = label?.textContent || 'copy';

  try {
    await navigator.clipboard.writeText(value);
    if (label) label.textContent = 'copied';
  } catch {
    if (label) label.textContent = value;
  }

  window.setTimeout(() => {
    if (label) label.textContent = original;
  }, 1400);
});
