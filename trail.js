(() => {
  "use strict";
  // Pointer-responsive image impressions, using locally stored project assets.
  const sources = ["assets/trail/approved/kernellum-exploded.webp","assets/trail/approved/hush-botanical.webp","assets/trail/approved/hush-archive.webp","assets/trail/approved/greengroove-band.webp","assets/trail/approved/greengroove-identity.webp","assets/trail/approved/kernellum-board.webp","assets/trail/approved/copycat-pixel.webp","assets/trail/approved/somno-interface.webp","assets/trail/approved/kernellum-optical.webp","assets/trail/approved/kernellum-macro.webp"];
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  const touch = window.matchMedia("(any-pointer: coarse)");
  const touchCapable = () => touch.matches || navigator.maxTouchPoints > 0 || "ontouchstart" in window;
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
  let lastTouch = -Infinity;
  let bag = [], previousSource = null;
  let distance = 0, anchor = null;
  const cadence = {desktop:{spacing:38,interval:34,cap:10},mobile:{spacing:24,interval:34,cap:6}};
  const enabled = () => preferred && (media.matches || touchCapable()) && !reduce.matches && !document.hidden;
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
    toggle.hidden = !(media.matches || touchCapable()) || reduce.matches;
    document.documentElement.classList.toggle("touch-trail-enabled", enabled() && touchCapable());
    toggle.setAttribute("aria-pressed", String(preferred));
    toggle.querySelector(".trail-state").textContent = preferred ? "on" : "off";
    if (!enabled()) clear();
    else prime();
  }
  function spawn(x, y, dx, dy, mobile = false, delay = 0, burstSources = null) {
    const available = sources.filter(src => ready.has(src));
    if (!available.length) return;
    // Shuffle without repetition; preserve variety even during fast gestures.
    bag = bag.filter(src => ready.has(src));
    if (!bag.length) {
      bag = available.slice();
      for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
      if(bag.length>1 && bag[bag.length-1]===previousSource)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]];
    }
    // A burst may straddle a shuffle-cycle boundary. Exclude every source
    // already used in this burst, not just the immediately preceding source.
    let index = bag.length - 1;
    if (burstSources) while(index >= 0 && burstSources.has(bag[index])) index--;
    let src;
    if(index >= 0) src = bag.splice(index,1)[0];
    else {
      const choices = available.filter(s => !burstSources || !burstSources.has(s));
      if(!choices.length) return;
      src = choices[Math.floor(Math.random()*choices.length)];
    }
    if(burstSources) burstSources.add(src);
    previousSource = src;
    const original = ready.get(src);
    const image = original.cloneNode();
    image.className = "image-trail__item";
    image.alt = "";
    image.draggable = false;
    const landscape = original.naturalWidth >= original.naturalHeight;
    const speed = Math.hypot(dx,dy);
    const emphasis = Math.min(1.16, 1 + speed / 600);
    const width = emphasis * (mobile ? (landscape ? Math.min(146, innerWidth * .37) : Math.min(110, innerWidth * .29)) : landscape ? Math.min(182, Math.max(126, innerWidth * .125)) : Math.min(118, Math.max(92, innerWidth * .085)));
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
    // Touch uses passive Touch Events, including while the browser scrolls.
    if (event.pointerType === "touch" || performance.now()-lastTouch < 700) return;
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
    const burstSources = new Set();
    for(let i=1;i<=burst;i++){
      const fraction=i/burst;
      spawn(anchor.x+dx*fraction,anchor.y+dy*fraction,dx/burst,dy/burst,false,(i-1)*12,burstSources);
    }
    anchor = {x,y}; distance = 0; lastTime = now;
  }, {passive:true});
  document.documentElement.addEventListener("pointerleave", () => { last = anchor = null; distance = 0; });
  window.addEventListener("pointerdown", event => {
    if (event.pointerType !== "touch" && performance.now()-lastTouch >= 700) clear();
  }, {passive:true});
  // Native Touch Events continue to report movement during ordinary page scrolling.
  // Never preventDefault: browser scrolling, pinch zoom and link activation remain native.
  window.addEventListener("touchstart", event => {
    lastTouch = performance.now();
    if (!enabled() || event.touches.length !== 1 || selecting()) { clear(); return; }
    const t = event.touches[0];
    clear();
    contact = {id:t.identifier,x:t.clientX,y:t.clientY,startX:t.clientX,startY:t.clientY,moved:false,startedInteractive:!!interactive(event.target)};
    // Draw immediately on noninteractive content; controls never emit on a tap.
    if (!contact.startedInteractive) spawn(t.clientX,t.clientY,0,0,true);
    lastTime = performance.now();
  }, {passive:true});
  window.addEventListener("touchmove", event => {
    lastTouch = performance.now();
    if (!contact || !enabled() || event.touches.length !== 1 || selecting()) { clear(); return; }
    const t = Array.from(event.touches).find(t=>t.identifier===contact.id);
    if (!t) { clear(); return; }
    const x=t.clientX,y=t.clientY,dx=x-contact.x,dy=y-contact.y;
    if (Math.hypot(x-contact.startX,y-contact.startY)>12) contact.moved=true;
    const now=performance.now();
    if (!contact.moved || Math.hypot(dx,dy)<cadence.mobile.spacing || now-lastTime<cadence.mobile.interval) return;
    const burst=Math.min(2,Math.max(1,Math.floor(Math.hypot(dx,dy)/60)));
    const burstSources = new Set();
    for(let i=1;i<=burst;i++){
      const f=i/burst;
      spawn(contact.x+dx*f,contact.y+dy*f,dx/burst,dy/burst,true,(i-1)*12,burstSources);
    }
    contact.x=x;contact.y=y;lastTime=now;
  }, {passive:true});
  window.addEventListener("touchend", event => {
    lastTouch=performance.now();
    if (!event.touches.length) contact=null;
    else clear();
  }, {passive:true});
  window.addEventListener("touchcancel", () => { lastTouch=performance.now(); clear(); }, {passive:true});
  window.addEventListener("pointercancel", event => { if(event.pointerType!=="touch") clear(); }, {passive:true});
  window.addEventListener("blur", clear);
  document.addEventListener("focusin", clear);
  document.addEventListener("selectionchange", () => { if (getSelection() && !getSelection().isCollapsed) clear(); });
  window.addEventListener("resize", () => { if (!contact && performance.now()-lastTouch>1100) clear(); }, {passive:true});
  window.addEventListener("scroll", () => { if (!contact && performance.now()-lastTouch>1100) clear(); }, {passive:true});
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
