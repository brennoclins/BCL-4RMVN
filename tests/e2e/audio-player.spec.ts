import { test, expect } from '@playwright/test';

test.describe('Audio Player', () => {
  test('player container loads', async ({ page }) => {
    await page.goto('/audio-player');

    await expect(page.locator('text=BCL-4RMVN').first()).toBeVisible();
    await expect(page.locator('text=Select Audio File')).toBeVisible();
  });

  test('upload button is visible', async ({ page }) => {
    await page.goto('/audio-player');

    await expect(page.locator('button:has-text("Load Audio")')).toBeVisible();
  });

  test('buttons have correct initial state', async ({ page }) => {
    await page.goto('/audio-player');

    const playBtn = page.locator('button:has-text("PLAY")');
    await expect(playBtn).toBeDisabled();
  });
});
