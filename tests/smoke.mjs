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
    await inspect(page,"",23);
    assert.equal(await page.locator(".home-list li").count(),12);
    assert.equal(await page.locator(".inline-panel:not([hidden])").count(),0);
    assert.equal(await page.locator(".recent-list li").count(),3);
    assert.equal(await page.locator("body").evaluate(el=>getComputedStyle(el).fontSize),"16px");
    assert.equal(await page.locator(".home-list li p").first().evaluate(el=>getComputedStyle(el).fontSize),"14px");
    assert.equal(await page.locator(".home-columns").evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length),width<=620?1:3);
    assert.equal(await page.evaluate(()=>document.fonts.check("italic 450 17px Newsreader")),true);
    if(width===390||width===1440)await page.screenshot({path:"qa-screenshots/home-"+width+".png",fullPage:true});
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(()=>document.activeElement.className),"skip");
    await page.locator('#selected-copycat a').click();
    await page.waitForURL("**/#copycat");
    assert(await page.locator("#copycat").isVisible());
    assert.equal(await page.locator(".inline-panel .record:visible").count(),1);
    assert.equal(new URL(page.url()).pathname,"/");
    if(width===390||width===1440)await page.screenshot({path:"qa-screenshots/inline-expanded-"+width+".png",fullPage:true});
    await page.locator("#inline-research .inline-close").click();
    assert.equal(await page.locator(".inline-panel:visible").count(),0);
    await page.locator("#research .more a").click();
    assert.equal(await page.locator("#inline-research .record:visible").count(),10);
    await page.locator("#inline-research .inline-close").click();
    for(const [url,count] of Object.entries(archives)){
      await inspect(page,url,count);
      assert.equal(await page.locator(".archive-nav [aria-current=page]").count(),1);
      if(url==="research/")assert.equal(await page.locator(".archive-group").count(),2);
      if((width===390||width===1440)&&url==="research/")await page.screenshot({path:"qa-screenshots/research-"+width+".png",fullPage:true});
    }
    await page.goto(base+"#somno");
    await page.waitForURL("**/#somno");
    assert.match(await page.locator("#somno").innerText(),/Android v27/);
    await page.locator("#somno summary").click();
    assert(await page.locator("#somno figure").isVisible());
    await page.close();
  }
  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
  await inspect(nojs,"",23);
  await nojs.locator('#selected-copycat a').click();
  assert(await nojs.locator("#copycat").isVisible());
  await nojs.close();
  for (const colorScheme of ["light","dark"]) {
    const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme,reducedMotion:"reduce"});
    page.on("pageerror",e=>errors.push(e.message));
    await inspect(page,"",23);
    assert.equal(await page.locator("html").getAttribute("data-theme"),colorScheme);
    assert.equal(await page.locator('.theme-control [data-choice="system"]').getAttribute("aria-pressed"),"true");
    await page.locator('.theme-control [data-choice="dark"]').click();
    assert.equal(await page.locator("html").getAttribute("data-theme"),"dark");
    assert.equal(await page.locator("body").evaluate(e=>getComputedStyle(e).backgroundColor),"rgb(21, 21, 21)");
    await page.screenshot({path:"qa-screenshots/dark-home-"+colorScheme+".png",fullPage:true});
    await inspect(page,"research/",10);
    assert.equal(await page.locator("html").getAttribute("data-theme"),"dark");
    await page.screenshot({path:"qa-screenshots/dark-research-"+colorScheme+".png",fullPage:true});
    await page.locator('.theme-control [data-choice="light"]').click();
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
    await page.locator('.theme-control [data-choice="system"]').click();
    assert.equal(await page.locator("html").getAttribute("data-theme"),colorScheme);
    await page.close();
  }
  const darkMobile=await browser.newPage({viewport:{width:390,height:844},colorScheme:"dark"});
  await inspect(darkMobile,"",23);
  await darkMobile.screenshot({path:"qa-screenshots/dark-home-390.png",fullPage:true});
  await darkMobile.close();
  const darkNoJS=await browser.newPage({viewport:{width:390,height:844},colorScheme:"dark",javaScriptEnabled:false});
  await inspect(darkNoJS,"",23);
  assert.equal(await darkNoJS.locator("body").evaluate(e=>getComputedStyle(e).backgroundColor),"rgb(21, 21, 21)");
  assert.equal(await darkNoJS.locator(".theme-control").isVisible(),false);
  await darkNoJS.close();

  // Desktop mouse trail: actual local image impressions, bounded count, fade,
  // pointer transparency, Escape, persistent opt-out and reduced motion.
  const trail=await browser.newPage({viewport:{width:1440,height:900},colorScheme:"dark",reducedMotion:"no-preference"});
  trail.on("pageerror",e=>errors.push(e.message));
  await inspect(trail,"",23);
  await trail.waitForLoadState("networkidle");
  assert(await trail.locator(".trail-toggle").isVisible());
  await trail.mouse.move(50,200);
  for(let i=1;i<=8;i++){await trail.mouse.move(50+i*70,200+(i%2)*70);await trail.waitForTimeout(80);}
  const impressions=await trail.locator(".image-trail__item").count();
  assert(impressions>=5 && impressions<=10,"trail bounds: "+impressions);
  assert(await trail.locator(".image-trail__item").first().evaluate(e=>e.naturalWidth>0));
  assert.equal(await trail.locator(".image-trail").evaluate(e=>getComputedStyle(e).pointerEvents),"none");
  // Foreground content must paint above images, even on coarse-pointer devices.
  const verifyTrailLayer=async page=>{
    const layer=await page.locator(".image-trail").evaluate(e=>({z:Number(getComputedStyle(e).zIndex),mask:getComputedStyle(e).maskImage,opacity:Number(getComputedStyle(e).opacity)}));
    const foreground=await page.locator(".home").evaluate(e=>({z:Number(getComputedStyle(e).zIndex),position:getComputedStyle(e).position}));
    assert(foreground.z>layer.z && foreground.position!=="static","trail must paint behind content");
    assert.equal(layer.mask,"none","trail must not disappear under a central mask");
    assert.equal(layer.opacity,1,"trail layer must not wash out original image colors");
    assert.equal(await page.locator(".home").evaluate(e=>getComputedStyle(e).backgroundColor),"rgba(0, 0, 0, 0)","foreground must not create an opaque panel");
    assert.equal(await page.locator(".skip").evaluate(e=>Number(getComputedStyle(e).zIndex)>Number(getComputedStyle(document.querySelector(".home")).zIndex)),true);
  };
  await verifyTrailLayer(trail);
  assert(await trail.locator(".image-trail__item").evaluateAll(nodes=>nodes.every(node=>{
    const style=getComputedStyle(node);
    const matrix=new DOMMatrixReadOnly(style.transform);
    return style.borderRadius==="0px" && Math.abs(matrix.b)<1e-6 && Math.abs(matrix.c)<1e-6;
  })));
  const motion=await trail.locator(".image-trail__item").first().evaluate(e=>e.getAnimations()[0].effect.getKeyframes());
  assert(motion[0].clipPath!=="inset(0px)","directional reveal must animate clipping");
  assert(motion.some(k=>Number(k.opacity)===1),"images must reach original opacity");
  await trail.screenshot({path:"qa-screenshots/image-trail-1440.png"});
  await trail.keyboard.press("Escape");
  await trail.mouse.move(25,150);
  await trail.mouse.move(45,150);
  await trail.mouse.move(45,170);
  assert.equal(await trail.locator(".image-trail__item").count(),1,"40px curved travel should emit despite 28px net displacement");
  // A visible trail must not obscure the next keyboard focus or hovered link.
  await trail.keyboard.press("Tab");
  assert.equal(await trail.locator(".image-trail__item").count(),0);
  await trail.mouse.move(40,180);
  await trail.mouse.move(140,180);
  assert(await trail.locator(".image-trail__item").count()>0);
  await trail.locator("#selected-copycat a").hover();
  assert.equal(await trail.locator(".image-trail__item").count(),0);
  await trail.mouse.move(40,180);
  await trail.mouse.move(140,180);
  assert(await trail.locator(".image-trail__item").count()>0);
  await trail.waitForTimeout(1200);
  assert.equal(await trail.locator(".image-trail__item").count(),0);
  await trail.mouse.move(80,250);
  await trail.mouse.move(170,250);
  await trail.keyboard.press("Escape");
  assert.equal(await trail.locator(".image-trail__item").count(),0);
  await trail.locator(".trail-toggle").click();
  assert.equal(await trail.locator(".trail-toggle").getAttribute("aria-pressed"),"false");
  await trail.reload();
  assert.equal(await trail.locator(".trail-toggle").getAttribute("aria-pressed"),"false");
  await trail.mouse.move(50,200);
  await trail.mouse.move(150,200);
  assert.equal(await trail.locator(".image-trail__item").count(),0);
  await trail.close();
  const reduced=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:"reduce"});
  await reduced.goto(base);
  assert.equal(await reduced.locator(".trail-toggle").isVisible(),false);
  await reduced.mouse.move(40,120);
  await reduced.mouse.move(200,120);
  assert.equal(await reduced.locator(".image-trail__item").count(),0);
  await reduced.close();

  // Touch input: tap, horizontal gesture, native vertical scroll and reduced motion.
  const phone=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:"no-preference"});
  phone.on("pageerror",e=>errors.push(e.message));
  await phone.goto(base);
  await phone.waitForLoadState("networkidle");
  assert(await phone.locator(".trail-toggle").isVisible());
  await verifyTrailLayer(phone);
  await phone.touchscreen.tap(25,70);
  assert.equal(await phone.locator(".image-trail__item").count(),1);
  await phone.waitForTimeout(1200);
  assert.equal(await phone.locator(".image-trail__item").count(),0);
  const cdp=await phone.context().newCDPSession(phone);
  const touchEvent=(type,x,y)=>cdp.send("Input.dispatchTouchEvent",{type,touchPoints:type==="touchEnd"?[]:[{x,y,id:0}]});
  await touchEvent("touchStart",25,70);
  for(const x of [75,125,175,225]){await touchEvent("touchMove",x,70);await phone.waitForTimeout(95);}
  await touchEvent("touchEnd",225,70);
  const mobileCount=await phone.locator(".image-trail__item").count();
  assert(mobileCount>=3 && mobileCount<=5,"mobile trail count "+mobileCount);
  await phone.screenshot({path:"qa-screenshots/touch-trail-390.png"});
  await phone.waitForTimeout(1200);
  await touchEvent("touchStart",25,650);
  for(const y of [580,500,420,340]){await touchEvent("touchMove",25,y);await phone.waitForTimeout(95);}
  await touchEvent("touchEnd",25,340);
  await phone.waitForTimeout(300);
  assert(await phone.evaluate(()=>scrollY)>0,"vertical scrolling must stay native");
  assert.equal(await phone.locator(".image-trail__item").count(),0);
  await phone.emulateMedia({reducedMotion:"reduce"});
  assert.equal(await phone.locator(".trail-toggle").isVisible(),false);
  await phone.touchscreen.tap(25,70);
  assert.equal(await phone.locator(".image-trail__item").count(),0);
  await phone.close();

  assert.deepEqual(errors,[]);
  console.log("QUIET_PORTFOLIO_SMOKE_PASS");
}finally{await browser.close();}
