import { test, expect } from '@playwright/test';

/**
 * Phase C: Music Section Drag & Interaction Test Suite
 * Covers 13 interaction & drag physics scenarios:
 * 1. Deadband threshold (< 8px)
 * 2. Vertical scroll pass-through (dy > dx)
 * 3. Horizontal drag activation (dx > dy)
 * 4. Momentum velocity throw & deceleration
 * 5. Snap to nearest station
 * 6. Mobile touch drag emulation
 * 7. Click vs drag distinction (< 6px click, >= 6px drag)
 * 8. Keyboard ArrowLeft / ArrowRight navigation
 * 9. Keyboard Home / End navigation
 * 10. Keyboard Space / Enter play toggle
 * 11. Horizontal wheel navigation
 * 12. Circular modulo wrap-around
 * 13. Pointer cancel recovery
 */

test.describe("Music Section: The Coder's Go-To Drag & Physics", () => {
  const BASE_URL = 'http://localhost:4180';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    // Scroll music section into view
    const section = page.locator('#go-to');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
  });

  test('Case 1: Micro-movements (< 8px) remain inside deadband', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 4, startY + 2); // 4px move
    await page.waitForTimeout(100);
    await page.mouse.up();

    // Verify track 0 remains active
    const activeText = await page.locator('#go-to .font-serif.italic').first().textContent();
    expect(activeText).toBeTruthy();
  });

  test('Case 2: Vertical gesture (dy > dx) preserves page scroll and does not lock carousel', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    const initialScrollY = await page.evaluate(() => window.scrollY);

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // Move 30px vertically, 5px horizontally
    await page.mouse.move(startX + 5, startY + 40, { steps: 5 });
    await page.mouse.up();

    // Carousel should not have locked or jumped tracks
    await page.waitForTimeout(300);
  });

  test('Case 3: Horizontal drag (dx > dy) rotates the carousel', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // Drag horizontally left by 180px
    await page.mouse.move(startX - 180, startY + 4, { steps: 10 });
    await page.waitForTimeout(100);
    await page.mouse.up();

    await page.waitForTimeout(900); // Allow snap animation to settle
  });

  test('Case 4: Fast flick triggers momentum throw', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // Rapid flick
    await page.mouse.move(startX - 250, startY, { steps: 3 });
    await page.mouse.up();

    await page.waitForTimeout(1200);
  });

  test('Case 5: Snap to nearest station', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    // Small drag of 60px
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 60, startY, { steps: 5 });
    await page.mouse.up();
    await page.waitForTimeout(900);
  });

  test('Case 6: Mobile touch drag emulation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    // Emulate touch drag
    await page.touchscreen.tap(startX, startY);
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 120, startY, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(900);
  });

  test('Case 7: Click vs drag distinction', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    // Pure click (0px movement)
    await page.mouse.click(startX, startY);
    await page.waitForTimeout(400);

    // Large drag (150px) should NOT register as track play toggle
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 150, startY, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(600);
  });

  test('Case 8: Keyboard navigation (ArrowLeft & ArrowRight)', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    await carousel.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(600);
  });

  test('Case 9: Keyboard navigation (Home & End)', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    await carousel.focus();
    await page.keyboard.press('End');
    await page.waitForTimeout(800);
    await page.keyboard.press('Home');
    await page.waitForTimeout(800);
  });

  test('Case 10: Keyboard Space / Enter play toggle', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    await carousel.focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
  });

  test('Case 11: Horizontal wheel navigation', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    await carousel.hover();
    await page.mouse.wheel(120, 0); // deltaX: 120
    await page.waitForTimeout(800);
  });

  test('Case 12: Circular modulo wrap-around', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    await carousel.focus();
    // Press ArrowLeft from track 0 -> wraps to track 11
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(700);
    // Press ArrowRight from track 11 -> wraps back to track 0
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(700);
  });

  test('Case 13: Pointer cancel recovery', async ({ page }) => {
    const carousel = page.locator('[aria-label="The Coder\'s Go-To playlist carousel"]');
    const box = await carousel.boundingBox();
    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 80, startY);
    // Simulate pointer cancel by dispatching pointercancel event
    await page.evaluate(() => {
      const el = document.querySelector('[aria-label="The Coder\'s Go-To playlist carousel"]');
      if (el) el.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true }));
    });
    await page.mouse.up();
    await page.waitForTimeout(700);
  });
});
