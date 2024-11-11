const { test, expect } = require('@playwright/test');

test('basic page load test', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');

  // Wait for the page to be loaded
  await page.waitForLoadState('networkidle');

  // Basic verification that we're on the right page
  // This assumes there's a login form or similar on the page
  // Adjust selectors based on your actual page structure
  const title = await page.title();
  console.log(`Page title: ${title}`);

  // Basic assertion to verify page loaded
  expect(title).toBeTruthy();

  // Take a screenshot for verification
  await page.screenshot({ path: `test-results/screenshot-${Date.now()}.png` });
});
