// Open native disclosure ancestors for shareable project hashes and in-page links.
(() => {
  function reveal(id) {
    const aliases={"all-research":"research","all-building":"ventures","all-projects":"projects","all-recognition":"recognition"};
    const target=document.getElementById(aliases[id]||id);
    if (!target) return null;
    let parent=target.parentElement;
    while(parent){if(parent instanceof HTMLDetailsElement) parent.open=true;parent=parent.parentElement;}
    if(target.matches(".work-section")) target.open=true;
    return target;
  }
  function readHash(){try{return decodeURIComponent(location.hash.slice(1));}catch{return "";}}
  function sync(){const target=reveal(readHash());if(target)requestAnimationFrame(()=>target.scrollIntoView({block:"start"}));}
  document.addEventListener("click",event=>{
    const link=event.target instanceof Element && event.target.closest('a[href^="#"]');
    if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    let id;try{id=decodeURIComponent(link.hash.slice(1));}catch{return;}
    reveal(id);
  });
  window.addEventListener("hashchange",sync);
  if(location.hash)sync();
})();
