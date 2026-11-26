(() => {
  "use strict";
  // Pointer-responsive image impressions, using locally stored project assets.
  const sources = ["assets/trail/somno.png","assets/trail/hush.webp","assets/trail/kernellum-die.svg","assets/trail/greengroove.webp","assets/trail/somno-pvt.png","assets/trail/hush-dawn.webp","assets/trail/kernellum-routing.svg","assets/trail/greengroove-social.png"];
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  const touch = window.matchMedia("(any-pointer: coarse)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const key = "portfolio-image-trail";
  const toggle = document.querySelector(".trail-toggle");
  if (!toggle || !("animate" in HTMLElement.prototype)) return;
  let preferred = true;
  try { preferred = localStorage.getItem(key) !== "off"; } catch {}
  const layer = document.createElement("div");
  layer.className = "image-trail";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);
  const ready = new Map();
  const items = new Map();
  let primed = false, index = 0, last = null, lastTime = 0, contact = null;
  const enabled = () => preferred && (media.matches || touch.matches) && !reduce.matches && !document.hidden;
  function prime() {
    if (primed) return;
    primed = true;
    sources.forEach(src => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => { if (image.naturalWidth) ready.set(src, image); };
      image.src = src;
    });
  }
  function discard(node) {
    const animation = items.get(node);
    if (!animation) return;
    items.delete(node);
    animation.onfinish = null;
    animation.cancel();
    node.remove();
  }
  function clear() {
    for (const node of items.keys()) discard(node);
    last = null;
    lastTime = 0;
    contact = null;
  }
  function sync() {
    toggle.hidden = !(media.matches || touch.matches) || reduce.matches;
    document.documentElement.classList.toggle("touch-trail-enabled", enabled() && touch.matches);
    toggle.setAttribute("aria-pressed", String(preferred));
    toggle.querySelector(".trail-state").textContent = preferred ? "on" : "off";
    if (!enabled()) clear();
    else prime();
  }
  function spawn(x, y, dx, dy, mobile = false) {
    const available = sources.filter(src => ready.has(src));
    if (!available.length) return;
    const src = available[index++ % available.length];
    const original = ready.get(src);
    const image = original.cloneNode();
    image.className = "image-trail__item";
    image.alt = "";
    image.draggable = false;
    const landscape = original.naturalWidth >= original.naturalHeight;
    const width = mobile ? (landscape ? Math.min(124, innerWidth * .32) : Math.min(88, innerWidth * .23)) : landscape ? Math.min(182, Math.max(126, innerWidth * .125)) : Math.min(118, Math.max(92, innerWidth * .085));
    const height = Math.min(180, width * original.naturalHeight / original.naturalWidth);
    image.style.setProperty("--trail-width", width + "px");
    // Position around the cursor, retaining a small safe margin at the viewport edge.
    image.style.left = Math.max(5, Math.min(innerWidth - width - 5, x - width * .5)) + "px";
    image.style.top = Math.max(5, Math.min(innerHeight - height - 5, y - height * .5)) + "px";
    while (items.size >= (mobile ? 3 : 6)) discard(items.keys().next().value);
    layer.append(image);
    const driftX = Math.max(-14, Math.min(14, dx * .16));
    const driftY = Math.max(-10, Math.min(10, dy * .12)) + 11;
    const animation = image.animate([
      { opacity: 0, transform: "translate(0, 0) scale(.82)", offset: 0 },
      { opacity: .96, transform: "translate(0, 0) scale(1)", offset: .15 },
      { opacity: .96, transform: "translate(" + driftX*.3 + "px, " + driftY*.3 + "px) scale(1)", offset: .43 },
      { opacity: 0, transform: "translate(" + driftX + "px, " + driftY + "px) scale(.88)", offset: 1 }
    ], { duration: 1050, easing: "cubic-bezier(.2,.65,.25,1)", fill: "both" });
    items.set(image, animation);
    animation.onfinish = () => discard(image);
  }
  const interactive = target => target instanceof Element && target.closest("a,button,input,textarea,select,summary,[contenteditable],.footer");
  const selecting = () => window.getSelection() && !window.getSelection().isCollapsed;
  window.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") {
      if (!contact || event.pointerId !== contact.id) return;
      if (!enabled() || interactive(document.elementFromPoint(event.clientX,event.clientY)) || selecting()) { clear(); return; }
      const x = event.clientX, y = event.clientY;
      const totalX = x-contact.startX, totalY = y-contact.startY;
      if (Math.abs(totalY) > 12 && Math.abs(totalY) > Math.abs(totalX)) { clear(); return; }
      if (Math.hypot(totalX,totalY) > 12) contact.moved = true;
      if (Math.hypot(x-contact.x,y-contact.y) < 44 || performance.now()-lastTime < 80) return;
      spawn(x,y,x-contact.x,y-contact.y,true);
      contact.x=x; contact.y=y; lastTime=performance.now();
      return;
    }
    if (!enabled() || event.pointerType !== "mouse" || event.buttons ||
        event.target.closest("a,button,input,textarea,select,summary,[contenteditable],.footer") ||
        (window.getSelection() && !window.getSelection().isCollapsed)) {
      clear();
      return;
    }
    const now = performance.now(), x = event.clientX, y = event.clientY;
    if (!last) { last = {x,y}; return; }
    const dx = x-last.x, dy = y-last.y;
    if (Math.hypot(dx,dy) < 66 || now-lastTime < 62) return;
    last = {x,y}; lastTime = now;
    spawn(x,y,dx,dy);
  }, {passive:true});
  document.documentElement.addEventListener("pointerleave", () => { last = null; });
  window.addEventListener("pointerdown", event => {
    if (event.pointerType !== "touch") { clear(); return; }
    if (!event.isPrimary || !enabled() || interactive(event.target) || selecting()) { clear(); return; }
    clear();
    contact = {id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,time:performance.now()};
  }, {passive:true});
  window.addEventListener("pointerup", event => {
    if (!contact || event.pointerId !== contact.id) return;
    if (!contact.moved && performance.now()-contact.time < 350 && !interactive(document.elementFromPoint(event.clientX,event.clientY)) && !selecting()) spawn(event.clientX,event.clientY,0,0,true);
    contact = null;
  }, {passive:true});
  window.addEventListener("pointercancel", clear, {passive:true});
  window.addEventListener("blur", clear);
  document.addEventListener("focusin", clear);
  document.addEventListener("selectionchange", () => { if (getSelection() && !getSelection().isCollapsed) clear(); });
  window.addEventListener("resize", clear, {passive:true});
  window.addEventListener("scroll", clear, {passive:true});
  document.addEventListener("visibilitychange", sync);
  document.addEventListener("keydown", e => { if (e.key === "Escape" || e.key === "Tab") clear(); });
  toggle.addEventListener("click", () => {
    preferred = !preferred;
    try { localStorage.setItem(key, preferred ? "on" : "off"); } catch {}
    sync();
  });
  media.addEventListener("change",sync);
  touch.addEventListener("change",sync);
  reduce.addEventListener("change",sync);
  sync();
})();
