// @ts-check
require('dotenv').config();
const { defineConfig } = require('@playwright/test');

if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
  console.error('Please set LT_USERNAME and LT_ACCESS_KEY environment variables');
  process.exit(1);
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: 'https://google.com', // 'http://localhost:8080',
    trace: 'on-first-retry',
    actionTimeout: 30000
  },
  projects: [
    {
      name: 'Chrome@latest:Windows 10@lambdatest',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            'browserName': 'Chrome',
            'browserVersion': 'latest',
            'LT:Options': {
              'platform': 'Windows 10',
              'build': 'playwright-android-test',
              'name': 'Playwright Test - Chrome',
              'user': process.env.LT_USERNAME,
              'accessKey': process.env.LT_ACCESS_KEY,
              'network': true,
              'video': true,
              'console': true,
              'tunnel': true,
              'tunnelName': 'playwright-tunnel'
            }
          }))}`
        }
      }
    },
    {
      name: 'Pixel 5@Android 11@lambdatest',
      use: {
        connectOptions: {
          timeout: 60000,
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            'LT:Options': {
              'platformName': 'android',
              'deviceName': 'Pixel 5',
              'platformVersion': '11',
              'isRealMobile': true,
              'build': 'Playwright Android Build',
              'name': 'Playwright android test',
              'user': process.env.LT_USERNAME,
              'accessKey': process.env.LT_ACCESS_KEY,
              'network': true,
              'video': true,
              'console': true,
              'projectName': 'Browser testing'
            }
          }))}`
        }
      }
    }
  ]
});
