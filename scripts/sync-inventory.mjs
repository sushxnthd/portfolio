import fs from "node:fs/promises";
function inventory(home,archives){
 const parse=s=>[...s.matchAll(/<article class="record" id="([^"]+)"[\s\S]*?<\/article>/g)].map(m=>({id:m[1],html:m[0]}));
 const source=parse(home), byId=new Map(source.map(v=>[v.id,v.html])), groups=new Map();
 for(const [g,page] of Object.entries(archives))for(const item of parse(page)){if(groups.has(item.id))throw Error("Duplicate archive: "+item.id);groups.set(item.id,g);}
 if(source.length!==byId.size||source.length!==groups.size||source.some(v=>!groups.has(v.id)))throw Error("Inventory coverage mismatch");
 const synced={};
 for(const [g,page] of Object.entries(archives))synced[g]=page.replace(/<article class="record" id="([^"]+)"[\s\S]*?<\/article>/g,(old,id)=>{
   const tag=old.match(/<h([23]) id="/)?.[1]||"2";
   return byId.get(id).replace(/<h3([^>]*)><a class="record-permalink"[^>]*>([\s\S]*?)<\/a><\/h3>/,`<h${tag}$1>$2</h${tag}>`).replace(/href="(work\/[^"]+)"/g,'href="../$1"').replace(/href="#([^"]+)"/g,(whole,target)=>groups.has(target)&&groups.get(target)!==g?`href="../${groups.get(target)}/#${target}"`:whole);
 });
 const plain=s=>s.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim();
 const base="https://sushxnthd.github.io/portfolio/";
 const entries=source.map(({id,html})=>({id,group:groups.get(id),title:plain(html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]||""),status:plain(html.match(/class="record-status">([^<]+)/)?.[1]||""),description:plain(html.match(/<p>([\s\S]*?)<\/p>/)?.[1]||""),qualification:plain(html.match(/<p class="record-note">([\s\S]*?)<\/p>/)?.[1]||""),url:base+"#"+id,links:[...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].filter(m=>!m[1].startsWith("#")).map(m=>({label:plain(m[2]).replace(/\s*[↗→]$/,""),url:(/^https?:/.test(m[1])?m[1]:base+m[1]).replace(/&amp;/g,"&")}))}));
 return {synced,manifest:JSON.stringify({schema:"portfolio.work/1",source:"index.html",records:entries},null,2)+"\n"};
}
const groups=["research","building","projects","recognition"];
const home=await fs.readFile("index.html","utf8");
const archives=Object.fromEntries(await Promise.all(groups.map(async g=>[g,await fs.readFile(g+"/index.html","utf8")])));
const {synced,manifest}=inventory(home,archives);
const outputs={...Object.fromEntries(groups.map(g=>[g+"/index.html",synced[g]])),"data/work.json":manifest};
for(const [path,content] of Object.entries(outputs)){
 if(process.argv.includes("--write")){await fs.mkdir(path.substring(0,path.lastIndexOf("/")),{recursive:true});await fs.writeFile(path,content);}
 else if(await fs.readFile(path,"utf8")!==content)throw Error(path+" is stale: run node scripts/sync-inventory.mjs --write");
}
console.log("Inventory and archive consistency OK");
