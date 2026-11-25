import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser=await chromium.launch({headless:true});
const base="http://127.0.0.1:8000/";
async function test(width,height,javaScriptEnabled=true){
 const page=await browser.newPage({viewport:{width,height},javaScriptEnabled,reducedMotion:"reduce"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base,{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("h1").count(),1);
 assert.match(await page.locator("h1").innerText(),/Sushanth\s+Dasari/);
 assert.equal(await page.locator(".record").count(),26);
 assert.equal(await page.locator(".feature").count(),4);
 assert.equal(await page.locator("main > section").count(),6);
 assert.equal(await page.locator("figure").count(),4);
 const invalid=await page.locator("body").evaluate(()=>{const ids=[...document.querySelectorAll("[id]")].map(e=>e.id);return {duplicates:ids.filter((id,i)=>ids.indexOf(id)!==i),missing:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash.slice(1)).filter(id=>!document.getElementById(id)),overflow:document.documentElement.scrollWidth>innerWidth+1};});
 assert.deepEqual(invalid,{duplicates:[],missing:[],overflow:false});
 const visible=await page.locator(".record").evaluateAll(els=>els.every(e=>e.getBoundingClientRect().height>0));
 assert(visible,"records hidden without interaction");
 await page.locator('nav a[href="#research"]').click();
 assert.equal(new URL(page.url()).hash,"#research");
 await page.waitForFunction(()=>{let r=document.querySelector("#research").getBoundingClientRect();return r.top>=-3 && r.top<160;});
 await page.goto(base+"#somno",{waitUntil:"domcontentloaded"});
 await page.waitForFunction(()=>{let r=document.querySelector("#somno").getBoundingClientRect();return r.top>=-3 && r.top<160;});
 assert.match(await page.locator("#somno").innerText(),/Android v27/);
 await page.locator('footer a[href="#intro"]').click();
 assert.equal(new URL(page.url()).hash,"#intro");
 await page.keyboard.press("Tab");
 assert(await page.evaluate(()=>document.activeElement.tagName!=="BODY"));
 const clipping=await page.locator(".record,.intro,.masthead-inner,.section-heading,.figure").evaluateAll(els=>els.filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.id||e.className));
 assert.deepEqual(clipping,[]);
 assert.deepEqual(errors,[]);
 await page.close();
}
try{
 for(const [w,h] of [[360,640],[390,844],[768,1024],[1280,800],[1440,900]])await test(w,h);
 await test(390,844,false);
 console.log("FIELDNOTES_SMOKE_PASS");
}finally{await browser.close();}