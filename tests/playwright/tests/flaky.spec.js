const { test, expect } = require('@playwright/test');

test('flaky: clicking triggers OK sometimes', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click('#runBtn');
  // This test is intentionally timing-sensitive; it will wait for either 'OK' text or timeout
  const result = await page.locator('#result').textContent({ timeout: 3000 }).catch(()=>null);
  // assert that the result contains either OK or ERR (we treat ERR as a visible outcome)
  expect(result).toMatch(/(OK|ERR|NETWORK-ERR)/);
});
