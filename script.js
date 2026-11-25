(() => {
  'use strict';
  const rail = document.querySelector('.rail');
  const track = document.getElementById('track');
  if (!rail || !track) return;
  const chapters = [...track.querySelectorAll('.chapter')];
  const scenes = [document.getElementById('intro'), ...chapters];
  const nav = [...document.querySelectorAll('.chrome__nav a')];
  const progress = document.getElementById('progress');
  const label = document.getElementById('scene-label');
  const count = document.getElementById('scene-count');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const vertical = matchMedia('(max-height: 510px)');
  let openChapter = null, active = 0, pending = 0, drag = null, suppressClick = false;
  const scrollBehavior = smooth => smooth && !motion.matches ? 'smooth' : 'instant';
  const anchorOffset = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const targetOf = ch => ch.querySelector('.chapter-card');
  function setOpen(ch, state) {
    const button = targetOf(ch), drawer = ch.querySelector('.chapter-drawer');
    ch.classList.toggle('is-open', state);
    button.setAttribute('aria-expanded', String(state));
    drawer.inert = !state;
    if (!state) drawer.setAttribute('aria-hidden','true');
    else drawer.removeAttribute('aria-hidden');
  }
  function changeDeck(ch, state, preserve = true) {
    const button = targetOf(ch);
    const before = button.getBoundingClientRect().left;
    if (openChapter && openChapter !== ch) {
      const old = openChapter;
      if (old.querySelector('.chapter-drawer').contains(document.activeElement)) targetOf(old).focus({preventScroll:true});
      setOpen(old, false);
      openChapter = null;
    }
    if (!state && ch.querySelector('.chapter-drawer').contains(document.activeElement)) button.focus({preventScroll:true});
    setOpen(ch, state);
    openChapter = state ? ch : null;
    if (preserve && !vertical.matches) rail.scrollLeft += button.getBoundingClientRect().left - before;
    requestPaint();
  }
  function moveTo(el, smooth = true) {
    if (vertical.matches) {
      el.scrollIntoView({block:'start',behavior:scrollBehavior(smooth)});
      return;
    }
    const x = rail.scrollLeft + el.getBoundingClientRect().left - rail.getBoundingClientRect().left - anchorOffset();
    rail.scrollTo({left:Math.max(0,x),behavior:scrollBehavior(smooth)});
    requestPaint();
  }
  function goTo(el, {push = true, smooth = true, focus = false} = {}) {
    if (!el || !track.contains(el)) return;
    const ch = el.closest('.chapter');
    if (ch && openChapter !== ch) changeDeck(ch, true, false);
    if (!ch && el.id === 'intro' && openChapter) changeDeck(openChapter, false, false);
    if (push && location.hash !== '#' + el.id) history.pushState(null,'','#' + el.id);
    if (focus) {
      const target = el.classList.contains('chapter') ? targetOf(el) : el.querySelector('a') || el;
      if (!target.matches('a,button')) target.tabIndex = -1;
      target.focus({preventScroll:true});
    }
    moveTo(el.classList.contains('chapter') ? targetOf(el) : el, smooth);
  }
  function restoreHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    goTo(document.getElementById(id || 'intro'),{push:false,smooth:false});
  }
  function paint() {
    pending = 0;
    const max = Math.max(0,rail.scrollWidth-rail.clientWidth);
    progress.style.width = (max ? 100*rail.scrollLeft/max : 0) + '%';
    const probe = rail.getBoundingClientRect().left + rail.clientWidth*.32;
    let nearest=0,best=Infinity;
    scenes.forEach((el,i) => {
      const rect=el.getBoundingClientRect();
      const d=rect.left<=probe && rect.right>=probe ? 0 : Math.min(Math.abs(rect.left-probe),Math.abs(rect.right-probe));
      if(d<best){best=d;nearest=i;}
    });
    active=nearest;
    const scene=scenes[active];
    label.textContent=scene.dataset.title || 'Introduction';
    count.textContent=String(active).padStart(2,'0')+' / 05';
    nav.forEach(a => a.hash==='#'+scene.id ? a.setAttribute('aria-current','location') : a.removeAttribute('aria-current'));
  }
  function requestPaint(){if(!pending) pending=requestAnimationFrame(paint);}
  chapters.forEach(ch=>{
    setOpen(ch,false);
    targetOf(ch).addEventListener('click',()=>{
      const state=openChapter!==ch;
      changeDeck(ch,state);
      if(state && location.hash!=='#'+ch.id) history.replaceState(null,'','#'+ch.id);
      else if(!state && location.hash==='#'+ch.id) history.replaceState(null,'',location.pathname+location.search);
    });
  });
  document.documentElement.classList.add('enhanced');
  document.addEventListener('click',e=>{
    if(suppressClick){e.preventDefault();e.stopImmediatePropagation();suppressClick=false;return;}
    const a=e.target.closest('a[href^="#"]');
    if(!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button!==0)return;
    let id;try{id=decodeURIComponent(a.hash.slice(1));}catch{return;}
    const el=document.getElementById(id);
    if(!el || !track.contains(el))return;
    e.preventDefault();goTo(el,{focus:true});
  },true);
  rail.addEventListener('wheel',e=>{
    if(vertical.matches || e.ctrlKey || e.shiftKey || Math.abs(e.deltaX)>=Math.abs(e.deltaY))return;
    const card=e.target.closest('.work-card,.intro-card,.chapter-card');
    if(card && card.scrollHeight>card.clientHeight+2){
      const down=e.deltaY>0;
      if(down ? card.scrollTop+card.clientHeight<card.scrollHeight-1 : card.scrollTop>0)return;
    }
    const scale=e.deltaMode===1?16:e.deltaMode===2?rail.clientWidth:1;
    const dx=e.deltaY*scale, max=rail.scrollWidth-rail.clientWidth;
    if((dx>0 && rail.scrollLeft<max-1)||(dx<0 && rail.scrollLeft>1)){
      e.preventDefault();rail.scrollLeft+=dx;
    }
  },{passive:false});
  rail.addEventListener('pointerdown',e=>{
    suppressClick=false;
    if(vertical.matches || e.pointerType!=='mouse' || e.button!==0 || e.target.closest('a,button,input,textarea'))return;
    if(e.target.closest('.work-card__body,.intro-card__copy,.work-card__evidence'))return;
    drag={id:e.pointerId,x:e.clientX,left:rail.scrollLeft,moved:false};
  });
  rail.addEventListener('pointermove',e=>{
    if(!drag || e.pointerId!==drag.id)return;
    const dx=e.clientX-drag.x;
    if(!drag.moved && Math.abs(dx)>7){drag.moved=true;rail.setPointerCapture(e.pointerId);rail.classList.add('is-dragging');}
    if(drag.moved){e.preventDefault();rail.scrollLeft=drag.left-dx;}
  });
  function endDrag(){if(drag?.moved){suppressClick=true;setTimeout(()=>suppressClick=false,0);}drag=null;rail.classList.remove('is-dragging');}
  rail.addEventListener('pointerup',endDrag);rail.addEventListener('pointercancel',endDrag);rail.addEventListener('lostpointercapture',endDrag);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && openChapter){const old=openChapter;changeDeck(old,false);targetOf(old).focus({preventScroll:true});moveTo(targetOf(old),false);history.replaceState(null,'',location.pathname+location.search);return;}
    if(vertical.matches || e.target!==rail)return;
    const map={ArrowRight:Math.min(scenes.length-1,active+1),ArrowLeft:Math.max(0,active-1),Home:0,End:scenes.length-1};
    if(Object.prototype.hasOwnProperty.call(map,e.key)){e.preventDefault();goTo(scenes[map[e.key]],{push:false});}
  });
  rail.addEventListener('focusin',e=>{
    if(vertical.matches)return;
    const card=e.target.closest('.work-card,.chapter-card,.intro-card');
    if(!card)return;
    const rect=card.getBoundingClientRect(),bounds=rail.getBoundingClientRect();
    if(rect.left<bounds.left || rect.right>bounds.right)moveTo(card,false);
  });
  rail.addEventListener('scroll',requestPaint,{passive:true});
  window.addEventListener('resize',requestPaint,{passive:true});
  window.addEventListener('hashchange',restoreHash);
  window.addEventListener('popstate',restoreHash);
  restoreHash();requestPaint();
})();