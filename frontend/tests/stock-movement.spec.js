import { test, expect } from '@playwright/test';

test('stock movement updates UI', async ({ page }) => {

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.goto('http://localhost:3000');

  await page.waitForSelector('table');

  await page.locator('text=Update Movement').first().click();

  await page.waitForSelector('input[placeholder="Enter quantity"]');

  await page.fill('input[placeholder="Enter quantity"]', '2');

  await page.selectOption('select', 'in');

  await page.fill('input[placeholder="Enter reason"]', 'Playwright test');

  await page.getByRole('button', { name: 'Submit Movement' }).click();

  await expect(page).toHaveURL('http://localhost:3000/');

});