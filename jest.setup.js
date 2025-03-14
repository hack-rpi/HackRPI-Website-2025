// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Polyfill for TextEncoder which is required by some dependencies
if (typeof TextEncoder === "undefined") {
	global.TextEncoder = require("util").TextEncoder;
}

// Filter deprecation warnings - add this block
const originalWarn = console.warn;
console.warn = function (...args) {
	// Filter out punycode deprecation warnings
	if (
		args[0] &&
		typeof args[0] === "string" &&
		args[0].includes("[DEP0040] DeprecationWarning: The `punycode` module is deprecated")
	) {
		return;
	}
	// Also filter out fake timer warnings since we've enabled them globally
	if (
		args[0] &&
		typeof args[0] === "string" &&
		args[0].includes("A function to advance timers was called but the timers APIs are not replaced with fake timers")
	) {
		return;
	}
	originalWarn.apply(console, args);
};

// Original console error function
const originalError = console.error;
console.error = function (...args) {
	// Filter out certain expected errors during testing
	if (
		typeof args[0] === "string" &&
		(args[0].includes("Not implemented: navigation") ||
			args[0].includes("Error: Uncaught") ||
			args[0].includes("Warning:") ||
			args[0].includes("React does not recognize the") ||
			// Filter out expected API errors in tests
			(args[0].includes("Error fetching leaderboard:") && process.env.NODE_ENV === "test") ||
			(args[0].includes("Error checking game status:") && process.env.NODE_ENV === "test") ||
			// Add metadata-related error filtering
			args[0].includes("Error: Metadata export is not available in Jest") ||
			args[0].includes("Cannot find module 'next/metadata'"))
	) {
		return;
	}
	originalError.apply(console, args);
};

// Mock for Next.js metadata API
jest.mock("next", () => {
	const originalNext = jest.requireActual("next");
	return {
		...originalNext,
		// Add mock for Metadata
		Metadata: {},
	};
});

// Do not try to mock non-existent modules
// Instead, use this approach which is safer
global.Metadata = {};
jest.mock("next/head", () => {
	return {
		__esModule: true,
		default: ({ children }) => {
			return <>{children}</>;
		},
	};
});

// Mock for window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock for window.scrollTo
window.scrollTo = jest.fn();

// Mock for Element.prototype.scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Enhanced IntersectionObserver mock that better simulates real behavior
global.IntersectionObserver = class IntersectionObserver {
	constructor(callback) {
		this.callback = callback;
		this.entries = new Map();
	}

	observe(element) {
		this.entries.set(element, {
			isIntersecting: false,
			target: element,
			intersectionRatio: 0,
		});

		// Schedule a call to simulate intersection
		setTimeout(() => {
			const entry = {
				isIntersecting: true,
				target: element,
				intersectionRatio: 1,
				boundingClientRect: element.getBoundingClientRect(),
				intersectionRect: element.getBoundingClientRect(),
				rootBounds: null,
				time: Date.now(),
			};
			this.entries.set(element, entry);
			this.callback([entry], this);
		}, 50);
	}

	unobserve(element) {
		this.entries.delete(element);
	}

	disconnect() {
		this.entries.clear();
	}

	// Method to manually trigger intersection
	triggerIntersection(element, isIntersecting = true) {
		if (!this.entries.has(element)) return;

		const entry = {
			isIntersecting,
			target: element,
			intersectionRatio: isIntersecting ? 1 : 0,
			boundingClientRect: element.getBoundingClientRect(),
			intersectionRect: isIntersecting ? element.getBoundingClientRect() : new DOMRect(),
			rootBounds: null,
			time: Date.now(),
		};

		this.entries.set(element, entry);
		this.callback([entry], this);
	}
};

// More complete router mock
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
		pathname: "/",
		query: {},
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
	useParams: () => ({}),
}));

// Better Image component mock that preserves all properties
jest.mock("next/image", () => ({
	__esModule: true,
	default: function MockNextImage(props) {
		// Remove loader and placeholder props that are Next.js specific
		const { loader, placeholder, ...rest } = props;
		return <img {...rest} data-testid="next-image" />;
	},
}));

// Mock AWS Amplify with more detailed implementation
jest.mock("aws-amplify", () => ({
	Amplify: {
		configure: jest.fn(),
	},
	Auth: {
		fetchAuthSession: jest.fn().mockResolvedValue({
			tokens: {
				accessToken: {
					payload: {},
				},
			},
		}),
		signOut: jest.fn().mockResolvedValue({}),
	},
}));

// Mock generateClient with more useful default implementation
jest.mock("aws-amplify/api", () => ({
	generateClient: jest.fn().mockReturnValue({
		models: {
			Leaderboard: {
				listByScore: jest.fn().mockResolvedValue({ data: [], errors: null }),
				create: jest.fn().mockResolvedValue({ errors: null }),
				delete: jest.fn().mockResolvedValue({ errors: null }),
			},
			event: {
				list: jest.fn().mockResolvedValue({ data: [], errors: null }),
				create: jest.fn().mockResolvedValue({ errors: null }),
				update: jest.fn().mockResolvedValue({ errors: null }),
				delete: jest.fn().mockResolvedValue({ errors: null }),
			},
		},
	}),
}));
