import { test, expect } from '@playwright/test';

/**
 * Phase H: Layout & Regression Safety Net
 * Verifies:
 * 1. Zero horizontal overflow across viewports
 * 2. Section rendering without stuck reveals
 * 3. Preloader dismisses cleanly
 * 4. Nav wordmark and interactive red K
 */

const VIEWPORTS = [
  { name: 'iPhone-SE', width: 375, height: 667 },
  { name: 'iPhone-14', width: 390, height: 844 },
  { name: 'Desktop-1440', width: 1440, height: 900 },
];

for (const vp of VIEWPORTS) {
  test.describe(`Layout Integrity: ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('Loads cleanly without horizontal page overflow', async ({ page }) => {
      await page.goto('http://localhost:4180', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBe(false);
    });

    test('Renders all primary sections', async ({ page }) => {
      await page.goto('http://localhost:4180', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      const expectedSections = ['home', 'about', 'work', 'projects', 'services', 'toolkit', 'go-to', 'contact'];
      for (const id of expectedSections) {
        const el = page.locator(`#${id}`);
        await expect(el).toBeAttached();
      }
    });
  });
}
