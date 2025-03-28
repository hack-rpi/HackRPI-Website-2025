# HackRPI Website Testing Guidelines (2025)

This guide outlines the testing approach and best practices for the HackRPI Website project. It's designed to help all contributors maintain high code quality and prevent regressions.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Testing Tools](#testing-tools)
- [Test Structure](#test-structure)
- [Best Practices](#best-practices)
- [Running Tests](#running-tests)
- [Writing New Tests](#writing-new-tests)
- [Mocking](#mocking)
- [Debugging Tests](#debugging-tests)
- [Continuous Integration](#continuous-integration)

## Testing Philosophy

Our testing strategy follows these key principles:

1. **Test behavior, not implementation** - Focus on what the user experiences, not internal implementation details.
2. **Accessibility-first testing** - Prioritize accessible queries to ensure our components work well with assistive technologies.
3. **Real-world interactions** - Simulate how real users interact with components (clicking, typing, etc.).
4. **Clear error messages** - Tests should provide clear feedback when they fail.

## Testing Tools

We use the following tools for testing:

- **Jest** - Test runner that finds and executes tests, and provides assertions
- **React Testing Library** - Provides utilities for testing React components in a user-centric way
- **jest-dom** - Custom matchers for DOM element assertions
- **user-event** - Simulates user interactions more realistically than fireEvent

## Test Structure

Tests are organized into these categories:

- **Unit Tests** (`__tests__/unit/`) - Test individual functions and utilities in isolation
- **Component Tests** (`__tests__/components/`) - Test individual React components
- **Integration Tests** (`__tests__/integration/`) - Test interactions between components/features
- **Test Utils** (`__tests__/test-utils.tsx`) - Shared utilities, mocks, and renders for tests

## Best Practices

### 1. Use Testing Library's Recommended Queries

Query priority (from most to least recommended):

1. **Accessible Queries**: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. **Semantic Queries**: `getByAltText`, `getByTitle`
3. **Test IDs** (only when necessary): `getByTestId`

Example:

```tsx
// ✅ GOOD: Finds element by its role and accessible name
const button = screen.getByRole("button", { name: /submit/i });

// ❌ BAD: Uses implementation detail (className) to find element
const button = container.querySelector(".submit-button");
```

### 2. Use `findBy` Queries for Async Elements

When testing components that render asynchronously:

```tsx
// ✅ GOOD: Waits for element to appear
const element = await screen.findByText(/loaded content/i);

// ❌ BAD: May fail if element isn't immediately available
const element = screen.getByText(/loaded content/i);
```

### 3. Prefer `userEvent` over `fireEvent`

`userEvent` simulates real user interactions more accurately:

```tsx
// ✅ GOOD: Uses userEvent for realistic interactions
const user = userEvent.setup();
await user.type(input, "Hello");
await user.click(button);

// ❌ BAD: Lower-level events that don't fully simulate user behavior
fireEvent.change(input, { target: { value: "Hello" } });
fireEvent.click(button);
```

### 4. Follow the AAA Pattern

Structure tests with Arrange-Act-Assert:

```tsx
test("submits form with valid input", async () => {
	// Arrange
	renderWithProviders(<Form />);
	const input = screen.getByLabelText(/username/i);
	const button = screen.getByRole("button", { name: /submit/i });

	// Act
	await userEvent.type(input, "validUsername");
	await userEvent.click(button);

	// Assert
	expect(screen.getByText(/submission successful/i)).toBeInTheDocument();
});
```

### 5. Test Component Props and States

Test that components respond correctly to different props and states:

```tsx
test("applies correct styles based on active state", () => {
	const { rerender } = render(<Button active={true}>Click me</Button>);
	expect(screen.getByRole("button")).toHaveClass("bg-active");

	rerender(<Button active={false}>Click me</Button>);
	expect(screen.getByRole("button")).not.toHaveClass("bg-active");
});
```

### 6. Test Edge Cases

Don't just test the happy path. Include tests for:

- Empty states
- Error states
- Loading states
- Boundary conditions
- Invalid inputs

### 7. Keep Tests Isolated

Each test should:

- Clean up after itself
- Not depend on other tests
- Reset mocks between tests

### 8. Test Accessibility

Verify that components are accessible:

```tsx
test("button is accessible", () => {
	render(<Button aria-label="Close dialog">×</Button>);
	expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:ci
```

## Writing New Tests

1. Create test files with the `.test.tsx` extension
2. Place them in the appropriate directory based on the type of test
3. Import the component/function you're testing
4. Use `renderWithProviders` from `test-utils.tsx` instead of RTL's render
5. Write tests using the best practices outlined above

Example:

```tsx
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyComponent from "@/components/MyComponent";
import { renderWithProviders } from "../test-utils";

describe("MyComponent", () => {
	test("renders correctly", () => {
		renderWithProviders(<MyComponent />);
		expect(screen.getByRole("heading")).toHaveTextContent("My Component");
	});

	test("responds to user interaction", async () => {
		const user = userEvent.setup();
		renderWithProviders(<MyComponent />);
		await user.click(screen.getByRole("button"));
		expect(screen.getByText("Clicked!")).toBeInTheDocument();
	});
});
```

## Mocking

### Components

```tsx
jest.mock("@/components/SomeComponent", () => {
	return function MockComponent(props) {
		return <div data-testid="mocked-component">{props.children}</div>;
	};
});
```

### Hooks

```tsx
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		// ... other router methods
	}),
	// ... other hooks
}));
```

### APIs

```tsx
jest.mock("@/utils/api", () => ({
	fetchData: jest.fn().mockResolvedValue({ success: true, data: [] }),
}));
```

## Debugging Tests

If a test is failing, you can debug using these techniques:

1. **Use screen.debug()**

   ```tsx
   renderWithProviders(<MyComponent />);
   screen.debug(); // Prints the DOM to console
   ```

2. **Log test queries**

   ```tsx
   console.log(screen.getByText("Submit").outerHTML);
   ```

3. **Run specific tests**

   ```bash
   npm test -- -t "name of your test"
   ```

4. **Use Jest's debugging capabilities**
   Add a `debugger` statement in your test and run with:
   ```bash
   node --inspect-brk node_modules/.bin/jest --runInBand
   ```

## Continuous Integration

Our CI pipeline runs all tests on:

- Pull requests
- Merges to main branch

Tests must pass before code can be merged.

Coverage thresholds are set in `jest.config.js` and enforced by CI.

---

Remember: Tests are an investment in the project's future. They prevent regressions, document behavior, and make it safer to refactor code.
