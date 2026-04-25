import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /BCL-4RMVN/i }).first()).toBeVisible();
    await expect(page.locator('h1')).toContainText('Sinta o Som Tátil');
  });

  test('navigation to MIDI player', async ({ page }) => {
    await page.goto('/');

    await page.click('text=MIDI Player');
    await expect(page).toHaveURL('/midi-player');
    await expect(page.getByText('KEYFORGE', { exact: true })).toBeVisible();
  });

  test('navigation to Audio player', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Audio Player', exact: true }).click();
    await expect(page).toHaveURL('/audio-player');
  });
});
