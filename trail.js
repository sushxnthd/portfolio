(() => {
  "use strict";
  // Pointer-responsive image impressions, using locally stored project assets.
  const sources = ["assets/trail/somno.png","assets/trail/hush.webp","assets/trail/kernellum-die.svg","assets/trail/greengroove.webp","assets/trail/somno-pvt.png","assets/trail/hush-dawn.webp","assets/trail/kernellum-routing.svg","assets/trail/greengroove-social.png","assets/trail/kernellum-measurement.svg","assets/trail/kernellum-timing.svg","assets/trail/hush-laptop.svg","assets/trail/greengroove-architecture.svg"];
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
  let primed = false, last = null, lastTime = 0, contact = null;
  let bag = [], previousSource = null;
  let distance = 0, anchor = null;
  const cadence = {desktop:{spacing:38,interval:34,cap:10},mobile:{spacing:28,interval:42,cap:5}};
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
    distance = 0;
    anchor = null;
  }
  function sync() {
    toggle.hidden = !(media.matches || touch.matches) || reduce.matches;
    document.documentElement.classList.toggle("touch-trail-enabled", enabled() && touch.matches);
    toggle.setAttribute("aria-pressed", String(preferred));
    toggle.querySelector(".trail-state").textContent = preferred ? "on" : "off";
    if (!enabled()) clear();
    else prime();
  }
  function spawn(x, y, dx, dy, mobile = false, delay = 0) {
    const available = sources.filter(src => ready.has(src));
    if (!available.length) return;
    // Shuffle without repetition; preserve variety even during fast gestures.
    bag = bag.filter(src => ready.has(src));
    if (!bag.length) {
      bag = available.slice();
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
      if(bag.length>1 && bag[bag.length-1]===previousSource)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]];
    }
    const src = bag.pop();
    previousSource = src;
    const original = ready.get(src);
    const image = original.cloneNode();
    image.className = "image-trail__item";
    image.alt = "";
    image.draggable = false;
    const landscape = original.naturalWidth >= original.naturalHeight;
    const speed = Math.hypot(dx,dy);
    const emphasis = Math.min(1.16, 1 + speed / 600);
    const width = emphasis * (mobile ? (landscape ? Math.min(124, innerWidth * .32) : Math.min(88, innerWidth * .23)) : landscape ? Math.min(182, Math.max(126, innerWidth * .125)) : Math.min(118, Math.max(92, innerWidth * .085)));
    const height = Math.min(180, width * original.naturalHeight / original.naturalWidth);
    image.style.setProperty("--trail-width", width + "px");
    // Position around the cursor, retaining a small safe margin at the viewport edge.
    image.style.left = Math.max(5, Math.min(innerWidth - width - 5, x - width * .5)) + "px";
    image.style.top = Math.max(5, Math.min(innerHeight - height - 5, y - height * .5)) + "px";
    while (items.size >= (mobile ? cadence.mobile.cap : cadence.desktop.cap)) discard(items.keys().next().value);
    layer.append(image);
    // Directional reveal and momentum. No rotation, filters or layer-wide fade.
    const magnitude = Math.max(1, speed);
    const travel = Math.min(mobile ? 24 : 38, 12 + speed * .18);
    const driftX = dx / magnitude * travel;
    const driftY = dy / magnitude * travel + 9;
    const reveal = Math.abs(dx) >= Math.abs(dy)
      ? (dx >= 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)")
      : (dy >= 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)");
    const animation = image.animate([
      { opacity: .88, clipPath: reveal, transform: "translate(" + (-driftX*.28) + "px," + (-driftY*.28) + "px) scale(.86)", offset: 0 },
      { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translate(0,0) scale(1)", offset: .13 },
      { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translate(" + driftX*.32 + "px," + driftY*.32 + "px) scale(1)", offset: .55 },
      { opacity: 0, clipPath: "inset(0 0 0 0)", transform: "translate(" + driftX + "px," + driftY + "px) scale(.90)", offset: 1 }
    ], {duration: mobile ? 900 : 1080, easing:"cubic-bezier(.22,.68,.28,1)", fill:"both",delay});
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
      if (Math.hypot(x-contact.x,y-contact.y) < cadence.mobile.spacing || performance.now()-lastTime < cadence.mobile.interval) return;
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
    if (!last) { last = anchor = {x,y}; return; }
    distance += Math.hypot(x-last.x,y-last.y);
    last = {x,y};
    if (distance < cadence.desktop.spacing || now-lastTime < cadence.desktop.interval) return;
    const dx = x-anchor.x, dy = y-anchor.y;
    const span = Math.hypot(dx,dy);
    // Fast jumps produce a bounded spatial sequence rather than a single endpoint stamp.
    const burst = Math.min(3,Math.max(1,Math.floor(span/76)));
    for(let i=1;i<=burst;i++){
      const fraction=i/burst;
      spawn(anchor.x+dx*fraction,anchor.y+dy*fraction,dx/burst,dy/burst,false,(i-1)*12);
    }
    anchor = {x,y}; distance = 0; lastTime = now;
  }, {passive:true});
  document.documentElement.addEventListener("pointerleave", () => { last = anchor = null; distance = 0; });
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
