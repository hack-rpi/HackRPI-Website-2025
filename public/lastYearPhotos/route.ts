import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";

const VALID = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function naturalKey(name: string) {
	return name
		.toLowerCase()
		.split(/(\d+)/)
		.map((p) => (/\d+/.test(p) ? Number(p) : p));
}

export async function GET() {
	try {
		const dir = path.join(process.cwd(), "public", "lastYearPhotos");
		const entries = await fs.readdir(dir, { withFileTypes: true });

		const files = entries
			.filter((e) => e.isFile())
			.map((e) => e.name)
			.filter((n) => VALID.has(path.extname(n).toLowerCase()))
			.sort((a, b) => {
				const ak = naturalKey(a);
				const bk = naturalKey(b);
				const len = Math.max(ak.length, bk.length);
				for (let i = 0; i < len; i++) {
					const av = ak[i];
					const bv = bk[i];
					if (av === undefined) return -1;
					if (bv === undefined) return 1;
					if (av === bv) continue;
					if (typeof av === "number" && typeof bv === "number") return av - bv;
					if (typeof av === "number") return -1;
					if (typeof bv === "number") return 1;
					return av < bv ? -1 : 1;
				}
				return 0;
			});

		// Return URLs relative to public/
		const urls = files.map((f) => `/lastYearPhotos/${f}`);
		return NextResponse.json({ photos: urls });
	} catch (err: any) {
		console.error("Error reading lastYearPhotos:", err);
		return NextResponse.json({ error: "Failed to load photos" }, { status: 500 });
	}
}
