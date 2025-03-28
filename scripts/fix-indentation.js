#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Files with known indentation issues
const problematicFiles = ["app/2048/page.tsx", "components/game/tile.tsx"];

console.log("🔧 Fixing indentation issues in problematic files...");

problematicFiles.forEach((file) => {
	const fullPath = path.join(process.cwd(), file);

	if (fs.existsSync(fullPath)) {
		console.log(`📝 Processing ${file}...`);

		try {
			// Read the file
			let content = fs.readFileSync(fullPath, "utf8");

			// Fix indentation - replace sequences of spaces at the beginning of lines
			// with the correct number of tabs based on indentation level
			const lines = content.split("\n");
			const fixedLines = lines.map((line) => {
				// Count leading spaces
				const match = line.match(/^(\s+)/);
				if (match) {
					const spaces = match[1];
					const tabCount = Math.floor(spaces.length / 2); // Assuming 2 spaces per tab
					return "\t".repeat(tabCount) + line.trimLeft();
				}
				return line;
			});

			// Write back the fixed content
			fs.writeFileSync(fullPath, fixedLines.join("\n"), "utf8");

			// Run prettier on the file to ensure consistency
			execSync(`npx prettier --write --tab-width=2 --use-tabs "${fullPath}"`, { stdio: "inherit" });

			console.log(`✅ Fixed indentation in ${file}`);
		} catch (error) {
			console.error(`❌ Error fixing ${file}:`, error.message);
		}
	} else {
		console.warn(`⚠️ File not found: ${file}`);
	}
});

console.log("✅ Indentation fixes completed!");
