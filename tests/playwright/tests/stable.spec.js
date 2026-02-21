const { test, expect } = require('@playwright/test');

test('stable: page has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const title = await page.locator('#title').textContent();
  expect(title).toContain('Flakiness SUT');
});
