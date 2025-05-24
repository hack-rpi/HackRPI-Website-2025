// Mock implementation of jQuery for testing
const mockAutocomplete = jest.fn();
const mockOn = jest.fn();
const mockVal = jest.fn().mockReturnValue("");

const mockJQuery = jest.fn((selector) => ({
	autocomplete: mockAutocomplete,
	on: mockOn,
	val: mockVal,
}));

// Expose the mock functions for test access
mockJQuery.mockAutocomplete = mockAutocomplete;
mockJQuery.mockOn = mockOn;
mockJQuery.mockVal = mockVal;

module.exports = mockJQuery;
