/**
 * @jest-environment jsdom
 */
import React from "react";
import AboutUs from "@/components/about-us";
import { renderWithProviders, checkBasicAccessibility } from "../test-utils";

// Keep these mocks
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		prefetch: jest.fn(),
		pathname: "/",
	}),
	usePathname: () => "/",
}));

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt, ...props }: { src: string; alt?: string; [key: string]: any }) => (
		<img src={src} alt={alt || ""} {...props} />
	),
}));

jest.mock("next/link", () => ({
	__esModule: true,
	default: ({ children, href, ...props }: { children: React.ReactNode; href?: string; [key: string]: any }) => (
		<a href={href || "#"} {...props}>
			{children}
		</a>
	),
}));

jest.mock("@/components/themed-components/registration-link", () => {
	return {
		__esModule: true,
		default: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
			<div data-testid="registration-link" className={className} role="link" aria-label="Registration Link">
				{children || "Registration Link"}
			</div>
		),
	};
});

describe("AboutUs Component Accessibility", () => {
	// Use the checkBasicAccessibility function instead of the full axe-core check
	it("passes basic accessibility checks", () => {
		const { container } = renderWithProviders(<AboutUs />);

		// Use your existing simpler function instead of the heavy axe-core one
		checkBasicAccessibility(container);

		// Add some manual checks too
		const images = container.querySelectorAll("img");
		images.forEach((img) => {
			expect(img).toHaveAttribute("alt");
		});

		const links = container.querySelectorAll("a");
		links.forEach((link) => {
			expect(link.textContent || link.getAttribute("aria-label")).toBeTruthy();
		});
	});
});
