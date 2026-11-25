(() => {
  "use strict";
  const sources = ["assets/art/routing.svg","assets/art/copycat.svg","assets/art/interference.svg","assets/art/signal.svg","assets/art/boundary.svg","assets/art/orbit.svg","assets/art/fabric.svg","assets/art/proof.svg","assets/art/latent.svg","assets/art/refinement.svg","assets/art/density.svg","assets/art/events.svg","assets/art/contours.svg","assets/art/search.svg"];
  const media = matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const key = "portfolio-image-trail";
  const toggle = document.querySelector(".trail-toggle");
  if (!toggle || !("animate" in HTMLElement.prototype)) return;
  let preferred = true;
  try { preferred = localStorage.getItem(key) !== "off"; } catch {}
  const layer = document.createElement("div");
  layer.className = "image-trail";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);
  const ready = new Map(), items = new Map();
  let primed = false, index = 0, last = null, latest = null, lastSpawn = -1000, raf = 0, carry = 0;
  const enabled = () => preferred && media.matches && !reduce.matches && !document.hidden;
  const clamp = (v, min, max) => Math.max(min,Math.min(max,v));
  function prime(){
    if(primed)return;
    primed=true;
    sources.forEach(src=>{
      const img=new Image();img.decoding="async";
      img.onload=()=>{if(img.naturalWidth)ready.set(src,img);};
      img.src=src;
    });
  }
  function discard(node){
    const animations=items.get(node);
    if(!animations)return;
    items.delete(node);
    animations.forEach(a=>{a.onfinish=null;a.cancel();});
    node.remove();
  }
  function clear(){
    if(raf)cancelAnimationFrame(raf);
    raf=0;latest=null;last=null;carry=0;lastSpawn=-1000;
    for(const node of items.keys())discard(node);
  }
  function sync(){
    toggle.hidden=!media.matches||reduce.matches;
    toggle.setAttribute("aria-pressed",String(preferred));
    toggle.querySelector(".trail-state").textContent=preferred?"on":"off";
    if(enabled())prime();else clear();
  }
  function spawn(x,y,dx,dy,speed){
    const available=sources.filter(s=>ready.has(s));if(!available.length)return;
    const slot=index++;
    const src=available[slot%available.length],img=ready.get(src).cloneNode();
    img.className="image-trail__item";img.alt="";img.draggable=false;
    const width=clamp(innerWidth*(.186+((slot%3)-1)*.022),170,292);
    const height=width*.75;
    const ux=dx/(Math.hypot(dx,dy)||1),uy=dy/(Math.hypot(dx,dy)||1);
    const offset=clamp(speed*.055,7,44);
    const startX=-ux*offset,startY=-uy*offset;
    const endX=ux*clamp(speed*.045,12,37),endY=uy*clamp(speed*.045,12,37)-18;
    const tilt=clamp(ux*3.8+((slot%3)-1)*1.1,-5.5,5.5);
    img.style.setProperty("--trail-width",width+"px");
    img.style.left=clamp(x-width*.5,8,Math.max(8,innerWidth-width-8))+"px";
    img.style.top=clamp(y-height*.5,8,Math.max(8,innerHeight-height-8))+"px";
    while(items.size>=9)discard(items.keys().next().value);
    layer.append(img);
    const duration=840;
    const transform=img.animate([
      {transform:"translate("+startX+"px,"+startY+"px) scale(.86) rotate("+(-tilt*.35)+"deg)",opacity:0,offset:0,easing:"cubic-bezier(.16,1,.3,1)"},
      {transform:"translate(0,0) scale(1) rotate("+tilt+"deg)",opacity:1,offset:.23,easing:"linear"},
      {transform:"translate("+endX*.2+"px,"+endY*.2+"px) scale(1) rotate("+tilt+"deg)",opacity:1,offset:.46,easing:"cubic-bezier(.4,0,.8,.3)"},
      {transform:"translate("+endX+"px,"+endY+"px) scale(.95) rotate("+(tilt*.65)+"deg)",opacity:0,offset:1}
    ],{duration,fill:"both"});
    const wipe=img.animate([
      {clipPath:"inset(0 0 0 0)",offset:0},
      {clipPath:"inset(0 0 0 0)",offset:.50,easing:"cubic-bezier(.45,0,.85,.3)"},
      {clipPath:Math.abs(dx)>=Math.abs(dy)?(dx>=0?"inset(0 0 0 100%)":"inset(0 100% 0 0)"):(dy>=0?"inset(100% 0 0 0)":"inset(0 0 100% 0)"),offset:1}
    ],{duration,fill:"both"});
    items.set(img,[transform,wipe]);transform.onfinish=()=>discard(img);
  }
  function process(now){
    raf=0;if(!latest||!enabled())return;
    const p=latest;latest=null;
    if(!last){last=p;return;}
    const dx=p.x-last.x,dy=p.y-last.y,dist=Math.hypot(dx,dy);
    const dt=clamp(p.t-last.t,8,100);
    const speed=dist/dt*1000;
    const step=clamp(53+speed*.012,53,84);
    if(dist>0){
      carry+=dist;
      if(carry>=step&&now-lastSpawn>=39){
        spawn(p.x,p.y,dx,dy,speed);lastSpawn=now;carry=carry%step;
      }
    }
    last=p;
  }
  window.addEventListener("pointermove",e=>{
    if(!enabled()||e.pointerType!=="mouse"||e.buttons||!(e.target instanceof Element))return;
    if(e.target.closest("a,button,input,textarea,select,summary,[contenteditable],.footer")||(getSelection()&&!getSelection().isCollapsed)){clear();return;}
    latest={x:e.clientX,y:e.clientY,t:performance.now()};
    if(!raf)raf=requestAnimationFrame(process);
  },{passive:true});
  document.documentElement.addEventListener("pointerleave",()=>{last=null;latest=null;carry=0;});
  window.addEventListener("pointerdown",clear,{passive:true});
  window.addEventListener("blur",clear);
  window.addEventListener("resize",clear,{passive:true});
  window.addEventListener("scroll",clear,{passive:true});
  document.addEventListener("visibilitychange",sync);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"||e.key==="Tab")clear();});
  toggle.addEventListener("click",()=>{preferred=!preferred;try{localStorage.setItem(key,preferred?"on":"off");}catch{}sync();});
  media.addEventListener("change",sync);reduce.addEventListener("change",sync);sync();
})();
