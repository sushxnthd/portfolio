
(() => {
  'use strict';

  const root = document.getElementById('scroll-root');
  const stage = document.getElementById('stage');
  const track = document.getElementById('track');
  const chapters = [...document.querySelectorAll('.chapter')];
  const scenes = [document.getElementById('intro'), ...chapters].filter(Boolean);
  const frameCards = [document.getElementById('intro'), ...chapters.map(chapter => chapter.querySelector('.chapter-card'))].filter(Boolean);
  const navLinks = [...document.querySelectorAll('.chrome__nav a')];
  const label = document.getElementById('scene-label');
  const count = document.getElementById('scene-count');
  const progress = document.getElementById('progress');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!root || !stage || !track) return;

  let maxX = 0;
  let raf = 0;
  let active = 0;
  let openChapter = null;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const rootTop = () => root.getBoundingClientRect().top + window.scrollY;
  const xNow = () => clamp(window.scrollY - rootTop(), 0, maxX);
  const sceneX = el => el.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || 0);

  function measureChapter(chapter) {
    const drawer = chapter.querySelector('.chapter-drawer');
    const inner = chapter.querySelector('.chapter-drawer__inner');
    if (!drawer || !inner) return;
    drawer.style.setProperty('--drawer-w', Math.ceil(inner.scrollWidth + 1) + 'px');
  }

  function measure() {
    chapters.forEach(measureChapter);
    maxX = Math.max(0, Math.ceil(track.scrollWidth - window.innerWidth));
    root.style.height = Math.ceil(window.innerHeight + maxX) + 'px';
    requestPaint();
  }

  function closeChapter(chapter) {
    if (!chapter) return;
    const button = chapter.querySelector('.chapter-card');
    const drawer = chapter.querySelector('.chapter-drawer');
    chapter.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open ' + chapter.dataset.title);
    drawer.inert = true;
    if (openChapter === chapter) openChapter = null;
  }

  function open(chapter) {
    if (!chapter) return;
    if (openChapter && openChapter !== chapter) closeChapter(openChapter);
    const button = chapter.querySelector('.chapter-card');
    const drawer = chapter.querySelector('.chapter-drawer');
    measureChapter(chapter);
    chapter.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close ' + chapter.dataset.title);
    drawer.inert = false;
    openChapter = chapter;
    requestAnimationFrame(measure);
  }

  chapters.forEach(chapter => {
    const button = chapter.querySelector('.chapter-card');
    const drawer = chapter.querySelector('.chapter-drawer');
    drawer.inert = true;
    button.setAttribute('aria-label', 'Open ' + chapter.dataset.title);
    button.addEventListener('click', () => {
      if (chapter === openChapter) closeChapter(chapter);
      else open(chapter);
      requestAnimationFrame(measure);
    });
  });

  function scrollToX(x, smooth = true) {
    window.scrollTo({
      top: rootTop() + clamp(x, 0, maxX),
      behavior: smooth && !reduceMotion.matches ? 'smooth' : 'auto'
    });
  }

  function goToScene(scene, expand = false, push = true) {
    if (!scene) return;
    if (expand && scene.classList.contains('chapter')) open(scene);
    if (push) history.pushState(null, '', '#' + scene.id);
    requestAnimationFrame(() => scrollToX(sceneX(scene)));
  }

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.getElementById(anchor.hash.slice(1));
    if (!target || !track.contains(target)) return;
    event.preventDefault();
    goToScene(target, target.classList.contains('chapter'));
  });

  function paint() {
    raf = 0;
    const x = xNow();
    track.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
    if (progress) progress.style.width = (maxX ? (x / maxX) * 100 : 100) + '%';

    const viewportCenter = window.innerWidth / 2;
    frameCards.forEach(card => {
      if (reduceMotion.matches) {
        card.style.transform = 'scale(1)';
        return;
      }
      const rect = card.getBoundingClientRect();
      const distance = Math.min(1,
        Math.abs((rect.left + rect.width / 2) - viewportCenter) / window.innerWidth);
      card.style.transform = 'scale(' + (1 - distance * 0.02).toFixed(4) + ')';
    });

    const probe = Math.min(220, window.innerWidth * .25);
    let nearest = 0;
    let best = Infinity;
    scenes.forEach((scene, i) => {
      const rect = scene.getBoundingClientRect();
      const d = rect.left <= probe && rect.right >= probe ? -1 : Math.abs(rect.left - probe);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    active = nearest;
    const scene = scenes[active];
    if (label) label.textContent = scene.id === 'intro' ? 'Introduction' : scene.dataset.title;
    if (count) count.textContent = String(active).padStart(2, '0') + ' / 05';
    navLinks.forEach(link => {
      if (link.hash === '#' + scene.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    const ticks = [...document.querySelectorAll('.position__ticks i')];
    if (ticks.length) {
      const lit = Math.round((maxX ? x / maxX : 0) * (ticks.length - 1));
      ticks.forEach((tick, i) => tick.style.opacity = i <= lit ? '1' : '.25');
    }
  }

  function requestPaint() {
    if (!raf) raf = requestAnimationFrame(paint);
  }

  window.addEventListener('scroll', requestPaint, { passive: true });
  window.addEventListener('resize', measure, { passive: true });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && openChapter) {
      closeChapter(openChapter);
      measure();
      return;
    }
    const interactive = event.target.closest('a,button,input,textarea,select,[contenteditable="true"]');
    if (interactive) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const target = scenes[Math.min(scenes.length - 1, active + 1)];
      goToScene(target, target.classList.contains('chapter'), false);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToScene(scenes[Math.max(0, active - 1)], false, false);
    }
  });

  const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
  if (resizeObserver) resizeObserver.observe(track);

  function restoreHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target || !track.contains(target)) return;
    if (target.classList.contains('chapter')) open(target);
    requestAnimationFrame(() => scrollToX(sceneX(target), false));
  }

  window.addEventListener('hashchange', restoreHash);
  window.addEventListener('popstate', restoreHash);
  window.addEventListener('load', () => {
    measure();
    restoreHash();
    requestPaint();
  }, { once: true });

  measure();
  restoreHash();
  requestPaint();
})();
