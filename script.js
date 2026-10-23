(() => {
  'use strict';

  const main = document.getElementById('portfolio');
  const rail = document.getElementById('rail');
  if (!main || !rail) return;

  // Use actual vertical document scrolling as the input, not wheel interception.
  const track = document.createElement('div');
  track.className = 'rail-track';
  while (rail.firstChild) track.appendChild(rail.firstChild);
  rail.appendChild(track);

  const stacks = [...track.querySelectorAll('.stack')];
  const scenes = [...track.querySelectorAll('[data-section]')];
  const links = [...document.querySelectorAll('.topnav a')];
  const progress = document.getElementById('progress-fill');
  const label = document.getElementById('location-label');
  const count = document.getElementById('location-count');
  const previous = document.getElementById('go-prev');
  const next = document.getElementById('go-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let expanded = null, range = 0, frame = 0, active = 0, pointer = null;

  const behavior = () => reducedMotion.matches ? 'instant' : 'smooth';
  const cover = stack => stack.querySelector('.stack__cover');
  const drawer = stack => stack.querySelector('.stack__drawer');
  const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
  const scrollStart = () => main.getBoundingClientRect().top + window.scrollY;
  const logicalX = element =>
    element.getBoundingClientRect().left - track.getBoundingClientRect().left;
  const currentX = () => clamp(window.scrollY - scrollStart(), 0, range);

  const measureDrawers = () => {
    for (const stack of stacks) {
      const inner = stack.querySelector('.stack__drawer-inner');
      drawer(stack).style.setProperty('--drawer-width',
        Math.ceil(inner.scrollWidth + 2) + 'px');
    }
  };
  const layout = () => {
    const nextRange = Math.max(0, Math.ceil(track.scrollWidth - rail.clientWidth));
    if (Math.abs(range - nextRange) > 0.5) {
      range = nextRange;
      // One native vertical pixel == one horizontal pixel.
      main.style.height = Math.ceil(window.innerHeight + range) + 'px';
    }
    schedule();
  };

  const close = stack => {
    if (!stack) return;
    const pane = drawer(stack);
    if (pane.contains(document.activeElement)) {
      cover(stack).focus({ preventScroll: true });
    }
    stack.classList.remove('is-open');
    cover(stack).setAttribute('aria-expanded', 'false');
    cover(stack).setAttribute('aria-label',
      'Expand ' + stack.dataset.title + ' category');
    pane.inert = true;
    if (expanded === stack) expanded = null;
  };
  const open = stack => {
    if (!stack) return;
    if (expanded && expanded !== stack) close(expanded);
    measureDrawers();
    stack.classList.add('is-open');
    cover(stack).setAttribute('aria-expanded', 'true');
    cover(stack).setAttribute('aria-label',
      'Collapse ' + stack.dataset.title + ' category');
    drawer(stack).inert = false;
    expanded = stack;
    layout();
  };

  for (const stack of stacks) {
    drawer(stack).inert = true;
    cover(stack).setAttribute('aria-expanded', 'false');
    cover(stack).addEventListener('click', () => {
      expanded === stack ? close(stack) : open(stack);
      layout();
    });
  }

  // With JavaScript off, the original overflow track stays horizontally scrollable.
  document.documentElement.classList.add('js-ready');
  measureDrawers();
  layout();

  const toX = (x, smooth = true) => window.scrollTo({
    top: scrollStart() + clamp(x, 0, range),
    behavior: smooth ? behavior() : 'instant'
  });
  const toScene = (scene, expand = false, push = true) => {
    if (!scene) return;
    if (expand && scene.classList.contains('stack')) open(scene);
    if (push) history.pushState(null, '', '#' + scene.id);
    const leftPadding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    toX(logicalX(scene) - leftPadding);
  };

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const scene = document.getElementById(anchor.hash.slice(1));
    if (!scene || !track.contains(scene)) return;
    event.preventDefault();
    toScene(scene, scene.classList.contains('stack'));
  });

  const paint = () => {
    frame = 0;
    const x = currentX();
    track.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
    if (progress) progress.style.width =
      (range ? x / range * 100 : 100) + '%';

    const checkpoint = rail.getBoundingClientRect().left +
      Math.min(190, rail.clientWidth * .24);
    let nearest = 0, distance = Infinity;
    scenes.forEach((scene, i) => {
      const rect = scene.getBoundingClientRect();
      if (rect.left <= checkpoint && rect.right >= checkpoint) {
        nearest = i; distance = -1;
      } else if (distance !== -1) {
        const d = Math.abs(rect.left - checkpoint);
        if (d < distance) { nearest = i; distance = d; }
      }
    });
    active = nearest;
    const section = scenes[active];
    if (!section) return;
    if (label) label.textContent = section.id === 'intro'
      ? 'Introduction' : section.dataset.title;
    if (count) count.textContent =
      String(active).padStart(2, '0') + ' / 05';
    links.forEach(link => {
      if (link.hash === '#' + section.id)
        link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (previous) previous.disabled = active === 0 && x <= 6;
    if (next) next.disabled =
      active === scenes.length - 1 && x >= range - 6;
  };
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  if (previous) previous.addEventListener('click', () =>
    toScene(scenes[Math.max(0, active - 1)], false, false));
  if (next) next.addEventListener('click', () =>
    toScene(scenes[Math.min(scenes.length - 1, active + 1)], true, false));

  // Optional mouse drag, mapped to the same native vertical scroll coordinate.
  rail.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.pointerType === 'touch' ||
        event.target.closest('a,button')) return;
    pointer = { id: event.pointerId, startX: event.clientX,
      startY: window.scrollY };
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    if (Math.abs(dx) > 3) {
      rail.classList.add('is-dragging');
      window.scrollTo({ top: pointer.startY - dx, behavior: 'instant' });
    }
  });
  const endDrag = () => {
    pointer = null; rail.classList.remove('is-dragging');
  };
  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);
  rail.addEventListener('lostpointercapture', endDrag);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && expanded) {
      close(expanded); layout(); return;
    }
    if (document.activeElement !== rail) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      toScene(scenes[clamp(active + offset, 0, scenes.length - 1)],
        offset > 0, false);
    }
  });

  rail.addEventListener('focusin', event => {
    const leaf = event.target.closest('.leaf');
    if (!leaf) return;
    const rect = leaf.getBoundingClientRect();
    const view = rail.getBoundingClientRect();
    if (rect.left < view.left + 12 || rect.right > view.right - 12) {
      toX(currentX() + rect.left - view.left - 22);
    }
  });

  const restoreHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const scene = document.getElementById(id);
    if (!scene || !track.contains(scene)) return;
    if (scene.classList.contains('stack')) open(scene);
    requestAnimationFrame(() => toScene(scene, false, false));
  };

  const observer = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(layout) : null;
  if (observer) {
    observer.observe(track);
    observer.observe(rail);
  }
  window.addEventListener('resize', () => {
    measureDrawers(); layout();
  }, { passive: true });
  window.addEventListener('hashchange', restoreHash);
  window.addEventListener('popstate', restoreHash);
  window.addEventListener('load', () => {
    measureDrawers(); layout(); restoreHash();
  }, { once: true });

  restoreHash();
  schedule();
})();