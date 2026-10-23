/* Field Notes: only enhance navigation. The archive stays usable without JS. */
(() => {
  const links = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  if (!('IntersectionObserver' in window) || !links.length) return;
  const targets = links
    .map(link => ({link, section: document.querySelector(link.getAttribute('href'))}))
    .filter(item => item.section);
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      targets.forEach(({link, section}) => {
        if (section === entry.target) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin: '-10% 0px -66% 0px'});
  targets.forEach(({section}) => observer.observe(section));
})();