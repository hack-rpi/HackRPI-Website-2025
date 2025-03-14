# Comprehensive End-to-End Testing Guide for HackRPI Website (2025)

<div align="center">

```
               ╱╲
              ╱  ╲
             ╱ E2E╲   <- Playwright (new)
            ╱------╲
           ╱ INTEGR-╲  <- Your existing integration tests
          ╱  ATION   ╲
         ╱------------╲
        ╱   COMPONENT  ╲ <- Your existing component tests
       ╱----------------╲
      ╱      UNIT        ╲ <- Your existing unit tests
     ╱--------------------╲
```

</div>

## ⚠️ Important: Manual E2E Testing Only ⚠️

As of March 2025, E2E tests are **excluded from the CI pipeline** and should be run manually by developers before submitting pull requests. This decision was made to avoid conflicts between Jest and Playwright test runners, and to give developers more control over test execution.

### Running E2E Tests Locally

1. **Start the development server** (if not already running):

   ```bash
   npm run dev
   ```

2. **In a separate terminal, run all E2E tests**:

   ```bash
   npm run test:e2e
   ```

3. **Run tests with UI mode** (recommended for debugging):

   ```bash
   npx playwright test --ui
   ```

4. **Run specific test files**:

   ```bash
   npx playwright test e2e/smoke.spec.ts
   ```

5. **Run tests in a specific browser**:
   ```bash
   npx playwright test --project=chromium
   ```

Please run these tests locally before submitting PRs to ensure your changes don't break critical user flows.

## Table of Contents

1. [Introduction](#introduction)
2. [Why Playwright in 2025?](#why-playwright-in-2025)
3. [The Testing Pyramid Approach](#the-testing-pyramid-approach)
4. [Setting Up Your Environment](#setting-up-your-environment)
5. [Running Tests](#running-tests)
6. [Test Structure and Organization](#test-structure-and-organization)
7. [Best Practices (2025)](#best-practices-2025)
8. [Common Testing Patterns](#common-testing-patterns)
9. [Advanced Configuration](#advanced-configuration)
10. [Debugging and Troubleshooting](#debugging-and-troubleshooting)
11. [CI/CD Integration](#cicd-integration)
12. [Mobile and Responsive Testing](#mobile-and-responsive-testing)
13. [Performance Considerations](#performance-considerations)
14. [Next Steps and Future Enhancements](#next-steps-and-future-enhancements)
15. [References and Further Reading](#references-and-further-reading)

## Introduction

This guide documents the end-to-end (E2E) testing implementation for the HackRPI website using Playwright. Our testing strategy follows a multi-layered approach with E2E tests serving as the final verification layer that confirms our application works correctly from a user's perspective.

**End-to-end testing** verifies that all components of the application work together as expected by simulating real user interactions across the entire application. These tests run in actual browsers and validate the behavior that users would experience.

## Why Playwright in 2025?

In 2025, Playwright has emerged as the leading choice for end-to-end testing, surpassing Cypress in weekly downloads since mid-2024 (5.3M+ vs 7.6M+ weekly downloads as of early 2025). After extensive research, we've chosen Playwright for the following reasons:

1. **Cross-browser support**: Playwright supports Chrome, Firefox, Safari, and Edge with a unified API, while Cypress is primarily designed for Chrome
2. **Mobile emulation**: Built-in support for testing on mobile devices and viewports
3. **Advanced capabilities**:
   - Multi-tab and multi-window testing
   - Robust network interception
   - Built-in waiting mechanisms to reduce flaky tests
   - Shadow DOM support
4. **Performance**: Significantly faster test execution, especially with parallel test runs
5. **Modern architecture**: Communicates via WebSocket protocol rather than HTTP requests, reducing points of failure

According to a January 2025 article from Browserbase, "for the most powerful and reliable option, Playwright is the best of the three [compared to Puppeteer and Selenium]" due to its "simple syntax with powerful abstractions behind the scenes" that enables more maintainable test code.

## The Testing Pyramid Approach

Our testing strategy follows the Testing Pyramid model, which recommends having:

```
               ╱╲
              ╱  ╲
             ╱ E2E╲   <- Playwright (new)
            ╱------╲
           ╱ INTEGR-╲  <- Your existing integration tests
          ╱  ATION   ╲
         ╱------------╲
        ╱   COMPONENT  ╲ <- Your existing component tests
       ╱----------------╲
      ╱      UNIT        ╲ <- Your existing unit tests
     ╱--------------------╲
```

Each layer serves a different purpose:

- **Unit tests** (Jest): Test individual functions and components in isolation
- **Component tests** (React Testing Library): Test React components with their direct dependencies
- **Integration tests** (Jest + RTL): Test interactions between components
- **End-to-End tests** (Playwright): Test complete user flows through the application

This approach provides both speed (lower-level tests run faster) and confidence (higher-level tests verify the whole system).

## Setting Up Your Environment

### Prerequisites

- Node.js 16+ (18+ recommended for 2025)
- npm or yarn
- This project repository cloned locally

### Installation

Playwright and its dependencies are already installed in the project. To install the browser binaries needed for testing:

```bash
npx playwright install
```

For CI environments or Docker containers, you may need additional system dependencies:

```bash
npx playwright install-deps
```

To install only specific browsers:

```bash
npx playwright install chromium firefox webkit
```

### Configuration

Our Playwright configuration is in `playwright.config.ts` at the root of the project:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	timeout: 30 * 1000,

	// Retry failed tests on CI to reduce flakiness
	retries: process.env.CI ? 2 : 0,

	// Reporter configuration for detailed test reports
	reporter: [["html", { open: "never" }], ["junit", { outputFile: "playwright-results.xml" }], ["list"]],

	// Test all major browsers and mobile devices
	projects: [
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "firefox", use: { ...devices["Desktop Firefox"] } },
		{ name: "webkit", use: { ...devices["Desktop Safari"] } },
		{ name: "Mobile Chrome", use: { ...devices["Pixel 7"] } },
		{ name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
	],

	// Run local development server before starting the tests
	webServer: {
		command: "npm run build && npm run start",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
	},
});
```

## Running Tests

You can run the Playwright tests using the npm scripts defined in `package.json`:

- Run all tests: `npm run test:e2e`
- Run tests with UI mode: `npm run test:e2e:ui`
- Debug tests: `npm run test:e2e:debug`
- View HTML test report: `npm run test:e2e:report`

### Running Specific Tests

To run a specific test file:

```bash
npx playwright test e2e/smoke.spec.ts
```

To run tests matching a pattern:

```bash
npx playwright test --grep "navigation"
```

To run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

## Test Structure and Organization

Our Playwright tests are organized as follows:

```
e2e/
├── README.md                  # This documentation
├── smoke.spec.ts              # Basic smoke tests
├── navigation.spec.ts         # Navigation tests
├── forms.spec.ts              # Form submission tests
├── api.spec.ts                # API endpoint tests
└── fixtures/                  # Shared test fixtures and data
```

### Test Types

1. **Smoke Tests** (`smoke.spec.ts`):

   - Verify that core pages load correctly
   - Check meta tags and SEO elements
   - Verify accessibility basics

2. **Navigation Tests** (`navigation.spec.ts`):

   - Test navigation between pages
   - Verify mobile navigation behavior
   - Check responsive design elements

3. **Form Tests** (`forms.spec.ts`):

   - Test form submissions and validation
   - Verify error handling
   - Test success scenarios

4. **API Tests** (`api.spec.ts`):
   - Verify API endpoints return expected data
   - Test authentication and authorization
   - Check error handling

## Best Practices (2025)

Based on the latest research and expert recommendations for 2025, here are the key best practices for Playwright testing:

### 1. Test User-Visible Behavior

According to Playwright's official documentation (2025), tests should "verify that the application code works for the end users, and avoid relying on implementation details." This means:

- Focus on what users see and interact with
- Avoid testing internal implementation details
- Test the rendered output rather than component state

### 2. Keep Tests Focused

According to ChecklyHQ (February 2025), tests should focus on verifying one specific feature:

> "Automated tests are effective if they correctly verify the status of the target functionality, return within a reasonable amount of time, and produce a result that can be easily interpreted by humans."

Ensure each test has a single, clear purpose. If a test is verifying multiple features, split it into multiple tests.

### 3. Keep Tests Independent

As advised by testing experts in 2025, each test should be completely isolated from others:

- Use `test.beforeEach()` hooks for setup rather than depending on previous tests
- Avoid shared state between tests
- Reset the application state between tests

From ChecklyHQ (February 2025):

> "In an effort to remove duplication, tests are often made dependent on the previous execution of one or more other tests. [...] This pattern should be avoided at all costs."

### 4. Use Resilient Selectors

According to Oxylabs blog (2025), tests should use selectors that are resilient to UI changes:

1. Prefer role-based selectors:

   ```typescript
   // Good practice
   page.getByRole("button", { name: "Submit" });

   // Avoid
   page.locator("#submit-button");
   ```

2. Use text content for links and buttons:

   ```typescript
   page.getByText("Login");
   ```

3. Use form labels for inputs:
   ```typescript
   page.getByLabel("Email address");
   ```

### 5. Test Across All Browsers

According to Oxylabs (2025):

> "Make sure your application works well in all the browsers your users might use. Playwright makes it easy to test in different browsers like Chrome, Firefox, and Safari."

Our configuration already includes the major browsers and mobile devices.

### 6. Write Clear Test Names

Per Oxylabs (2025):

> "Give your tests descriptive names that explain what they're checking. A good test name helps others understand what the test does without having to read the code."

Example:

```typescript
// Bad practice
test("login test", async () => {});

// Good practice
test("user can log in with correct email and password", async () => {});
```

### 7. Use Playwright's Built-in Tools

Playwright offers several tools that improve testing efficiency:

- **Playwright Inspector**: Debug tests visually
- **Code Generator**: Create tests by recording browser actions
- **Trace Viewer**: Analyze test execution with screenshots and timeline
- **Video Recording**: Capture test runs for later analysis

### 8. Keep Playwright Up to Date

According to Playwright documentation:

> "By keeping your Playwright version up to date you will be able to test your app on the latest browser versions and catch failures before the latest browser version is released to the public."

## Common Testing Patterns

### Page Object Model

For larger applications, consider using the Page Object Model (POM) to organize your test code:

```typescript
// pages/home.page.ts
export class HomePage {
	constructor(private page) {}

	async navigate() {
		await this.page.goto("/");
	}

	async getTitle() {
		return this.page.title();
	}

	async clickLoginButton() {
		await this.page.getByRole("link", { name: "Login" }).click();
	}
}

// tests/login.spec.ts
import { HomePage } from "../pages/home.page";

test("should navigate to login page", async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.navigate();
	await homePage.clickLoginButton();

	await expect(page).toHaveURL(/.*login/);
});
```

### Testing Form Submissions

```typescript
test("contact form should validate input", async ({ page }) => {
	// Navigate to contact page
	await page.goto("/contact");

	// Fill form fields
	await page.getByLabel("Name").fill("Test User");
	await page.getByLabel("Email").fill("test@example.com");
	await page.getByLabel("Message").fill("This is a test message");

	// Submit form
	await page.getByRole("button", { name: "Submit" }).click();

	// Check for success message
	await expect(page.getByText("Thank you for your message")).toBeVisible();
});
```

### Testing API Interactions

```typescript
test("should fetch and display data from API", async ({ page }) => {
	// Mock API response to ensure consistent test results
	await page.route("**/api/data", (route) => {
		route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({ message: "Test data" }),
		});
	});

	// Navigate to page that fetches data
	await page.goto("/data");

	// Verify data is displayed
	await expect(page.getByText("Test data")).toBeVisible();
});
```

## Advanced Configuration

### Customizing Test Timeouts

For tests that require more time:

```typescript
test("long running operation completes", async ({ page }) => {
	test.setTimeout(60000); // Set timeout to 60 seconds for this test only

	await page.goto("/long-operation");
	await page.getByRole("button", { name: "Start" }).click();

	// Wait for operation to complete
	await expect(page.getByText("Operation completed")).toBeVisible();
});
```

### Handling Authentication

For tests that require authentication:

```typescript
// Create a reusable authenticated state
async function createAuthenticatedState(page) {
	await page.goto("/login");
	await page.getByLabel("Email").fill("test@example.com");
	await page.getByLabel("Password").fill("password123");
	await page.getByRole("button", { name: "Login" }).click();

	// Wait for successful login
	await expect(page).toHaveURL("/dashboard");

	// Save authenticated state
	return await page.context().storageState();
}

// Use the authenticated state in tests
test.describe("Protected pages", () => {
	let authState;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		authState = await createAuthenticatedState(page);
		await context.close();
	});

	test.use({ storageState: () => authState });

	test("can access protected page", async ({ page }) => {
		await page.goto("/protected");
		await expect(page.getByText("Protected Content")).toBeVisible();
	});
});
```

### Parallel Testing

Playwright can run tests in parallel to speed up execution. Configure in `playwright.config.ts`:

```typescript
export default defineConfig({
	// Set number of parallel workers
	workers: process.env.CI ? 4 : undefined, // Use 4 parallel processes on CI
});
```

## Debugging and Troubleshooting

When tests fail, Playwright provides several ways to debug:

### 1. UI Mode

Run tests with the UI mode for interactive debugging:

```bash
npx playwright test --ui
```

### 2. Debug Mode

Run tests in debug mode to pause execution:

```bash
npx playwright test --debug
```

### 3. Visual Traces

Playwright automatically captures traces for failed tests, which include:

- Screenshots at each step
- DOM snapshots
- Network requests
- Console logs

View traces with:

```bash
npx playwright show-report
```

### 4. Common Issues and Solutions

| Issue                  | Solution                                                               |
| ---------------------- | ---------------------------------------------------------------------- |
| Element not found      | Check if the selector is correct, increase timeout, or use `waitFor()` |
| Test is flaky          | Add explicit waits, improve selectors, or use auto-waiting features    |
| Authentication fails   | Check credentials, verify auth flow, or use storage state              |
| Page navigation issues | Wait for navigation to complete with `await page.waitForURL()`         |
| Browser compatibility  | Run tests in all browsers to catch browser-specific issues             |

## CI/CD Integration

Our Playwright tests are integrated with GitHub Actions to run automatically on every pull request and push to main branches.

### GitHub Workflow Configuration

Our workflow is defined in `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  e2e-tests:
    name: Playwright Tests
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium firefox webkit

      - name: Build Next.js application
        run: npm run build

      - name: Run Playwright tests
        run: npm run test:e2e

      - name: Upload test artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: |
            playwright-report/
            test-results/
          retention-days: 30
```

### Other CI Systems

Playwright can be integrated with other CI systems like:

- CircleCI
- Jenkins
- GitLab CI
- Azure DevOps

Refer to the [Playwright CI documentation](https://playwright.dev/docs/ci) for specific configurations.

## Mobile and Responsive Testing

Playwright makes it easy to test mobile and responsive designs:

### 1. Device Emulation

Test on emulated mobile devices:

```typescript
test("works on iPhone", async ({ browser }) => {
	const iPhone = devices["iPhone 14"];
	const context = await browser.newContext({
		...iPhone,
	});
	const page = await context.newPage();

	await page.goto("/");
	// Run tests on mobile
});
```

### 2. Responsive Design Testing

Test at different viewport sizes:

```typescript
test("responsive layout changes at breakpoints", async ({ page }) => {
	// Test desktop layout
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto("/");
	await expect(page.locator(".desktop-menu")).toBeVisible();

	// Test mobile layout
	await page.setViewportSize({ width: 375, height: 667 });
	await expect(page.locator(".desktop-menu")).not.toBeVisible();
	await expect(page.locator(".mobile-menu")).toBeVisible();
});
```

## Performance Considerations

### 1. Test Execution Speed

To improve test execution speed:

- Run tests in parallel
- Use headless mode in CI
- Limit the number of browsers when possible
- Consider using sharding for large test suites

### 2. Measuring Performance Metrics

Playwright can capture performance metrics:

```typescript
test("page loads within performance budget", async ({ page }) => {
	const startTime = Date.now();
	await page.goto("/");
	const loadTime = Date.now() - startTime;

	console.log(`Page load time: ${loadTime}ms`);
	expect(loadTime).toBeLessThan(3000); // 3 second budget
});
```

### 3. Visual Performance Testing

For visual performance, consider capturing screenshots and comparing them:

```typescript
test("no visual regression", async ({ page }) => {
	await page.goto("/");

	// Take screenshot and compare with baseline
	await expect(page).toHaveScreenshot("homepage.png");
});
```

## Next Steps and Future Enhancements

1. **Expand Test Coverage**: Add tests for all critical user journeys
2. **Visual Regression Testing**: Implement screenshot comparison
3. **Accessibility Testing**: Add comprehensive a11y tests
4. **Performance Testing**: Add performance budget tests
5. **API Mocking**: Implement comprehensive API mocking
6. **Integration with Error Reporting**: Send test failures to monitoring systems

## References and Further Reading

1. [Playwright Official Documentation](https://playwright.dev/docs/intro) - Comprehensive guide to Playwright
2. [Playwright vs Cypress: Which One Should You Choose in 2025](https://caw.tech/cypress-vs-playwright-which-one-should-you-choose-in-2025/) - Detailed comparison of testing frameworks
3. [Choosing between Playwright, Puppeteer, or Selenium? We recommend Playwright](https://www.browserbase.com/blog/recommending-playwright) (January 2025) - Analysis of the benefits of Playwright over alternatives
4. [Best Practices for Writing Tests in Playwright](https://www.checklyhq.com/learn/playwright/writing-tests/) (February 2025) - Testing best practices and patterns
5. [Playwright Best Practices](https://oxylabs.io/blog/playwright-best-practises) - Comprehensive guide to optimizing your Playwright tests
6. [Testing Next.js Applications with Playwright](https://nextjs.org/docs/pages/building-your-application/testing/playwright) - Official Next.js guide for Playwright integration

---

_This documentation was last updated: April 2025_
