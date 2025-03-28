import "@testing-library/jest-dom";

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
			toHaveAttribute(attr: string, value?: unknown): R;
			toHaveClass(...classNames: string[]): R;
			toHaveStyle(css: Record<string, any>): R;
			toBeVisible(): R;
			toBeDisabled(): R;
			toBeEnabled(): R;
			toBeEmptyDOMElement(): R;
			toHaveTextContent(text: string | RegExp): R;
			toHaveValue(value: string | string[] | number): R;
			toBeChecked(): R;
			toBePartiallyChecked(): R;
			toHaveFocus(): R;
		}
	}
}
