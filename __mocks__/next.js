// Mock for Next.js metadata and other components
import React from "react";

// Mock the Metadata type
export const Metadata = {};

// Mock default export (for imports like 'import Head from "next/head"')
export default function Head({ children }) {
	return <>{children}</>;
}

// Add any other Next.js components that need to be mocked
export const useRouter = jest.fn().mockReturnValue({
	push: jest.fn(),
	replace: jest.fn(),
	back: jest.fn(),
});
