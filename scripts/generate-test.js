#!/usr/bin/env node
/**
 * Test Generator Script for HackRPI Website
 *
 * Usage:
 *   node scripts/generate-test.js ComponentName [type]
 *
 * Where:
 *   ComponentName: Name of the component to test (required)
 *   type: Type of test - component, integration, or unit (default: component)
 *
 * Examples:
 *   node scripts/generate-test.js Button
 *   node scripts/generate-test.js NavBar integration
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get command line arguments
const componentName = process.argv[2];
const testType = process.argv[3] || "component";

if (!componentName) {
	console.error("Error: Component name is required");
	console.log("Usage: node scripts/generate-test.js ComponentName [type]");
	process.exit(1);
}

// Map test type to directory
const testTypeToDir = {
	component: "components",
	integration: "integration",
	unit: "unit",
};

const targetDir = testTypeToDir[testType];

if (!targetDir) {
	console.error(`Error: Invalid test type: ${testType}`);
	console.log("Valid types are: component, integration, unit");
	process.exit(1);
}

// Determine template file path
let templatePath;
if (testType === "component") {
	templatePath = path.resolve(__dirname, "../__tests__/components/template.test.tsx");
} else if (testType === "integration") {
	templatePath = path.resolve(__dirname, "../__tests__/integration/template.test.example.tsx");
} else {
	templatePath = path.resolve(__dirname, "../__tests__/unit/template.test.example.tsx");
}

// Check if template exists
if (!fs.existsSync(templatePath)) {
	console.error(`Error: Template file not found: ${templatePath}`);
	console.log("Creating a basic template...");
	templatePath = path.resolve(__dirname, "../__tests__/components/template.test.tsx");

	if (!fs.existsSync(templatePath)) {
		console.error("Error: No template file found. Please create a template test file first.");
		process.exit(1);
	}
}

// Determine import path based on component name and test type
const determineImportPath = (name, type) => {
	// Convert component name to kebab case if needed
	const kebabName = name
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/\s+/g, "-")
		.toLowerCase();

	if (type === "component") {
		return `@/components/${kebabName}`;
	} else if (type === "unit") {
		return `@/utils/${kebabName}`;
	} else {
		// For integration tests, default to page components
		return `@/app/${kebabName}/page`;
	}
};

// Read template file
const templateContent = fs.readFileSync(templatePath, "utf8");

// Customize template content
let customizedContent = templateContent
	.replace(/YourComponent/g, componentName)
	.replace(/Example Component/g, componentName)
	.replace(
		/\/\/ import YourComponent from ".*";/,
		`import ${componentName} from "${determineImportPath(componentName, testType)}";`,
	)
	.replace(/template\.test\.example/g, `${componentName.toLowerCase()}.test`);

// Create the test file
const testFileName = `${componentName.toLowerCase()}.test.tsx`;
const testFilePath = path.resolve(__dirname, `../__tests__/${targetDir}/${testFileName}`);

// Check if file already exists
if (fs.existsSync(testFilePath)) {
	console.error(`Error: Test file already exists: ${testFilePath}`);
	const overwrite = process.argv.includes("--force");

	if (!overwrite) {
		console.log("Use --force to overwrite the existing file");
		process.exit(1);
	}

	console.log("Overwriting existing file...");
}

// Ensure directory exists
const testDir = path.dirname(testFilePath);
if (!fs.existsSync(testDir)) {
	fs.mkdirSync(testDir, { recursive: true });
}

// Write the file
fs.writeFileSync(testFilePath, customizedContent);
console.log(`Created test file: ${testFilePath}`);

// Format the file with Prettier if available
try {
	execSync(`npx prettier --write ${testFilePath}`);
	console.log("Formatted test file with Prettier");
} catch (error) {
	console.log("Note: Prettier not available for formatting");
}

console.log(`
Next steps:
1. Edit the test file to match your component's behavior
2. Run the test with: npm test -- -t "${componentName}"
3. Add the test file to git: git add ${testFilePath}
`);
