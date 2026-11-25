import {chromium} from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const base="http://127.0.0.1:8000/";
const browser=await chromium.launch({headless:true});
const archives={"research/":10,"projects/":5,"building/":3,"recognition/":5};
const errors=[];
async function inspect(page,url,count){
  const response=await page.goto(base+url,{waitUntil:"domcontentloaded"});
  assert(response.ok(),url+" response "+response.status());
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator("h1").count(),1);
  assert.equal(await page.locator(".record").count(),count);
  const result=await page.evaluate(()=>{
    const ids=[...document.querySelectorAll("[id]")].map(e=>e.id);
    return {duplicate:ids.filter((id,i)=>ids.indexOf(id)!==i),clipped:document.documentElement.scrollWidth>innerWidth+1,missing:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash.slice(1)).filter(id=>!document.getElementById(id)),font:document.fonts.check("400 15px Inter"),fontFace:[...document.fonts].some(f=>f.family==="Inter"&&f.status==="loaded")};
  });
  assert.deepEqual(result,{duplicate:[],clipped:false,missing:[],font:true,fontFace:true},url);
}
try{
  await fs.mkdir("qa-screenshots",{recursive:true});
  for(const [width,height] of [[360,640],[390,844],[768,1024],[1280,800],[1440,900]]){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
    page.on("pageerror",e=>errors.push(e.message));
    await inspect(page,"",0);
    assert.equal(await page.locator(".home-list li").count(),12);
    assert.equal(await page.locator(".recent-list li").count(),3);
    assert.equal(await page.locator("body").evaluate(el=>getComputedStyle(el).fontSize),"16px");
    assert.equal(await page.locator(".home-list li p").first().evaluate(el=>getComputedStyle(el).fontSize),"14px");
    assert.equal(await page.locator(".home-columns").evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length),width<=620?1:3);
    assert.equal(await page.evaluate(()=>document.fonts.check("italic 450 17px Newsreader")),true);
    if(width===390||width===1440)await page.screenshot({path:"qa-screenshots/home-"+width+".png",fullPage:true});
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(()=>document.activeElement.className),"skip");
    await page.locator('a[href="research/#copycat"]').click();
    await page.waitForURL("**/research/#copycat");
    assert(await page.locator("#copycat").isVisible());
    for(const [url,count] of Object.entries(archives)){
      await inspect(page,url,count);
      assert.equal(await page.locator(".archive-nav [aria-current=page]").count(),1);
      if(url==="research/")assert.equal(await page.locator(".archive-group").count(),2);
      if((width===390||width===1440)&&url==="research/")await page.screenshot({path:"qa-screenshots/research-"+width+".png",fullPage:true});
    }
    await page.goto(base+"#somno");
    await page.waitForURL("**/projects/#somno");
    assert.match(await page.locator("#somno").innerText(),/Android v27/);
    await page.locator("#somno summary").click();
    assert(await page.locator("#somno figure").isVisible());
    await page.close();
  }
  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
  await inspect(nojs,"",0);
  await nojs.locator('a[href="research/#copycat"]').click();
  assert(await nojs.locator("#copycat").isVisible());
  await nojs.close();
  assert.deepEqual(errors,[]);
  console.log("QUIET_PORTFOLIO_SMOKE_PASS");
}finally{await browser.close();}
