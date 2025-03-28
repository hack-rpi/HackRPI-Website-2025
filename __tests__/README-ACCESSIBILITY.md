# Automated Accessibility Testing for HackRPI Website

This document outlines the automated accessibility testing strategy implemented in the HackRPI Website 2025 project. Our approach combines multiple tools and techniques to ensure comprehensive accessibility validation across the application.

## Overview

Our accessibility testing strategy has three main parts:

1. **Custom accessibility checks** - Manual verification of common accessibility patterns
2. **Basic accessibility checks** - Simplified programmatic checks for common accessibility issues
3. **Automated accessibility testing** - Using jest-axe to automatically detect accessibility issues (for environments where it performs well)

## Using Basic Accessibility Checks

For quick and reliable accessibility testing, we've implemented a simplified accessibility checker that doesn't rely on axe-core. This is particularly useful in CI/CD environments or when you need fast feedback.

```javascript
import { checkBasicAccessibility } from "../test-utils";

it("passes basic accessibility checks", () => {
	const { container } = renderWithProviders(<YourComponent />);

	// Run simplified accessibility checks
	checkBasicAccessibility(container);
});
```

## Using jest-axe for Comprehensive Testing

For more comprehensive testing, we've integrated [jest-axe](https://github.com/nickcolley/jest-axe), a Jest matcher library that uses the axe-core accessibility testing engine to identify accessibility issues automatically during test runs.

Note: jest-axe tests can be slow in some environments, so we recommend running them selectively or in dedicated test runs.

```javascript
import { checkAutomatedA11y } from "../test-utils";

it("passes automated accessibility checks", async () => {
	// Set a longer timeout for this specific test
	jest.setTimeout(60000);

	try {
		const { container } = renderWithProviders(<YourComponent />);

		// Run automated accessibility tests
		await checkAutomatedA11y(container);
	} finally {
		// Reset timeout to default
		jest.setTimeout(15000);
	}
}, 60000); // Add explicit timeout parameter to the test
```

### Available Testing Utilities

- `checkBasicAccessibility(container)` - Runs simplified accessibility checks for common issues
- `checkAutomatedA11y(container, options)` - Runs comprehensive automated accessibility tests using jest-axe
- `checkAccessibility(container)` - Runs custom accessibility checks for general patterns
- `checkNavigationAccessibility(container)` - Specific checks for navigation elements
- `checkFormAccessibility(container)` - Specific checks for form elements

## What Our Basic Accessibility Checks Cover

Our simplified accessibility checker verifies:

1. **Images have alt text** - All `<img>` elements must have an `alt` attribute
2. **Interactive elements have accessible names** - Buttons and links must have text content or ARIA labels
3. **Form elements have labels** - All form controls must be associated with labels
4. **Heading structure is logical** - Headings must follow a proper hierarchy without skipping levels

## What jest-axe Checks Cover

When using the comprehensive jest-axe tests, we check against WCAG 2.1 AA standards, including:

- Color contrast
- Keyboard accessibility
- ARIA attributes
- Form labels
- Alternative text for images
- Semantic HTML
- Focus management

## Test Structure

We've organized accessibility tests in the following way:

1. **Component Tests** - Each component has its own accessibility test
2. **Integration Tests** - We test combinations of components together
3. **Responsive Tests** - We verify accessibility across different viewport sizes
4. **Theme Variation Tests** - We ensure accessibility in both light and dark themes

## Custom Configuration for jest-axe

You can provide custom configuration when calling `checkAutomatedA11y`:

```javascript
await checkAutomatedA11y(container, {
	rules: {
		// Disable specific rules if needed
		"color-contrast": { enabled: false },
		// Or configure rule settings
		"nested-interactive": { enabled: true },
	},
});
```

## Continuous Integration

These accessibility tests run as part of our standard test suite in CI/CD pipelines. Any accessibility failures will cause the build to fail, ensuring we maintain accessibility standards throughout development.

## Best Practices

1. **Test Early and Often** - Include accessibility tests from the beginning
2. **Write Tests for All Components** - Every component should have accessibility checks
3. **Fix Issues Immediately** - Address accessibility violations as soon as they're detected
4. **Document Exceptions** - If you need to disable certain rules, document why
5. **Combine with Manual Testing** - Automated tests can't catch everything; perform manual testing too
6. **Use Basic Checks for Fast Feedback** - Use `checkBasicAccessibility` for quick tests
7. **Use jest-axe for Comprehensive Testing** - Use `checkAutomatedA11y` for more thorough testing when needed

## Further Resources

- [Jest-Axe Documentation](https://github.com/nickcolley/jest-axe)
- [Axe-Core Rules](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
