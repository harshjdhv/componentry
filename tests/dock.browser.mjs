import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { chromium } from "playwright";

export async function verifyDock(fixture) {
  const socket = createServer();
  await new Promise((resolve) => socket.listen(0, "127.0.0.1", resolve));
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  const server = spawn(
    process.execPath,
    [
      `${fixture}/node_modules/next/dist/bin/next`,
      "dev",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: fixture,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    },
  );
  let logs = "";
  server.stdout.on("data", (chunk) => {
    logs += chunk;
  });
  server.stderr.on("data", (chunk) => {
    logs += chunk;
  });
  let browser;
  try {
    const url = `http://127.0.0.1:${port}`;
    let ready = false;
    for (let retry = 0; retry < 60; retry++) {
      try {
        if ((await fetch(url, { signal: AbortSignal.timeout(5000) })).ok) {
          ready = true;
          break;
        }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    assert.ok(ready, `Consumer app did not start: ${logs}`);
    browser = await chromium.launch({
      headless: true,
      ...(process.env.PLAYWRIGHT_CHANNEL
        ? { channel: process.env.PLAYWRIGHT_CHANNEL }
        : { executablePath: chromium.executablePath() }),
    });
    for (const reducedMotion of ["no-preference", "reduce"]) {
      const context = await browser.newContext({
        reducedMotion,
        colorScheme: reducedMotion === "reduce" ? "dark" : "light",
        viewport:
          reducedMotion === "reduce"
            ? { width: 390, height: 844 }
            : { width: 1280, height: 800 },
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.goto(url);
      const home = page.getByRole("button", { name: "Home", exact: true });
      await home.waitFor();
      await home.focus();
      assert.equal(await home.getAttribute("type"), "button");
      assert.equal(await home.getAttribute("aria-current"), "page");
      await home
        .getByText("Home", { exact: true })
        .waitFor({ state: "visible" });
      await page.keyboard.press("Enter");
      await page.keyboard.press("Space");
      await page.waitForFunction(
        () =>
          document.querySelector('output[aria-label="activations"]')
            ?.textContent === "2",
      );
      assert.equal(await page.getByLabel("submissions").textContent(), "0");
      await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(() =>
          document.activeElement?.getAttribute("aria-label"),
        ),
        "Search",
      );
      if (reducedMotion === "reduce") {
        const before = await home.boundingBox();
        await home.hover();
        await page.waitForTimeout(350);
        const after = await home.boundingBox();
        assert.equal(
          after.width,
          before.width,
          "Reduced motion must not magnify icons",
        );
        assert.equal(
          after.height,
          before.height,
          "Reduced motion must not resize icons",
        );
        assert.equal(
          await home.evaluate((element) => getComputedStyle(element).transform),
          "none",
        );
      }
      await page.waitForTimeout(350);
      await page.screenshot({
        path: `/tmp/componentry-dock-${reducedMotion}.png`,
      });
      assert.deepEqual(errors, [], "Consumer must not emit browser exceptions");
      await context.close();
    }
    console.log(
      "[dock-browser] Keyboard activation, focus labels, form safety and reduced motion passed in the installed consumer.",
    );
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
    await new Promise((resolve) => {
      if (server.exitCode !== null) resolve();
      else server.once("exit", resolve);
    });
  }
}
