// Enhance the existing archive links with inline expansion. Unenhanced links remain valid.
(() => {
  const panels=[...document.querySelectorAll(".inline-panel")];
  if(!panels.length)return;
  const routes=new Map();
  for(const panel of panels){
    routes.set("all-"+panel.dataset.section,{panel,id:null});
    for(const record of panel.querySelectorAll(".record"))routes.set(record.id,{panel,id:record.id});
  }
  const linkRoutes=new Map();
  for(const link of document.querySelectorAll("a[href]")){
    const match=link.getAttribute("href").match(/^(research|building|projects|recognition)\/(?:#(.+))?$/);
    if(!match)continue;
    const key=match[2]||"all-"+match[1];
    const route=routes.get(key);
    if(!route)continue;
    linkRoutes.set(link,key);
    link.setAttribute("aria-controls",route.panel.id);
    link.setAttribute("aria-expanded","false");
  }
  let current=null, trigger=null;
  function close(){
    for(const panel of panels)panel.hidden=true;
    for(const link of linkRoutes.keys())link.setAttribute("aria-expanded","false");
    current=null;
  }
  function show(key,source,move){
    const route=routes.get(key);
    if(!route){close();return;}
    close();
    const {panel,id}=route;
    panel.toggleAttribute("data-single",Boolean(id));
    for(const record of panel.querySelectorAll(".record"))record.hidden=Boolean(id)&&record.id!==id;
    for(const group of panel.querySelectorAll(".archive-group"))group.hidden=Boolean(id)&&!group.querySelector(".record:not([hidden])");
    panel.hidden=false;
    current=key;
    trigger=source||null;
    for(const [link,k] of linkRoutes)link.setAttribute("aria-expanded",String(k===key));
    if(move){const heading=panel.querySelector(".inline-header h2");heading.focus({preventScroll:true});panel.scrollIntoView({block:"start",behavior:"instant"});}
  }
  function keyFromHash(){try{return decodeURIComponent(location.hash.slice(1));}catch{return "";}}
  function sync(){const key=keyFromHash();if(key===current)return;show(key,null,Boolean(routes.has(key)));}
  function dismiss(){
    const previous=trigger;
    close();
    trigger=null;
    history.replaceState(null,"",location.pathname+location.search);
    if(previous)previous.focus({preventScroll:true});
  }
  for(const [link,key] of linkRoutes)link.addEventListener("click",event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(current===key){dismiss();return;}
    history.pushState(null,"","#"+encodeURIComponent(key));
    show(key,link,true);
  });
  for(const panel of panels)panel.querySelector(".inline-close").addEventListener("click",dismiss);
  window.addEventListener("popstate",sync);
  window.addEventListener("hashchange",sync);
  sync();
})();
