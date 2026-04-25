import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /BCL-4RMVN/i }).first()).toBeVisible();
    await expect(page.locator('h1')).toContainText('Sinta o Som Tátil');
  });

  test('navigation to MIDI player', async ({ page }) => {
    await page.goto('/');

    await page.locator('nav').getByText('MIDI Player').click();
    await expect(page).toHaveURL('/midi-player');
    await expect(page.getByText('KEYFORGE', { exact: true })).toBeVisible();
  });

  test('navigation to Audio player', async ({ page }) => {
    await page.goto('/');

    await page.locator('nav').getByText('Audio Player').click();
    await expect(page).toHaveURL('/audio-player');
    await expect(page.locator('text=FX-900')).toBeVisible();
  });
});