import {chromium} from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const base="http://127.0.0.1:8000/";
const browser=await chromium.launch({headless:true});
const archives={"research/":26,"projects/":11,"building/":3,"recognition/":18};
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
    await inspect(page,"",58);
    assert.equal(await page.locator(".work-section").count(),4);
    assert.equal(await page.locator(".record-heading h2").count(),0);
    assert.equal(await page.locator(".record-permalink").count(),58);
    assert.equal(await page.locator(".record-permalink").evaluateAll(links=>links.every(a=>a.hash.slice(1)===a.closest(".record").id)),true);
    assert.equal(await page.locator(".intro h1").evaluate(el=>getComputedStyle(el).fontSize),width<=620?"24px":"26px");
    assert.equal(await page.locator(".research-process").count(),3);
    assert.equal(await page.locator("#open-tools .record-figure li").count(),25);
    assert.equal(await page.locator("#open-tools .record-figure a[href^='https://sushxnthd.github.io/']").count(),25);
    assert.equal(await page.locator("#hush a[href='https://sushxnthd.github.io/hush/']").count(),1);
    assert.equal(await page.locator("#lucent a[href='https://sushxnthd.github.io/lucent/']").count(),1);
    assert.equal(await page.locator("#kernellum a[href='http://kernellum.qd.je/']").count(),1);
    assert.equal(await page.locator("#copycat a[href$='.pdf']").count(),2);
    assert.equal(await page.locator("#k1 a[href$='.pdf']").count(),4);
    assert.equal(await page.locator(".work-content a[href^='https://drive.google.com/file/d/']").count(),9);
    assert.equal(await page.locator("#aiyes a[href='https://aiyes.org/fall-2026-winners']").count(),1);
    assert.equal(await page.locator(".featured-list li").count(),3);
    assert.equal(await page.locator(".featured-list .featured-link[href^='https://']").count(),3);
    assert.deepEqual(await page.locator(".featured-description h3 a").evaluateAll(a=>a.map(x=>x.getAttribute("href"))),["work/somno/","work/kernellum-k1/","work/agnxiv/"]);
    assert(await page.locator(".featured-work").isVisible());
    assert(await page.locator(".featured-list").evaluate(e=>e.scrollWidth<=e.clientWidth+1));
    // The index uses a shared description axis on desktop; mobile titles and proof
    // links share a row, leaving the description the entire readable width.
    const alignment=await page.evaluate(()=>{
      const rows=[...document.querySelectorAll(".featured-list li")];
      const bounds=e=>e.getBoundingClientRect();
      const items=rows.map(row=>({title:bounds(row.querySelector("h3")),desc:bounds(row.querySelector("p")),proof:bounds(row.querySelector(".featured-link")),row:bounds(row)}));
      const close=(a,b)=>Math.abs(a-b)<2;
      if(innerWidth<=620)return items.every(({title,desc,proof,row})=>close(desc.left,row.left)&&close(desc.right,row.right)&&desc.top>=Math.max(title.bottom,proof.bottom)-2&&title.right<=proof.left+2);
      const axes=[".work-preview",".question-list li>span",".recent-list li>span"].map(s=>bounds(document.querySelector(s)).left);
      return items.every(({title,desc,proof})=>close(title.left,items[0].title.left)&&axes.every(x=>close(x,desc.left))&&close(proof.right,items[0].proof.right));
    });
    assert(alignment,"index alignment at "+width+"px");
    assert.equal(await page.locator(".featured-work h2").evaluate(el=>getComputedStyle(el).fontSize),"14px");
    assert.equal(await page.locator(".home").evaluate(el=>getComputedStyle(el).paddingTop),width<=620?"48px":"96px");
    assert(await page.locator(".work-summary").evaluateAll(nodes=>nodes.every(e=>e.getBoundingClientRect().height>=44)));
    if(width<=620)assert(await page.locator(".theme-control button").evaluateAll(nodes=>nodes.every(e=>e.getBoundingClientRect().width>=44&&e.getBoundingClientRect().height>=44)));


    assert.equal(await page.locator(".work-section[open]").count(),0);
    assert.equal(await page.locator(".recent-list li").count(),5);
    assert.equal(await page.locator(".question-list li").count(),3);
    assert.equal(await page.locator("body").evaluate(el=>getComputedStyle(el).fontSize),"16px");
    assert.equal(await page.locator(".work-preview").first().evaluate(el=>getComputedStyle(el).fontSize),"14px");
    assert.equal(await page.locator(".work-summary").first().evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length),width<=620?2:3);
    assert.equal(await page.evaluate(()=>document.fonts.check("italic 450 17px Newsreader")),true);
    if(width===390||width===1440)await page.screenshot({path:"qa-screenshots/home-"+width+".png",fullPage:true});
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(()=>document.activeElement.className),"skip");
    await page.locator("#research > summary").click();
    assert(await page.locator("#copycat").isVisible());
    await page.locator("#copycat .record-permalink").click();
    assert.equal(new URL(page.url()).hash,"#copycat");
    assert.equal(await page.locator("#copycat .reproduce-command").innerText(),"python code/reproduce_headline.py");
    assert(await page.locator("#theorica .research-process").isVisible());
    assert.match(await page.locator("#theorica .research-process").innerText(),/297\/345 → 345\/345/);
    assert(await page.locator("#k1 .research-process").isVisible());
    assert.equal(await page.locator(".research-process a[href^=\"https://\"]").count(),7);
    await page.locator("#research > summary").click();
    assert.equal(await page.locator("#copycat").isVisible(),false);
    await page.locator("#research > summary").click();
    assert(await page.locator("#copycat").isVisible());
    assert.equal(new URL(page.url()).pathname,"/");
    if(width===390||width===1440)await page.screenshot({path:"qa-screenshots/expanded-"+width+".png",fullPage:true});
    await page.locator("#research > summary").click();
    assert.equal(await page.locator("#copycat").isVisible(),false);
    for(const [url,count] of Object.entries(archives)){
      await inspect(page,url,count);
      assert.equal(await page.locator(".archive-nav [aria-current=page]").count(),1);
      if(url==="research/")assert.equal(await page.locator(".archive-group").count(),2);
      if((width===390||width===1440)&&url==="research/")await page.screenshot({path:"qa-screenshots/research-"+width+".png",fullPage:true});
    }
    await page.goto(base+"#somno");
    await page.waitForURL("**/#somno");
    assert(await page.locator("#projects").evaluate(e=>e.open));
    assert.match(await page.locator("#somno").innerText(),/Android v27/);
    await page.locator("#somno summary").click();
    assert(await page.locator("#somno figure").isVisible());
    await page.close();
  }
  const flagship=[["work/somno/","Somno"],["work/kernellum-k1/","Kernellum / K1"],["work/agnxiv/","agnXiv"],["work/copycat/","CopyCAT"],["work/theorica/","Theorica"]];
  for(const [url,title] of flagship){
    for(const [width,height] of [[390,844],[1440,900]]){
      const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
      page.on("pageerror",e=>errors.push(e.message));
      await inspect(page,url,0);
      assert.equal(await page.locator("h1").innerText(),title);
      assert.equal(await page.locator(".case-facts>div").count(),4);
      assert.equal(await page.locator(".case-section>h2").first().evaluate(e=>getComputedStyle(e).fontSize),"15px");
      assert(await page.locator(".case-section").evaluateAll(nodes=>nodes.every(e=>e.scrollWidth<=e.clientWidth+1)),"case section overflow: "+url);
      assert(await page.locator(".case-facts>div").evaluateAll(nodes=>nodes.every(e=>e.scrollWidth<=e.clientWidth+1)),"case facts overflow: "+url);
      assert(await page.locator(".case-evidence").evaluate(e=>Math.abs(e.getBoundingClientRect().right-e.closest(".case-section").getBoundingClientRect().right)<2),"case evidence right edge: "+url);

      assert(await page.locator(".case-evidence li").count()>=4);
      assert.equal(await page.locator(".image-trail").count(),0);
      if(url==="work/somno/")assert.equal(await page.locator(".case-phone-grid img").count(),3);
      if(url==="work/kernellum-k1/"){assert.equal(await page.locator(".bar-list li").count(),12);assert.deepEqual(await page.locator(".bar-list strong").allTextContents(),["14.6%","12.1%","14.5%","12.0%","13.3%","15.1%","13.0%","15.1%","13.3%","15.1%","13.0%","15.1%"]);assert.equal(await page.locator(".case-data tbody tr").count(),12);}
      if(url==="work/agnxiv/")assert.match(await page.locator(".case-terminal").innerText(),/replayable verdict/);
      if(width===390||width===1440)await page.screenshot({path:"qa-screenshots/"+url.split("/")[1]+"-"+width+".png",fullPage:true});
      await page.close();
    }
  }
  const nf=await browser.newPage({viewport:{width:390,height:844}});
  const nfResponse=await nf.goto(base+"404.html");
  assert(nfResponse.ok());
  assert.equal(await nf.locator("h1").innerText(),"Not here.");
  assert.equal(await nf.locator("link[rel=stylesheet]").getAttribute("href"),"/portfolio/styles.css?v=craft-2");
  await nf.close();

  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
  await inspect(nojs,"",58);
  await nojs.locator("#research > summary").click();
  assert(await nojs.locator("#copycat").isVisible());
  await nojs.close();
  for (const colorScheme of ["light","dark"]) {
    const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme,reducedMotion:"reduce"});
    page.on("pageerror",e=>errors.push(e.message));
    await inspect(page,"",58);
    assert.equal(await page.locator("html").getAttribute("data-theme"),colorScheme);
    assert.equal(await page.locator('.theme-control [data-choice="system"]').getAttribute("aria-pressed"),"true");
    await page.locator('.theme-control [data-choice="dark"]').click();
    assert.equal(await page.locator("html").getAttribute("data-theme"),"dark");
    assert.equal(await page.locator("body").evaluate(e=>getComputedStyle(e).backgroundColor),"rgb(21, 21, 21)");
    await page.screenshot({path:"qa-screenshots/dark-home-"+colorScheme+".png",fullPage:true});
    await inspect(page,"research/",26);
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
  await inspect(darkMobile,"",58);
  await darkMobile.screenshot({path:"qa-screenshots/dark-home-390.png",fullPage:true});
  await darkMobile.close();
  const darkNoJS=await browser.newPage({viewport:{width:390,height:844},colorScheme:"dark",javaScriptEnabled:false});
  await inspect(darkNoJS,"",58);
  assert.equal(await darkNoJS.locator("body").evaluate(e=>getComputedStyle(e).backgroundColor),"rgb(21, 21, 21)");
  assert.equal(await darkNoJS.locator(".theme-control").isVisible(),false);
  await darkNoJS.close();

  // Decode all ten user-approved images and check their expected dimensions.
  const approvedPaths=["assets/trail/approved/kernellum-exploded.webp","assets/trail/approved/hush-botanical.webp","assets/trail/approved/hush-archive.webp","assets/trail/approved/greengroove-band.webp","assets/trail/approved/greengroove-identity.webp","assets/trail/approved/kernellum-board.webp","assets/trail/approved/copycat-pixel.webp","assets/trail/approved/somno-interface.webp","assets/trail/approved/kernellum-optical.webp","assets/trail/approved/kernellum-macro.webp"];
  const approvedDimensions=[[481,640],[640,640],[424,453],[640,501],[640,245],[640,501],[640,640],[640,286],[554,554],[640,640]];
  const art=await browser.newPage();
  await art.goto(base);
  const decoded=await art.evaluate(async paths=>Promise.all(paths.map(async src=>{const img=new Image();img.src=src;await img.decode();return [img.naturalWidth,img.naturalHeight];})),approvedPaths);
  assert.deepEqual(decoded,approvedDimensions);
  await art.close();
  // Desktop mouse trail: actual local image impressions, bounded count, fade,
  // pointer transparency, Escape, persistent opt-out and reduced motion.
  const trail=await browser.newPage({viewport:{width:1440,height:900},colorScheme:"dark",reducedMotion:"no-preference"});
  trail.on("pageerror",e=>errors.push(e.message));
  await inspect(trail,"",58);
  await trail.waitForLoadState("networkidle");
  assert(await trail.locator(".trail-toggle").isVisible());
  await trail.mouse.move(50,200);
  for(let i=1;i<=8;i++){await trail.mouse.move(50+i*70,200+(i%2)*70);await trail.waitForTimeout(80);}
  const impressions=await trail.locator(".image-trail__item").count();
  assert(impressions>=5 && impressions<=10,"trail bounds: "+impressions);
  assert(await trail.locator(".image-trail__item").first().evaluate(e=>e.naturalWidth>0));
  assert(await trail.locator(".image-trail__item").evaluateAll((nodes,paths)=>nodes.every(e=>paths.includes(e.getAttribute("src"))),approvedPaths),"only user-approved artwork appears");
  assert.equal(await trail.locator(".image-trail").evaluate(e=>getComputedStyle(e).pointerEvents),"none");
  // User prefers foreground image impressions and unshadowed type.
  const verifyTrailLayer=async page=>{
    const layer=await page.locator(".image-trail").evaluate(e=>({z:Number(getComputedStyle(e).zIndex),mask:getComputedStyle(e).maskImage,opacity:Number(getComputedStyle(e).opacity)}));
    const foreground=await page.locator(".home").evaluate(e=>({z:Number(getComputedStyle(e).zIndex),position:getComputedStyle(e).position}));
    assert(layer.z>foreground.z && foreground.position!=="static","trail must paint over content");
    assert(await page.locator(".intro h1,.intro p,.work-name,.record h3,.footer").evaluateAll(nodes=>nodes.every(e=>getComputedStyle(e).textShadow==="none")),"typography must remain free of text shadows");
    assert.equal(layer.mask,"none","trail must not disappear under a central mask");
    assert.equal(layer.opacity,1,"trail layer must not wash out original image colors");
    assert.equal(await page.locator(".home").evaluate(e=>getComputedStyle(e).backgroundColor),"rgba(0, 0, 0, 0)","foreground must not create an opaque panel");
    assert.equal(await page.locator(".skip").evaluate(e=>Number(getComputedStyle(e).zIndex)>Number(getComputedStyle(document.querySelector(".image-trail")).zIndex)),true);
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
  // A fast pointer jump should leave a spatial sequence rather than one endpoint.
  await trail.keyboard.press("Escape");
  await trail.mouse.move(30,80);
  await trail.mouse.move(330,80);
  assert.equal(await trail.locator(".image-trail__item").count(),3);
  const stamps=await trail.locator(".image-trail__item").evaluateAll(nodes=>nodes.map(e=>({src:e.getAttribute("src"),x:parseFloat(e.style.left)})));
  assert.equal(new Set(stamps.map(s=>s.src)).size,3,"burst must contain distinct images");
  assert(stamps[0].x<stamps[1].x && stamps[1].x<stamps[2].x,"fast movement must leave intermediate stamps");
  // A visible trail must not obscure the next keyboard focus or hovered link.
  await trail.keyboard.press("Tab");
  assert.equal(await trail.locator(".image-trail__item").count(),0);
  await trail.mouse.move(40,180);
  await trail.mouse.move(140,180);
  assert(await trail.locator(".image-trail__item").count()>0);
  await trail.locator(".intro a").hover();
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
  assert.equal(await phone.locator(".home").evaluate(e=>getComputedStyle(e).touchAction),"auto");
  await phone.waitForTimeout(1200);
  assert.equal(await phone.locator(".image-trail__item").count(),0);
  const cdp=await phone.context().newCDPSession(phone);
  const touchEvent=(type,x,y)=>cdp.send("Input.dispatchTouchEvent",{type,touchPoints:type==="touchEnd"?[]:[{x,y,id:0}]});
  await touchEvent("touchStart",25,70);
  for(const x of [75,125,175,225]){await touchEvent("touchMove",x,70);await phone.waitForTimeout(95);}
  await touchEvent("touchEnd",225,70);
  const mobileCount=await phone.locator(".image-trail__item").count();
  assert(mobileCount>=3 && mobileCount<=6,"mobile trail count "+mobileCount);
  await phone.screenshot({path:"qa-screenshots/touch-trail-390.png"});
  await phone.waitForTimeout(1200);
  await touchEvent("touchStart",25,650);
  for(const y of [580,500,420,340]){await touchEvent("touchMove",25,y);await phone.waitForTimeout(95);}
  await touchEvent("touchEnd",25,340);
  assert(await phone.locator(".image-trail__item").count()>0,"vertical finger movement must leave visible impressions");
  await phone.waitForTimeout(300);
  assert(await phone.evaluate(()=>scrollY)>0,"vertical scrolling must stay native");
  await phone.waitForTimeout(1200);
  assert.equal(await phone.locator(".image-trail__item").count(),0);
  await phone.emulateMedia({reducedMotion:"reduce"});
  assert.equal(await phone.locator(".trail-toggle").isVisible(),false);
  await phone.touchscreen.tap(25,70);
  assert.equal(await phone.locator(".image-trail__item").count(),0);
  await phone.close();

  assert.deepEqual(errors,[]);
  console.log("QUIET_PORTFOLIO_SMOKE_PASS");
}finally{await browser.close();}
