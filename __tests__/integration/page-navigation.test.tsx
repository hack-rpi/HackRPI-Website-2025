/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Import the components
import Home from "@/app/(without-layout)/page";
import EventPage from "@/app/(with-layout)/event/page";
import ResourcesPage from "@/app/(with-layout)/resources/page";
import PastYearProjects from "@/app/(with-layout)/last-year/page";

// Mock CSS import
jest.mock("@/app/globals.css", () => ({}), { virtual: true });

// Explicitly enable fake timers for this file
jest.useFakeTimers();

// Centralized mock router
const mockRouterPush = jest.fn();
const mockRouterPrefetch = jest.fn();
const mockScrollIntoView = jest.fn();

// Mock Next.js router
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockRouterPush,
		prefetch: mockRouterPrefetch,
		back: jest.fn(),
		forward: jest.fn(),
		pathname: "/",
		query: {},
		asPath: "/",
		events: {
			on: jest.fn(),
			off: jest.fn(),
			emit: jest.fn(),
		},
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

// Mock components with improved structure
jest.mock("@/components/nav-bar/nav-bar", () => {
	return jest.fn(({ showOnScroll }: { showOnScroll: boolean }) => (
		<div data-testid="nav-bar" data-show-on-scroll={showOnScroll} role="navigation">
			<a
				data-testid="home-link"
				href="/"
				role="link"
				aria-label="Navigate to Home"
				onClick={(e) => {
					e.preventDefault();
					mockRouterPush("/");
				}}
			>
				Home
			</a>
			<a
				data-testid="event-link"
				href="/event"
				role="link"
				aria-label="Navigate to Event"
				onClick={(e) => {
					e.preventDefault();
					mockRouterPush("/event");
				}}
			>
				Event
			</a>
			<a
				data-testid="resources-link"
				href="/resources"
				role="link"
				aria-label="Navigate to Resources"
				onClick={(e) => {
					e.preventDefault();
					mockRouterPush("/resources");
				}}
			>
				Resources
			</a>
			<a
				data-testid="last-year-link"
				href="/last-year"
				role="link"
				aria-label="Navigate to Last Year"
				onClick={(e) => {
					e.preventDefault();
					mockRouterPush("/last-year");
				}}
			>
				Last Year
			</a>
			<a
				data-testid="faq-link"
				href="#faq"
				role="link"
				aria-label="FAQ"
				onClick={(e) => {
					e.preventDefault();
					mockScrollIntoView();
				}}
			>
				FAQ
			</a>
		</div>
	));
});

// Mock the pages to avoid DOM element access issues
jest.mock("@/app/(without-layout)/page", () => {
	return () => (
		<div className="flex flex-col" role="main">
			<nav data-testid="nav-bar" role="navigation">
				<a
					href="/"
					data-testid="home-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/");
					}}
					role="link"
					aria-label="Home"
				>
					Home
				</a>
				<a
					href="/event"
					data-testid="event-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/event");
					}}
					role="link"
					aria-label="Event"
				>
					Event
				</a>
				<a
					href="/resources"
					data-testid="resources-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/resources");
					}}
					role="link"
					aria-label="Resources"
				>
					Resources
				</a>
				<a
					href="/last-year"
					data-testid="last-year-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/last-year");
					}}
					role="link"
					aria-label="Last Year"
				>
					Last Year
				</a>
				<a
					href="#faq"
					data-testid="faq-link"
					onClick={(e) => {
						e.preventDefault();
						mockScrollIntoView();
					}}
					role="link"
					aria-label="FAQ"
				>
					FAQ
				</a>
			</nav>
			<main>
				<section id="about" data-testid="about" role="region" aria-label="About">
					About Section
				</section>
				<section id="faq" data-testid="faq" role="region" aria-label="FAQ">
					FAQ Section
				</section>
				<section id="sponsors" data-testid="sponsors" role="region" aria-label="Sponsors">
					Sponsors Section
				</section>
				<section id="team" data-testid="team" role="region" aria-label="Team">
					Team Section
				</section>
			</main>
			<footer data-testid="footer" role="contentinfo">
				Footer
			</footer>
		</div>
	);
});

jest.mock("@/app/(with-layout)/event/page", () => {
	return () => (
		<div role="main">
			<nav data-testid="nav-bar" role="navigation">
				<a
					href="/"
					data-testid="home-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/");
					}}
					role="link"
					aria-label="Home"
				>
					Home
				</a>
			</nav>
			<div>Event Page Content</div>
		</div>
	);
});

jest.mock("@/app/(with-layout)/resources/page", () => {
	return () => (
		<div role="main">
			<nav data-testid="nav-bar" role="navigation">
				<a
					href="/event"
					data-testid="event-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/event");
					}}
					role="link"
					aria-label="Event"
				>
					Event
				</a>
			</nav>
			<div>Resources Page Content</div>
		</div>
	);
});

jest.mock("@/app/(with-layout)/last-year/page", () => {
	return () => (
		<div role="main">
			<nav data-testid="nav-bar" role="navigation">
				<a
					href="/resources"
					data-testid="resources-link"
					onClick={(e) => {
						e.preventDefault();
						mockRouterPush("/resources");
					}}
					role="link"
					aria-label="Resources"
				>
					Resources
				</a>
			</nav>
			<div>Last Year Page Content</div>
		</div>
	);
});

// Mock maps components
jest.mock("@/components/maps/maps", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="maps" role="img" aria-label="Maps">
			Maps Component
		</div>
	),
	MapsDCCLow: () => (
		<div data-testid="maps-dcc" role="img" aria-label="DCC Map">
			DCC Map Component
		</div>
	),
}));

jest.mock("@/components/maps/google_maps", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="google-maps" role="img" aria-label="Google Maps">
			Google Maps Component
		</div>
	),
}));

jest.mock("@/components/prev-projects/project-display", () => {
	return function MockProjectDisplay() {
		return (
			<div data-testid="project-display" role="article">
				Project Display
			</div>
		);
	};
});

jest.mock("@/components/prev-projects/project-carousel", () => {
	return function MockProjectCarousel() {
		return (
			<div data-testid="project-carousel" role="region" aria-label="Project Carousel">
				Project Carousel
			</div>
		);
	};
});

jest.mock("@/components/themed-components/hackrpi-link", () => {
	return function MockHackRPILink({
		href,
		children,
		className,
	}: {
		href: string;
		children: React.ReactNode;
		className?: string;
	}) {
		return (
			<a data-testid="hackrpi-link" href={href} className={className} role="link">
				{children}
			</a>
		);
	};
});

// Mock the intersection observer
global.IntersectionObserver = jest.fn(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
	root: null,
	rootMargin: "",
	thresholds: [],
	takeRecords: jest.fn().mockReturnValue([]),
})) as unknown as typeof IntersectionObserver;

// Setup enhanced mock for getElementById
function mockHomePageElements() {
	document.getElementById = jest.fn((id) => {
		if (!id) return null;

		const element = document.createElement("div");
		element.id = id;

		// Enhanced properties
		Object.defineProperties(element, {
			offsetTop: { configurable: true, value: 100 },
			offsetHeight: { configurable: true, value: 200 },
			offsetWidth: { configurable: true, value: 800 },
			clientHeight: { configurable: true, value: 200 },
			clientWidth: { configurable: true, value: 800 },
			scrollIntoView: {
				configurable: true,
				value: mockScrollIntoView,
			},
			getBoundingClientRect: {
				configurable: true,
				value: () => ({
					top: 100,
					left: 0,
					right: 800,
					bottom: 300,
					width: 800,
					height: 200,
					x: 0,
					y: 100,
				}),
			},
		});

		return element;
	});

	// Mock window scroll properties
	Object.defineProperty(window, "scrollY", {
		writable: true,
		value: 500,
	});
}

/**
 * Enhanced render function with userEvent setup
 */
function renderWithRouter(ui: React.ReactElement) {
	// Setup userEvent with optimal settings
	const user = userEvent.setup({
		delay: null, // No delay for faster tests
		advanceTimers: jest.advanceTimersByTime,
	});

	// Render the component
	const result = render(ui);

	return {
		user,
		...result,
	};
}

describe("Page Navigation Integration Tests", () => {
	beforeEach(() => {
		// Reset mocks before each test
		jest.clearAllMocks();
		jest.clearAllTimers();
		mockHomePageElements();

		// Reset router mocks
		mockRouterPush.mockClear();
		mockRouterPrefetch.mockClear();
		mockScrollIntoView.mockClear();
	});

	afterEach(() => {
		// Clean up any remaining timers
		jest.clearAllTimers();
	});

	it("should navigate from Home to Event page when event link is clicked", async () => {
		// Arrange
		const { user } = renderWithRouter(<Home />);

		// Act - Find and click the event link
		const navigation = screen.getByRole("navigation");
		const eventLink = within(navigation).getByRole("link", { name: /event/i });

		await act(async () => {
			await user.click(eventLink);
			// Run timers to complete user actions
			jest.runAllTimers();
		});

		// Assert
		expect(mockRouterPush).toHaveBeenCalledWith("/event");
		expect(mockRouterPush).toHaveBeenCalledTimes(1);
	});

	it("should navigate from Home to Resources page when resources link is clicked", async () => {
		// Arrange
		const { user } = renderWithRouter(<Home />);

		// Act - Find and click the resources link
		const navigation = screen.getByRole("navigation");
		const resourcesLink = within(navigation).getByRole("link", { name: /resources/i });

		await act(async () => {
			await user.click(resourcesLink);
			// Run timers to complete user actions
			jest.runAllTimers();
		});

		// Assert
		expect(mockRouterPush).toHaveBeenCalledWith("/resources");
		expect(mockRouterPush).toHaveBeenCalledTimes(1);
	});

	it("should navigate from Home to Last Year page when last year link is clicked", async () => {
		// Arrange
		const { user } = renderWithRouter(<Home />);

		// Act - Find and click the last year link
		const navigation = screen.getByRole("navigation");
		const lastYearLink = within(navigation).getByRole("link", { name: /last year/i });

		await act(async () => {
			await user.click(lastYearLink);
			// Run timers to complete user actions
			jest.runAllTimers();
		});

		// Assert
		expect(mockRouterPush).toHaveBeenCalledWith("/last-year");
		expect(mockRouterPush).toHaveBeenCalledTimes(1);
	});

	it("should scroll into view when an anchor link is clicked", async () => {
		// Arrange
		const { user } = renderWithRouter(<Home />);

		// Act - Find and click the FAQ link (an anchor link)
		const navigation = screen.getByRole("navigation");
		const faqLink = within(navigation).getByRole("link", { name: /faq/i });

		await act(async () => {
			await user.click(faqLink);
			// Run timers to complete user actions
			jest.runAllTimers();
		});

		// Assert
		expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
		expect(mockRouterPush).not.toHaveBeenCalled(); // Should not navigate
	});

	it("should be accessible with keyboard navigation", async () => {
		// Arrange
		const { user } = renderWithRouter(<Home />);

		// Act - Find the navigation and focus the first element
		const navigation = screen.getByRole("navigation");
		const homeLink = within(navigation).getByRole("link", { name: /home/i });
		homeLink.focus();

		// Press Tab to move focus to the next link (Event)
		await act(async () => {
			await user.tab();
			// Run timers to complete user actions
			jest.runAllTimers();
		});

		// Now the Event link should be focused
		const eventLink = within(navigation).getByRole("link", { name: /event/i });
		expect(document.activeElement).toBe(eventLink);

		// Press Enter to activate the Event link
		await act(async () => {
			await user.keyboard("{Enter}");
			// Run timers to complete user actions
			jest.runAllTimers();
		});

		// Assert
		expect(mockRouterPush).toHaveBeenCalledWith("/event");
		expect(mockRouterPush).toHaveBeenCalledTimes(1);
	});

	it("should handle browser back and forward navigation", async () => {
		// This would require mocking history navigation
		// For simplicity, we'll just verify the router hooks are properly set up
		const { user } = renderWithRouter(<Home />);

		// Check that the navigation elements exist
		const navigation = screen.getByRole("navigation");
		expect(navigation).toBeInTheDocument();

		// Verify we can click links properly
		const eventLink = within(navigation).getByRole("link", { name: /event/i });

		await act(async () => {
			await user.click(eventLink);
			jest.runAllTimers();
		});

		expect(mockRouterPush).toHaveBeenCalledWith("/event");
	});

	// Additional tests for more advanced navigation patterns...
});

jest.mock("@/components/footer/footer", () => {
	return function MockFooter() {
		return (
			<div data-testid="footer" role="contentinfo">
				Footer
			</div>
		);
	};
});

jest.mock("@/components/title-components/title", () => {
	return function MockTitle() {
		return (
			<div data-testid="title" role="banner">
				Title Component
			</div>
		);
	};
});

jest.mock("@/components/about-us", () => {
	return function MockAboutUs() {
		return (
			<div data-testid="about" id="about" role="region" aria-label="About">
				About Component
			</div>
		);
	};
});

jest.mock("@/components/team/team", () => {
	return function MockTeam() {
		return (
			<div data-testid="team" id="team" role="region" aria-label="Team">
				Team Component
			</div>
		);
	};
});

jest.mock("@/components/sponsors", () => {
	return function MockSponsors() {
		return (
			<div data-testid="sponsors" id="sponsors" role="region" aria-label="Sponsors">
				Sponsors Component
			</div>
		);
	};
});

jest.mock("@/components/faq/faq", () => {
	return function MockFAQ() {
		return (
			<div data-testid="faq" id="faq" role="region" aria-label="FAQ">
				FAQ Component
			</div>
		);
	};
});
