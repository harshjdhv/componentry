const { chromium } = require("playwright");

async function takeScreenshot() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1400, height: 800 }, // Wider to show side elements (xl breakpoint)
    deviceScaleFactor: 3, // 3x for crisp quality
    colorScheme: "dark",
  });

  const page = await context.newPage();

  // Wait for fonts and animations to settle
  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle",
  });

  // Extra wait for fonts and animations to finish
  await page.waitForTimeout(10000);

  await page.screenshot({
    path: "apps/web/public/home.png",
    type: "png",
  });

  console.log("Screenshot saved to apps/web/public/home.png");
  console.log("Resolution: 3600x1890 (1200x630 @3x)");

  await browser.close();
}

takeScreenshot().catch(console.error);
