/**
 * DOM-related test helpers that can be used with both Jest and Playwright
 */

type DOMElement = HTMLElement | Element | null;

/**
 * Checks if an element has a specific CSS class
 * Works in both Jest and Playwright test environments
 */
export function hasClass(element: DOMElement, className: string): boolean {
	if (!element) return false;
	return element.classList.contains(className);
}

/**
 * Gets text content from an element, normalizing whitespace
 * Works in both Jest and Playwright test environments
 */
export function getTextContent(element: DOMElement): string {
	if (!element) return "";
	const text = element.textContent || "";
	return text.trim().replace(/\s+/g, " ");
}

/**
 * Checks if an element is visible in the DOM
 * Works in both Jest and Playwright test environments
 */
export function isVisible(element: DOMElement): boolean {
	if (!element) return false;

	const style = window.getComputedStyle(element as HTMLElement);

	return (
		style.display !== "none" &&
		style.visibility !== "hidden" &&
		style.opacity !== "0" &&
		(element as HTMLElement).offsetWidth > 0 &&
		(element as HTMLElement).offsetHeight > 0
	);
}

/**
 * Extracts table data as a structured array
 * Works in both Jest and Playwright test environments
 */
export function getTableData(table: DOMElement): string[][] {
	if (!table) return [];

	const rows = table.querySelectorAll("tr");
	const data: string[][] = [];

	rows.forEach((row) => {
		const rowData: string[] = [];
		const cells = row.querySelectorAll("th, td");

		cells.forEach((cell) => {
			rowData.push(getTextContent(cell));
		});

		if (rowData.length > 0) {
			data.push(rowData);
		}
	});

	return data;
}

/**
 * Gets all accessible text from an element and its children
 * Useful for accessibility testing in both environments
 */
export function getAllAccessibleText(element: DOMElement): string {
	if (!element) return "";

	// Get text from element itself
	let text = getTextContent(element);

	// Get text from aria-label if present
	const ariaLabel = element.getAttribute("aria-label");
	if (ariaLabel) {
		text += " " + ariaLabel;
	}

	// Get text from alt attributes on images
	const images = element.querySelectorAll("img");
	images.forEach((img) => {
		const alt = img.getAttribute("alt");
		if (alt) {
			text += " " + alt;
		}
	});

	return text.trim();
}

/**
 * Checks if an element is a focusable interactive element
 */
export function isInteractive(element: DOMElement): boolean {
	if (!element) return false;

	const interactiveTags = ["a", "button", "input", "select", "textarea"];
	const tag = element.tagName.toLowerCase();

	if (interactiveTags.includes(tag)) return true;

	const role = element.getAttribute("role");
	const interactiveRoles = ["button", "link", "checkbox", "menuitem", "tab"];

	if (role && interactiveRoles.includes(role)) return true;

	return element.hasAttribute("tabindex") && element.getAttribute("tabindex") !== "-1";
}
