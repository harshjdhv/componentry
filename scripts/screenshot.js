const { chromium } = require("playwright");

async function takeScreenshot() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 }, // OG image standard size
    deviceScaleFactor: 3, // 3x for crisp quality
  });

  const page = await context.newPage();

  // Wait for fonts and animations to settle
  await page.goto("http://localhost:3000/preview", {
    waitUntil: "networkidle",
  });

  // Extra wait for fonts to fully load
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: "apps/web/public/preview.png",
    type: "png",
  });

  console.log("Screenshot saved to apps/web/public/preview.png");
  console.log("Resolution: 3600x1890 (1200x630 @3x)");

  await browser.close();
}

takeScreenshot().catch(console.error);
