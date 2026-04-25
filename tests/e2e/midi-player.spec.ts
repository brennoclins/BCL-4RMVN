import { test, expect } from '@playwright/test';

test.describe('MIDI Player', () => {
  test('player container loads', async ({ page }) => {
    await page.goto('/midi-player');

    await expect(page.getByText('KEYFORGE', { exact: true })).toBeVisible();
    await expect(page.getByText('Select Midi File')).toBeVisible();
  });

  test('sound mode select works', async ({ page }) => {
    await page.goto('/midi-player');

    const select = page.locator('select').first();
    await select.selectOption('digital');

    await expect(page.getByText('DIGITAL', { exact: true })).toBeVisible();
  });

  test('drum kit select works', async ({ page }) => {
    await page.goto('/midi-player');

    const drumSelect = page.locator('select').nth(1);
    await drumSelect.selectOption('linn');
    await expect(drumSelect).toHaveValue('linn');
  });

  test('play button is disabled initially', async ({ page }) => {
    await page.goto('/midi-player');

    const playBtn = page.getByRole('button', { name: /PLAY/i });
    await expect(playBtn).toBeDisabled();
  });
});
