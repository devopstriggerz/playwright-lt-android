# Playwright Android Testing - LambdaTest Reproduction

This is a minimal reproduction repository for testing Android devices on LambdaTest using Playwright.

## Prerequisites

1. Node.js installed
2. LambdaTest account with username and access key
3. Local application running on http://localhost:1801

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure LambdaTest credentials:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and replace the placeholder values with your LambdaTest credentials:
     ```
     LT_USERNAME=your_lambdatest_username
     LT_ACCESS_KEY=your_lambdatest_access_key
     ```
   Note: The `.env` file is git-ignored to keep your credentials secure.

3. Start your local application on port 1801 (required before running tests)

4. Start the LambdaTest tunnel:
```bash
npm run tunnel
```
Wait for the "Tunnel started successfully" message.

## Running Tests

Important: Ensure both your local application and the LambdaTest tunnel are running before executing tests!

Run specific configurations:

```bash
# Run Chrome tests only (to verify LambdaTest connection works)
npm run test:chrome

# Run Android tests only
npm run test:android

# Run all tests
npm test

# Run in debug mode
npm run test:debug
```

## Test Structure

- `tests/basic.spec.js` - Basic connectivity test that:
  - Loads the application
  - Verifies page title
  - Takes a screenshot
  - Logs results

## Troubleshooting

1. "Internal Server Error: browserType.connect: Either tunnel is not running or disconnected"
   - Ensure tunnel is running via `npm run tunnel`
   - Check console for "Tunnel started successfully" message
   - Try restarting the tunnel
   - Verify your LambdaTest credentials are correct in `.env` file

2. General Connection Issues:
   - Verify your local application is running on port 1801
   - Check LambdaTest credentials are correct in `.env` file
   - Review tunnel logs for connection issues

## Notes

- Screenshots are saved in `test-results/` directory
- Chrome tests are included to verify basic LambdaTest connectivity
- Android tests use Pixel 5 with Android 11
- The tunnel setup is handled automatically by @lambdatest/node-tunnel
