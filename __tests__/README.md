# HackRPI Website Testing Strategy

This document outlines the testing approach for the HackRPI website project to ensure code quality, reliability, and performance.

## Testing Layers

Our testing strategy uses a pyramid approach with different types of tests:

1. **Unit Tests** - Test individual functions and components in isolation
2. **Component Tests** - Test React components with their direct dependencies
3. **Integration Tests** - Test interactions between components
4. **End-to-End Tests** - Test complete user flows through the application

## Coverage Goals

We aim for the following coverage targets:

- **Critical Utils (timer.ts, schedule.ts):** 90% line coverage
- **Server Actions (actions.ts):** 80% line coverage
- **React Components:** 70% line coverage
- **Overall Project:** At least a 40% baseline coverage

## Testing Best Practices

### 1. Unit Tests

- Focus on testing one thing at a time
- Use descriptive test names that explain behavior
- Group related tests using `describe` blocks
- Arrange-Act-Assert pattern for clear structure
- Mock external dependencies (API calls, etc.)

Example:

```typescript
// Example unit test for a utility function
describe("calculateDeltaTime", () => {
	it("returns zero values when end time is earlier than current time", () => {
		// Arrange
		const currentTime = new Date("2025-01-02");
		const endTime = new Date("2025-01-01");

		// Act
		const result = calculateDeltaTime(currentTime, endTime);

		// Assert
		expect(result.seconds).toBe(0);
		expect(result.minutes).toBe(0);
		expect(result.hours).toBe(0);
		expect(result.days).toBe(0);
		expect(result.months).toBe(0);
	});
});
```

### 2. Component Tests

- Test rendering with different props
- Test user interactions (clicks, inputs)
- Test accessibility features
- Use screen queries based on roles and text
- Avoid testing implementation details

Example:

```typescript
// Example component test
it("renders speaker information when available", () => {
	render(
		<EventCard
			event={{
				id: "123",
				title: "Workshop",
				speaker: "Jane Doe",
				location: "Room 101",
				// ...other props
			}}
		/>,
	);

	// Check for speaker info
	expect(screen.getByText("Room 101 • Jane Doe")).toBeInTheDocument();
});

it("omits speaker bullet point when no speaker is provided", () => {
	render(
		<EventCard
			event={{
				id: "123",
				title: "Workshop",
				speaker: "",
				location: "Room 101",
				// ...other props
			}}
		/>,
	);

	// Check location without bullet point
	expect(screen.getByText("Room 101")).toBeInTheDocument();
	expect(screen.queryByText("Room 101 •")).not.toBeInTheDocument();
});
```

### 3. Integration Tests

- Test component interactions
- Test routing and navigation
- Use fake timers for predictable timing
- Test page transitions and state management

Example:

```typescript
// Example integration test
it("navigates to event page when event link is clicked", async () => {
	const { user } = renderWithProviders(<Home />);

	// Find and click the event link
	const eventLink = screen.getByRole("link", { name: /event/i });
	await act(async () => {
		await user.click(eventLink);
		jest.runAllTimers();
	});

	// Verify navigation
	expect(mockRouterPush).toHaveBeenCalledWith("/event");
});
```

### 4. Accessibility Testing

- Test keyboard navigation
- Verify all interactive elements have accessible names
- Check heading hierarchy
- Ensure proper focus management

Example:

```typescript
// Example accessibility test
it("maintains proper focus management for keyboard users", async () => {
	const { user } = renderWithProviders(<NavBar />);

	// Tab through navigation
	const firstLink = screen.getByRole("link", { name: /home/i });
	firstLink.focus();

	await act(async () => {
		await user.tab();
		jest.runAllTimers();
	});

	// Second link should now have focus
	const secondLink = screen.getByRole("link", { name: /event/i });
	expect(document.activeElement).toBe(secondLink);
});
```

## Test File Organization

Organize tests to mirror the source code structure:

```
__tests__/
  ├── unit/           # Unit tests for utility functions
  ├── components/     # Component tests
  ├── integration/    # Integration tests
  └── e2e/            # End-to-end tests (future)
```

## Running Tests

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ci` - Run tests with coverage report

## Continuous Integration

Tests are run automatically on every pull request. PRs must pass all tests and maintain coverage thresholds before being merged.

## Mocking Strategy

- Use Jest mocks for external dependencies
- Use the `renderWithProviders` utility for consistent component rendering
- Use fake timers for predictable time-based testing
- Mock routing for navigation testing

## Next Steps

1. Increase test coverage for critical components
2. Add end-to-end tests with Cypress or Playwright
3. Add visual regression testing
4. Implement performance testing

# HackRPI Test Suite Documentation

## Maintainable Testing Guidelines

This document outlines the best practices for writing maintainable tests for the HackRPI website. Following these guidelines will ensure that tests remain robust even when content changes.

### Key Principles

1. **Avoid hardcoded content assertions** - Tests should be resilient to changes in text content
2. **Use data-testid attributes** - Add testid attributes to key elements for reliable selection
3. **Use pattern matching** - Prefer regex patterns over exact string matching
4. **Test structure not specific content** - Focus tests on component structure and behavior
5. **Use test constants** - Define expected values in a central location for easier updates

### Best Practices

#### 1. Prefer data-testid over text content

```jsx
// ❌ Avoid - This is brittle when content changes
const heading = screen.getByText("Exactly This Heading");

// ✅ Better - Use data-testid for reliable selection
const heading = screen.getByTestId("page-heading");
```

#### 2. Use flexible pattern matching for text content

```jsx
// ❌ Avoid - This will break when the date changes
expect(screen.getByText("November 9-10, 2024")).toBeInTheDocument();

// ✅ Better - Use patterns that focus on structure not exact dates
expect(screen.getByText(/November \d+-\d+, 202\d/)).toBeInTheDocument();

// ✅ Best - Use data-testid and then check flexible pattern
const dateElement = screen.getByTestId("event-date");
expect(dateElement.textContent).toMatch(/November \d+-\d+, 202\d/);
```

#### 3. Store common values in centralized constants

```jsx
// Define in a central location
const CURRENT_THEME = "Retro vs. Modern";
const HACKRPI_YEAR = "2025";

// Then use in tests
expect(themeElement.textContent).toBe(CURRENT_THEME);
```

#### 4. Use test utilities for content handling

The test-utils.tsx file provides utility functions to help with content checking:

- `getCurrentHackrpiYear()` - Returns the current HackRPI year
- `getHackrpiMonth()` - Returns the event month
- `getDatePattern()` - Creates consistent date patterns for testing
- `generateTestId` - Utility for creating standardized data-testid values

#### 5. Standardize data-testid naming

Following a consistent naming convention for data-testid attributes makes tests more maintainable:

```jsx
// Component level
<div data-testid="faq-section">...</div>

// List items
<div data-testid="faq-item-0">...</div>
<div data-testid="faq-item-1">...</div>

// Content elements
<h2 data-testid="faq-title-0">...</h2>
<div data-testid="faq-content-0">...</div>
```

Use the `generateTestId` utility from test-utils.tsx to create consistent IDs:

```js
// Creating ids
const sectionId = generateTestId.section("faq"); // "faq-section"
const listItemId = generateTestId.listItem("faq", 0); // "faq-item-0"
const contentId = generateTestId.content("title", "faq", 0); // "faq-title-0"
```

#### 6. Test DOM structure relationships

Instead of testing specific CSS classes or styles, test structure relationships:

```jsx
// ❌ Avoid - Testing implementation details
expect(container.querySelector(".card-header")).toHaveClass("text-2xl");

// ✅ Better - Test structural relationships
const header = screen.getByTestId("card-header");
const content = screen.getByTestId("card-content");
expect(header.parentElement).toContainElement(content);
```

#### 7. Create centralized test mocks

For components that are used in multiple tests, create standardized mocks:

```jsx
// In test-utils.tsx or a dedicated mocks file
export const mockRegistrationLink = () => {
	jest.mock("@/components/themed-components/registration-link", () => {
		return function MockRegistrationLink({ className }) {
			return (
				<div data-testid="registration-link" className={className} role="link" aria-label="Registration Link">
					Registration Link
				</div>
			);
		};
	});
};
```

#### 8. Test for accessibility

Always include accessibility checks in your component tests:

```jsx
it("is accessible", () => {
	const { container } = render(<MyComponent />);
	checkAccessibility(container);
});
```

#### 9. Use the Arrange-Act-Assert pattern consistently

Structure tests with clear sections:

```jsx
it("updates counter when button is clicked", async () => {
	// Arrange
	const { user } = renderWithProviders(<Counter />);
	const button = screen.getByRole("button");

	// Act
	await user.click(button);

	// Assert
	expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

#### 10. Test edge cases and error states

Don't just test the happy path. Include tests for:

```jsx
it("shows fallback content when data is empty", () => {
	render(<DataDisplay data={[]} />);
	expect(screen.getByText("No data available")).toBeInTheDocument();
});

it("handles API errors gracefully", async () => {
	// Mock API error
	mockApi.mockRejectedValueOnce(new Error("API Error"));

	render(<DataComponent />);

	// Wait for error state
	const errorMessage = await screen.findByText(/something went wrong/i);
	expect(errorMessage).toBeInTheDocument();
});
```

## Common Pitfalls To Avoid

1. **Relying on absolute positions or styling**
2. **Using exact text matching for variable content**
3. **Testing third-party component internals**
4. **Asserting on implementation details instead of behavior**
5. **Not isolating tests properly**
6. **Creating brittle time-based tests**
7. **Not testing responsive behavior**

## Test Debugging Tips

When a test is failing:

1. Use `screen.debug()` to see the current DOM state
2. Check console errors in tests with a console spy
3. Isolate the failing test with `test.only()`
4. Break complex tests into smaller, focused tests
5. Verify your mocks are working correctly

## Centralized Mock Registry

To improve test maintainability and reduce redundancies, we've created a centralized mock registry in `__tests__/__mocks__/mockRegistry.tsx`. This file contains reusable mock implementations for common components and browser APIs used throughout the test suite.

### Available Mocks

- **MockRegistrationLink**: A consistent mock for the RegistrationLink component used in multiple test files
- **MockIntersectionObserver**: An enhanced IntersectionObserver mock with full simulation capabilities
- **commonAccessibilityChecks**: Standardized accessibility checks that can be reused across component tests
- **createMockFormEvent**: Helper to create mock form submission events with proper typing

### Usage Example

```tsx
// Import the mocks you need
import { MockRegistrationLink, commonAccessibilityChecks } from "../__mocks__/mockRegistry";

// Use in your jest.mock calls
jest.mock("@/components/themed-components/registration-link", () => {
	return MockRegistrationLink;
});

// Use in your tests
it("passes accessibility checks", () => {
	const { container } = render(<MyComponent />);
	commonAccessibilityChecks(container);
});
```

### Benefits

- **Consistency**: Ensures all tests use the same implementation of common mocks
- **Maintainability**: Changes to mock behavior only need to be made in one place
- **Reduced Duplication**: Eliminates redundant code across test files
- **Type Safety**: All mocks are properly typed for better IDE support
