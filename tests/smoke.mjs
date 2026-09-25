import { chromium } from "playwright";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForClass(page, selector, className, present=true, timeout=3500) {
  await page.waitForFunction(
    ({selector,className,present}) => {
      const el=document.querySelector(selector);
      return !!el && el.classList.contains(className)===present;
    },
    {selector,className,present},
    {timeout}
  );
}

async function runCase(browser,name,viewport){
  const page=await browser.newPage({viewport});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));

  await page.goto("http://127.0.0.1:8000/",{waitUntil:"domcontentloaded",timeout:15000});
  await page.waitForTimeout(250);

  assert(await page.locator(".intro-section").isVisible(),name+": intro missing");
  assert((await page.locator(".work-card").count())===4,name+": expected four work cards");
  assert(await page.locator("#openTerminalInline").isVisible(),name+": terminal entry missing");

  // Command palette
  await page.locator("#jumpButton").click({force:true});
  await waitForClass(page,"#jumpPalette","is-open",true);
  assert(await page.locator("#jumpPalette").isVisible(),name+": jump palette failed");
  await page.locator("#closeJump").click({force:true});
  await waitForClass(page,"#jumpPalette","is-open",false);

  // Terminal opens and eventually becomes usable.
  await page.locator("#openTerminalInline").click({force:true});
  await waitForClass(page,"#terminalWindow","is-open",true);
  assert(await page.locator("#terminalWindow").isVisible(),name+": terminal failed to open");
  await page.waitForFunction(()=>!document.querySelector("#terminalInput").disabled,{timeout:6000});
  await page.locator("#terminalInput").fill("projects");
  await page.locator("#terminalInput").press("Enter");
  assert((await page.locator("#terminalOutput").textContent()).includes("kernellum"),name+": CLI projects command failed");
  await page.locator("#closeTerminal").click({force:true});
  await waitForClass(page,"#terminalWindow","is-open",false);

  // Project card must open spatial timeline and detail.
  await page.locator('[data-open-card="kernellum"]').click({force:true});
  await waitForClass(page,"#timeline","is-open",true,2500);
  assert(await page.locator("#timeline").isVisible(),name+": timeline failed to open");
  await page.waitForTimeout(850);
  await waitForClass(page,"#timelineDetail","is-open",true,2500);
  assert((await page.locator("#detailTitle").textContent())==="Kernellum",name+": wrong timeline detail");

  // Timeline movement
  const firstBefore=await page.locator('.timeline-card[data-project="kernellum"]').evaluate(el=>el.style.left);
  await page.locator(".timeline-stage").evaluate(el=>{
    el.dispatchEvent(new WheelEvent("wheel",{deltaY:180,bubbles:true,cancelable:true}));
  });
  await page.waitForTimeout(120);
  const firstAfter=await page.locator('.timeline-card[data-project="kernellum"]').evaluate(el=>el.style.left);
  assert(firstBefore!==firstAfter,name+": timeline did not move");

  await page.locator("#closeTimelineDetail").click({force:true});
  await waitForClass(page,"#timelineDetail","is-open",false);
  await page.locator("#closeTimeline").click({force:true});
  await waitForClass(page,"#timeline","is-open",false);

  // Fallback timeline entry remains usable without scroll theatrics.
  await page.locator("#fallbackShowcase").scrollIntoViewIfNeeded();
  await page.locator("#fallbackShowcase").click({force:true});
  await waitForClass(page,"#timeline","is-open",true,2500);
  await page.locator("#closeTimeline").click({force:true});
  await waitForClass(page,"#timeline","is-open",false);

  assert(errors.length===0,name+": browser page errors: "+errors.join(" | "));
  await page.close();
}

const browser=await chromium.launch({headless:true});
try{
  await runCase(browser,"desktop",{width:1440,height:900});
  await runCase(browser,"mobile",{width:390,height:844});
  console.log("GARAGE_SMOKE_PASS");
}finally{
  await browser.close();
}
