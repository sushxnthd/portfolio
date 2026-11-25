import { chromium } from "playwright";
import assert from "node:assert/strict";
const base="http://127.0.0.1:8000/";
const expected={research:10,projects:5,ventures:3,recognition:5,elsewhere:3};
const browser=await chromium.launch({headless:true});
const settle=async(page,fn,arg)=>page.waitForFunction(fn,arg,{timeout:5000});
async function runCase(width,height,reducedMotion="reduce"){
  const page=await browser.newPage({viewport:{width,height},reducedMotion});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  await page.goto(base);
  await settle(page,()=>document.documentElement.classList.contains("enhanced"));
  assert.equal(await page.locator("h1").count(),1);
  assert.match(await page.locator("h1").innerText(),/Sushanth\s+Dasari/);
  assert.equal(await page.locator(".chapter").count(),5);
  for(const [id,n] of Object.entries(expected)){
    assert.equal(await page.locator("#"+id+" .work-card").count(),n);
    assert.equal(await page.locator("#"+id+" button").getAttribute("aria-expanded"),"false");
    assert.equal(await page.locator("#"+id+"-drawer").evaluate(el=>el.inert),true);
  }
  const rail=page.locator(".rail");
  assert(await rail.evaluate(el=>el.scrollWidth>el.clientWidth));
  await page.locator('nav a[href="#research"]').click();
  await settle(page,()=>document.querySelector("#research button").getAttribute("aria-expanded")==="true");
  await settle(page,()=>document.querySelector("#research .chapter-card").getBoundingClientRect().left>=-2 && document.querySelector("#research .chapter-card").getBoundingClientRect().left<80);
  assert.equal(await page.locator("#research-drawer").evaluate(el=>el.inert),false);
  await page.locator("#research button").press("Tab");
  await settle(page,()=>document.activeElement.closest(".work-card")?.id==="copycat");
  await settle(page,()=>{let r=document.getElementById("copycat").getBoundingClientRect();return r.left>=-2&&r.right<=innerWidth+2;});
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#research button").getAttribute("aria-expanded"),"false");
  assert.equal(await page.locator("#research button").evaluate(el=>el===document.activeElement),true);
  await page.locator('nav a[href="#projects"]').click();
  await settle(page,()=>document.querySelector("#projects button").getAttribute("aria-expanded")==="true");
  await page.locator('nav a[href="#ventures"]').click();
  await settle(page,()=>document.querySelector("#ventures button").getAttribute("aria-expanded")==="true");
  assert.equal(await page.locator("#projects button").getAttribute("aria-expanded"),"false");
  assert.equal(await page.locator(".chapter.is-open").count(),1);
  await page.goto(base+"#somno");
  await settle(page,()=>document.querySelector("#projects button").getAttribute("aria-expanded")==="true");
  await settle(page,()=>{let r=document.getElementById("somno").getBoundingClientRect();return r.left>=-2&&r.right<=innerWidth+2;});
  assert.match(await page.locator("#somno").innerText(),/Android v27/);
  const before=await rail.evaluate(el=>el.scrollLeft);
  await rail.evaluate(el=>el.dispatchEvent(new WheelEvent("wheel",{deltaY:150,bubbles:true,cancelable:true})));
  await settle(page,old=>document.querySelector(".rail").scrollLeft>old,before);
  await page.locator('nav a[href="#intro"]').click();
  await settle(page,()=>document.querySelector(".rail").scrollLeft<5);
  await settle(page,()=>document.querySelector('nav a[href="#intro"]').getAttribute("aria-current")==="location");
  await rail.focus();
  await page.keyboard.press("ArrowRight");
  await settle(page,()=>document.querySelector("#research button").getAttribute("aria-expanded")==="true");
  assert.equal(await page.locator("body").evaluate(el=>el.scrollWidth<=innerWidth+1),true);
  // All open work card text fits horizontally; vertical overflow is scrollable.
  const clipping=await page.locator("#research .work-card").evaluateAll(cards=>cards.filter(c=>c.scrollWidth>c.clientWidth+2).map(c=>c.id));
  assert.deepEqual(clipping,[]);
  assert.deepEqual(errors,[]);
  await page.close();
}
try{
  for(const [w,h] of [[360,640],[390,844],[768,1024],[1280,800],[1440,900]]) await runCase(w,h);
  await runCase(1440,900,"no-preference");
  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
  await nojs.goto(base);
  assert.equal(await nojs.locator(".work-card").count(),26);
  assert(await nojs.locator("#somno a").first().isVisible());
  assert(await nojs.locator("#contact a").first().isVisible());
  await nojs.close();
  const short=await browser.newPage({viewport:{width:844,height:390},reducedMotion:"reduce"});
  await short.goto(base+"#projects");
  assert.equal(await short.locator("#projects button").getAttribute("aria-expanded"),"true");
  assert(await short.locator("#somno").isVisible());
  await short.close();
  console.log("PORTFOLIO_DECK_SMOKE_PASS");
}finally{await browser.close();}
