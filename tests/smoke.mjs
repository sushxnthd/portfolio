import { chromium } from "playwright";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function runCase(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("http://127.0.0.1:8000/", {
    waitUntil: "domcontentloaded",
    timeout: 15000
  });

  assert((await page.locator(".boot-screen").count()) === 0, name + ": boot overlay still exists");
  assert(await page.locator("#archive").isVisible(), name + ": archive is not visible");
  assert(await page.locator('.media-item[data-project="kernellum"]').isVisible(), name + ": Kernellum disc is not visible");

  if (viewport.width >= 721) {
    const pxBefore = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--px").trim());
    await page.mouse.move(viewport.width * 0.78, viewport.height * 0.24);
    await page.waitForTimeout(120);
    const pxAfter = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--px").trim());
    assert(pxAfter !== pxBefore, name + ": pointer motion variables did not update");

    const scrollBefore = await page.locator("#mediaRail").evaluate((el) => el.scrollLeft);
    await page.locator("#mediaRail").evaluate((el) => {
      el.dispatchEvent(new WheelEvent("wheel", {
        deltaY: 280,
        deltaX: 0,
        bubbles: true,
        cancelable: true
      }));
    });
    await page.waitForTimeout(520);
    const scrollAfter = await page.locator("#mediaRail").evaluate((el) => el.scrollLeft);
    assert(scrollAfter !== scrollBefore, name + ": wheel inertia did not move archive");
    await page.locator('.media-item[data-project="kernellum"]').evaluate((el) => el.scrollIntoView({ inline: "center", block: "nearest" }));
    await page.waitForTimeout(180);
  }

  await page.locator('.media-item[data-project="kernellum"] .disc-button').click({ force: true });
  await page.waitForTimeout(1050);
  const takeoverOpen = await page.locator("#takeover").evaluate((el) => el.classList.contains("is-open"));
  if (!takeoverOpen) {
    const debug = await page.evaluate(() => ({
      dragging: typeof dragging !== "undefined" ? dragging : "missing",
      dragMoved: typeof dragMoved !== "undefined" ? dragMoved : "missing",
      activeId: typeof activeId !== "undefined" ? activeId : "missing",
      openProjectType: typeof openProject,
      takeoverClass: document.getElementById("takeover")?.className || "missing",
      pageReady: document.readyState
    }));
    throw new Error(name + ": project takeover did not open; debug=" + JSON.stringify(debug) + "; pageErrors=" + pageErrors.join(" | "));
  }

  await page.locator("#closeTakeover").click({ force: true });
  assert(!(await page.locator("#takeover").evaluate((el) => el.classList.contains("is-open"))), name + ": project takeover did not close");

  await page.locator("#openIndex").click({ force: true });
  assert(await page.locator("#indexPanel").evaluate((el) => el.classList.contains("is-open")), name + ": index did not open");
  await page.waitForTimeout(700);

  await page.locator("#closeIndex").click({ force: true });
  assert(!(await page.locator("#indexPanel").evaluate((el) => el.classList.contains("is-open"))), name + ": index did not close");

  if (viewport.width >= 721) {
    await page.locator('.nav-tab[data-mode="research"]').click({ force: true });
    await page.waitForTimeout(100);
    assert(await page.locator('.media-item[data-project="calibration"]').isVisible(), name + ": research mode did not show Calibration");
    assert(!(await page.locator('.media-item[data-project="kernellum"]').isVisible()), name + ": research mode did not hide work items");
  }

  assert(pageErrors.length === 0, name + ": browser page errors: " + pageErrors.join(" | "));
  await page.close();
}

const browser = await chromium.launch({ headless: true });
try {
  await runCase(browser, "desktop", { width: 1440, height: 900 });
  await runCase(browser, "mobile", { width: 390, height: 844 });
  console.log("SMOKE_PASS");
} finally {
  await browser.close();
}
