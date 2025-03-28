/** @type {import('jest').Config} */
const config = {
	testEnvironment: "jsdom",
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/.next/",
		"<rootDir>/amplify/",
		"<rootDir>/__tests__/test-utils.tsx",
		"<rootDir>/e2e/", // Explicitly exclude all Playwright E2E tests to avoid conflicts
	],
	// Add specific test match patterns to only include actual test files
	testMatch: ["**/__tests__/**/*test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	// Switch to V8 coverage provider for better performance and compatibility
	coverageProvider: "v8",
	moduleNameMapper: {
		// Handle module aliases
		"^@/(.*)$": "<rootDir>/$1",

		// Handle CSS imports (with CSS modules)
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

		// Handle CSS imports (without CSS modules)
		"^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

		// Target specific directories and file patterns first for better precision
		"^@/public/(.+)\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
		"^@/assets/(.+)\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
		"^@/images/(.+)\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",

		// Generic fallback for any other image imports
		"^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
	},
	transform: {
		// Use babel-jest for JS/JSX/TS/TSX files
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest"],
	},
	transformIgnorePatterns: ["/node_modules/(?!(@aws-amplify|aws-amplify|@2toad/profanity)/)"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/.next/**",
		"!**/coverage/**",
		"!**/*.config.js",
		"!**/amplify/**",
	],
	testTimeout: 10000, // Increase test timeout to 10 seconds
	// Enable fake timers globally for more consistent behavior
	fakeTimers: {
		enableGlobally: true,
		// Use modern timers implementation
		legacyFakeTimers: false,
		// Set a realistic default timer delay that works with React
		timerLimit: 5000,
	},
	// Add watch plugins for better developer experience
	watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
	// Performance optimizations
	maxWorkers: "50%", // Use half the available CPU cores for parallel testing
	bail: 5, // Stop running tests after 5 failures
	cache: true, // Enable caching
	// Set a higher default timeout for all tests
	testTimeout: 15000,
	// Add additional reporters for better output
	reporters: ["default", ["jest-junit", { outputDirectory: "./coverage", outputName: "junit.xml" }]],
	// Add a CI mode detector
	ci: process.env.CI === "true",
	// Enable verbose output for easier debugging
	verbose: true,
	// Specify global "threshold" for coverage report
	coverageThreshold: {
		global: {
			statements: 20, // Start with achievable target based on current 22.79%
			branches: 15, // Start with achievable target based on current 20.05%
			functions: 10, // Start with achievable target based on current 14.65%
			lines: 20, // Start with achievable target based on current 23.59%
		},
		// Add specific thresholds for critical files
		"./app/actions.ts": {
			statements: 80,
			branches: 70,
			functions: 80,
			lines: 80,
		},
		"./utils/timer.ts": {
			statements: 90,
			branches: 80,
			functions: 90,
			lines: 90,
		},
		"./utils/schedule.ts": {
			statements: 90,
			branches: 80,
			functions: 90,
			lines: 90,
		},
	},
};

module.exports = config;
