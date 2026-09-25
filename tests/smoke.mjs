import { chromium } from "playwright";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForClass(page, selector, className, present=true, timeout=2500) {
  await page.waitForFunction(
    ({ selector, className, present }) => {
      const el = document.querySelector(selector);
      return !!el && el.classList.contains(className) === present;
    },
    { selector, className, present },
    { timeout }
  );
}

async function runCase(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("http://127.0.0.1:8000/", {
    waitUntil: "domcontentloaded",
    timeout: 15000
  });

  await page.waitForTimeout(350);

  assert(await page.locator("#hero").isVisible(), name + ": hero is not visible");
  assert(await page.locator("#asciiHero").isVisible(), name + ": hero ASCII canvas is not visible");
  assert((await page.locator(".boot-screen").count()) === 0, name + ": obsolete loader exists");

  const heroCanvasState = await page.locator("#asciiHero").evaluate((canvas) => ({
    width: canvas.width,
    height: canvas.height,
    dataLength: canvas.toDataURL().length
  }));
  assert(heroCanvasState.width > 0 && heroCanvasState.height > 0, name + ": hero canvas has no dimensions");
  assert(heroCanvasState.dataLength > 500, name + ": hero ASCII canvas appears blank");

  if (viewport.width >= 761) {
    const pointerBefore = await page.locator("#pointerReadout").textContent();
    await page.mouse.move(viewport.width * 0.82, viewport.height * 0.23);
    await page.waitForTimeout(120);
    const pointerAfter = await page.locator("#pointerReadout").textContent();
    assert(pointerAfter !== pointerBefore, name + ": pointer readout did not react");
  }

  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);

  assert(await page.locator('.project-row[data-project="kernellum"]').isVisible(), name + ": Kernellum row missing");
  assert(await page.locator("#projectAscii").isVisible(), name + ": project ASCII canvas missing");

  await page.locator('.project-row[data-project="theorica"]').hover({ force: true });
  await page.waitForTimeout(120);
  const stageTitle = await page.locator("#stageTitle").textContent();
  assert(stageTitle === "Theorica", name + ": hover did not update project ASCII stage");

  await page.locator('.project-row[data-project="kernellum"]').click({ force: true });
  await waitForClass(page, "#projectView", "is-open", true, 2500);
  assert(await page.locator("#projectView").isVisible(), name + ": project view did not open");
  assert((await page.locator("#viewTitle").textContent()) === "Kernellum", name + ": wrong project view title");

  const detailCanvasState = await page.locator("#detailAscii").evaluate((canvas) => ({
    width: canvas.width,
    height: canvas.height
  }));
  assert(detailCanvasState.width > 0 && detailCanvasState.height > 0, name + ": detail ASCII canvas has no dimensions");

  await page.locator("#closeProject").click({ force: true });
  await waitForClass(page, "#projectView", "is-open", false, 2500);

  await page.locator("#openIndex").click({ force: true });
  await waitForClass(page, "#indexPanel", "is-open", true, 1500);
  assert(await page.locator("#indexPanel").isVisible(), name + ": index did not open");

  await page.locator("#closeIndex").click({ force: true });
  await waitForClass(page, "#indexPanel", "is-open", false, 1500);

  assert(pageErrors.length === 0, name + ": browser page errors: " + pageErrors.join(" | "));
  await page.close();
}

const browser = await chromium.launch({ headless: true });
try {
  await runCase(browser, "desktop", { width: 1440, height: 900 });
  await runCase(browser, "mobile", { width: 390, height: 844 });
  console.log("ASCII_SMOKE_PASS");
} finally {
  await browser.close();
}
