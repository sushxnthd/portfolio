(() => {
  'use strict';

  const rail = document.getElementById('rail');
  const stacks = [...document.querySelectorAll('.stack')];
  const scenes = [...document.querySelectorAll('[data-section]')];
  const navLinks = [...document.querySelectorAll('.topnav a')];
  const progress = document.getElementById('progress-fill');
  const position = document.getElementById('location-label');
  const counter = document.getElementById('location-count');
  const prev = document.getElementById('go-prev');
  const next = document.getElementById('go-next');
  if (!rail || !stacks.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let expanded = null;
  let currentIndex = 0;
  let frame = 0;
  let drag = null;

  const behavior = () => reduceMotion.matches ? 'instant' : 'smooth';

  const drawerOf = stack => stack.querySelector('.stack__drawer');
  const coverOf = stack => stack.querySelector('.stack__cover');

  const measure = () => {
    for (const stack of stacks) {
      const drawer = drawerOf(stack);
      const inner = drawer.querySelector('.stack__drawer-inner');
      // width is assigned to the collapsing outer track, not its contents
      drawer.style.setProperty('--drawer-width', Math.ceil(inner.scrollWidth + 2) + 'px');
    }
  };

  const collapse = stack => {
    if (!stack) return;
    const drawer = drawerOf(stack);
    if (drawer.contains(document.activeElement)) coverOf(stack).focus({ preventScroll: true });
    stack.classList.remove('is-open');
    coverOf(stack).setAttribute('aria-expanded', 'false');
    coverOf(stack).setAttribute('aria-label', 'Expand ' + stack.dataset.title + ' category');
    drawer.inert = true;
    if (expanded === stack) expanded = null;
  };

  const ensureCoverVisible = stack => {
    const cover = coverOf(stack).getBoundingClientRect();
    const area = rail.getBoundingClientRect();
    if (cover.left < area.left + 12 || cover.left > area.right - 140) {
      rail.scrollTo({ left: rail.scrollLeft + cover.left - area.left - 34, behavior: behavior() });
    }
  };

  const expand = (stack, reveal = true) => {
    if (!stack) return;
    if (expanded && expanded !== stack) collapse(expanded);
    measure();
    stack.classList.add('is-open');
    coverOf(stack).setAttribute('aria-expanded', 'true');
    coverOf(stack).setAttribute('aria-label', 'Collapse ' + stack.dataset.title + ' category');
    drawerOf(stack).inert = false;
    expanded = stack;
    if (reveal) ensureCoverVisible(stack);
    scheduleRefresh();
  };

  for (const stack of stacks) {
    drawerOf(stack).inert = true;
    coverOf(stack).setAttribute('aria-expanded', 'false');
    coverOf(stack).addEventListener('click', () => {
      if (expanded === stack) collapse(stack);
      else expand(stack);
      scheduleRefresh();
    });
  }

  measure();
  // No-JS visitors see all child links. Only collapse once controls are wired.
  document.documentElement.classList.add('js-ready');

  const targetLeft = section => section.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft);
  const navigate = (section, open = false, recordHistory = true) => {
    if (!section) return;
    if (open && section.classList.contains('stack')) expand(section, false);
    if (recordHistory) history.pushState(null, '', '#' + section.id);
    rail.scrollTo({ left: Math.max(0, targetLeft(section)), behavior: behavior() });
    scheduleRefresh();
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const dest = document.getElementById(link.hash.slice(1));
    if (!dest || !rail.contains(dest)) return;
    event.preventDefault();
    navigate(dest, dest.classList.contains('stack'));
  });

  // Vertical wheel deltas advance the page sideways; actual horizontal deltas
  // remain native so trackpads retain their expected inertia.
  rail.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaY) < 1 || rail.scrollWidth <= rail.clientWidth) return;
    const innerScroll = event.target.closest('.leaf');
    if (innerScroll && innerScroll.scrollHeight > innerScroll.clientHeight + 3) {
      const canScrollDown = innerScroll.scrollTop + innerScroll.clientHeight < innerScroll.scrollHeight - 2;
      const canScrollUp = innerScroll.scrollTop > 2;
      if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) return;
    }
    event.preventDefault();
    const factor = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rail.clientWidth : 1;
    rail.scrollLeft += event.deltaY * factor;
  }, { passive: false });

  // Native touch panning is preserved; pointer drag is for mouse and pen.
  rail.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.button !== 0 || event.target.closest('a,button')) return;
    drag = { id: event.pointerId, x: event.clientX, origin: rail.scrollLeft, moved: false };
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      rail.classList.add('is-dragging');
      rail.scrollLeft = drag.origin - distance;
    }
  });
  const stopDrag = () => { drag = null; rail.classList.remove('is-dragging'); };
  rail.addEventListener('pointerup', stopDrag);
  rail.addEventListener('pointercancel', stopDrag);
  rail.addEventListener('lostpointercapture', stopDrag);

  const activeScene = () => {
    const area = rail.getBoundingClientRect();
    const checkpoint = area.left + Math.min(200, area.width * .24);
    const encompassing = scenes.find(scene => {
      const r = scene.getBoundingClientRect();
      return r.left <= checkpoint && r.right >= checkpoint;
    });
    if (encompassing) return Math.max(0, scenes.indexOf(encompassing));
    let best = 0, distance = Infinity;
    scenes.forEach((scene, i) => {
      const x = Math.abs(scene.getBoundingClientRect().left - checkpoint);
      if (x < distance) { best = i; distance = x; }
    });
    return best;
  };

  const refresh = () => {
    frame = 0;
    const max = rail.scrollWidth - rail.clientWidth;
    progress.style.width = (max > 0 ? Math.min(100, Math.max(0, rail.scrollLeft / max * 100)) : 100) + '%';
    currentIndex = activeScene();
    const scene = scenes[currentIndex];
    position.textContent = scene.id === 'intro' ? 'Introduction' : scene.dataset.title;
    counter.textContent = String(currentIndex).padStart(2, '0') + ' / 05';
    navLinks.forEach(link => {
      if (link.hash === '#' + scene.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    prev.disabled = currentIndex === 0 && rail.scrollLeft <= 6;
    next.disabled = currentIndex === scenes.length - 1 &&
      rail.scrollLeft >= max - 8;
  };
  function scheduleRefresh() {
    if (!frame) frame = window.requestAnimationFrame(refresh);
  }

  rail.addEventListener('scroll', scheduleRefresh, { passive: true });
  prev.addEventListener('click', () => navigate(scenes[Math.max(0, currentIndex - 1)], false, false));
  next.addEventListener('click', () => navigate(scenes[Math.min(scenes.length - 1, currentIndex + 1)], true, false));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && expanded) {
      collapse(expanded);
      scheduleRefresh();
      return;
    }
    if (document.activeElement !== rail) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(scenes[Math.min(scenes.length - 1, currentIndex + 1)], true, false);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigate(scenes[Math.max(0, currentIndex - 1)], false, false);
    }
  });

  // When tabbing to an open child card, keep its link visible.
  rail.addEventListener('focusin', event => {
    const leaf = event.target.closest('.leaf');
    if (!leaf) return;
    const area = rail.getBoundingClientRect();
    const r = leaf.getBoundingClientRect();
    if (r.left < area.left + 16 || r.right > area.right - 16) {
      rail.scrollBy({ left: r.left - area.left - 22, behavior: behavior() });
    }
  });

  const restoreHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const section = document.getElementById(id);
    if (!section || !rail.contains(section)) return;
    if (section.classList.contains('stack')) expand(section, false);
    rail.scrollLeft = Math.max(0, targetLeft(section));
    scheduleRefresh();
  };
  window.addEventListener('popstate', restoreHash);
  window.addEventListener('hashchange', restoreHash);
  window.addEventListener('resize', () => { measure(); scheduleRefresh(); }, { passive: true });
  window.addEventListener('load', () => { measure(); restoreHash(); scheduleRefresh(); }, { once: true });
  restoreHash();
  scheduleRefresh();
})();