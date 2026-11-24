import { test, expect } from "@playwright/test";
import { projects } from "../../content/projects.mjs";
for (const width of [320, 390, 768, 1440]) {
  test("Portfolio at " + width + "px", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const theme = page.locator("button[data-theme]");
    await theme.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.locator('[data-filter="Cloud"]').click();
    await expect(page.locator(".project:visible")).toHaveCount(1);
    await page.locator('[data-skill="Docker"]').click();
    await expect(page.locator("#skill-result")).toContainText("Attendance");
    await page.getByRole("link", { name: "Email me" }).click();
    await expect(page.getByLabel("Your name")).toBeFocused();
    await page.getByLabel("Subject", { exact: true }).fill("A & B");
    await expect(page.locator("#email-draft")).toHaveAttribute(
      "href",
      /A%20%26%20B/,
    );
    await page.keyboard.press("Escape");
    await page.locator("[data-view-resume]").click();
    await expect(page.locator("#resume-frame")).toHaveAttribute(
      "src",
      /\.pdf$/,
    );
    await page.keyboard.press("Escape");
    const download = page.waitForEvent("download");
    await page.locator("[data-resume]").first().click();
    expect((await download).suggestedFilename()).toBe(
      "Tejasvi_Gupta_Resume.pdf",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .locator(".project:visible")
      .getByRole("link", { name: /Case study/ })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Environment Provisioning Platform",
    );
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("link", { name: /Selected work/ }).click();
    await expect(page.locator("button[data-theme]")).toHaveAttribute("aria-label", "Switch to dark theme");
    await page.keyboard.press("Control+k");
    await expect(page.locator("#command-dialog")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
test("Public routes, metadata and assets", async ({ request }) => {
  for (const p of projects) {
    const response = await request.get("/projects/" + p.id + "/");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(p.name);
  }
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/icon.svg",
    "/images/profile.webp",
    "/resume/Tejasvi_Gupta_Resume.pdf",
  ])
    expect((await request.get(path)).ok()).toBeTruthy();
});
