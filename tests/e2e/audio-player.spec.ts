import { test, expect } from '@playwright/test';

test.describe('Audio Player', () => {
  test('player container loads', async ({ page }) => {
    await page.goto('/audio-player');

    await expect(page.locator('text=501BCLST').first()).toBeVisible();
    await expect(page.locator('text=Ready to Load')).toBeVisible();
  });

  test('upload button is visible', async ({ page }) => {
    await page.goto('/audio-player');

    await expect(page.locator('text=Importar MP3/WAV').first()).toBeVisible();
  });

  test('playlist sidebar shows empty state', async ({ page }) => {
    await page.goto('/audio-player');

    await expect(page.locator('text=Playlist Data')).toBeVisible();
    await expect(page.locator('text=Nenhum arquivo...')).toBeVisible();
  });
});