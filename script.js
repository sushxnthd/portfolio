(() => {
  'use strict';
  const nav = [...document.querySelectorAll('.masthead nav a[href^="#"]')];
  const sections = nav.map(a => document.getElementById(a.hash.slice(1))).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;
  let active = null;
  const update = () => {
    const line = Math.min(160, innerHeight * .26);
    let selected = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) selected = section.id;
    }
    if (selected === active) return;
    active = selected;
    for (const a of nav) {
      if (a.hash === '#' + active) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    }
  };
  const observer = new IntersectionObserver(update,{rootMargin:'-15% 0px -70% 0px',threshold:0});
  sections.forEach(s => observer.observe(s));
  window.addEventListener('hashchange',update);
  window.addEventListener('resize',update,{passive:true});
  update();
})();