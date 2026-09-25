const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 4) * 55, 165)}ms`;
  io.observe(el);
});

const spotlight = document.getElementById('spotlight');
window.addEventListener('pointermove', (e) => {
  spotlight.style.left = `${e.clientX}px`;
  spotlight.style.top = `${e.clientY}px`;
}, { passive: true });

document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(1100px) rotateX(${-y * 1.6}deg) rotateY(${x * 1.8}deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

const copy = document.getElementById('copyName');
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('Sushanth Dasari');
    const original = copy.textContent;
    copy.textContent = 'Copied';
    setTimeout(() => copy.textContent = original, 1400);
  } catch {
    copy.textContent = 'Sushanth Dasari';
  }
});
