import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation & Interaction Suite', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('Mobile hamburger menu opens and closes smoothly', async ({ page }) => {
    await page.goto('http://localhost:4180', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const hamburger = page.locator('button[aria-label="Open menu"]');
    await expect(hamburger).toBeVisible();

    // Tap to open
    await hamburger.click();
    await page.waitForTimeout(400);

    // Verify menu link is visible
    const aboutLink = page.locator('a[href="#about"]').first();
    await expect(aboutLink).toBeVisible();

    // Tap to close
    const closeBtn = page.locator('button[aria-label="Close menu"]');
    await closeBtn.click();
    await page.waitForTimeout(400);
  });

  test('Escape key dismisses mobile menu', async ({ page }) => {
    await page.goto('http://localhost:4180', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const hamburger = page.locator('button[aria-label="Open menu"]');
    await hamburger.click();
    await page.waitForTimeout(300);

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const openBtn = page.locator('button[aria-label="Open menu"]');
    await expect(openBtn).toBeVisible();
  });
});
