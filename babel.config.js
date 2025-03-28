module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
		["@babel/preset-react", { runtime: "automatic" }],
		["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
	],
	plugins: [
		// Add any Babel plugins here if needed
	],
};
