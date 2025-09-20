import { test, expect } from "@playwright/test";

/**
 * Performance and Core Web Vitals tests for HackRPI website
 * Ensures the site meets modern performance standards
 */
test.describe("Performance Metrics", () => {
	test("homepage meets Core Web Vitals thresholds", async ({ page }) => {
		// Navigate and wait for full load
		await page.goto("/", { waitUntil: "networkidle" });
		
		// Measure Core Web Vitals
		const metrics = await page.evaluate<{
			lcp: number; fid: number; cls: number; ttfb: number; fcp: number;
		}>(() => {
			return new Promise((resolve) => {
				// Largest Contentful Paint
				let lcp = 0;
				new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lastEntry = entries[entries.length - 1] as any;
					lcp = lastEntry?.startTime || 0;
				}).observe({ type: "largest-contentful-paint", buffered: true });
				
				// First Input Delay (simulated)
				let fid = 0;
				
				// Cumulative Layout Shift
				let cls = 0;
				new PerformanceObserver((list) => {
					for (const entry of list.getEntries() as any[]) {
						if (!entry.hadRecentInput) {
							cls += entry.value || 0;
						}
					}
				}).observe({ type: "layout-shift", buffered: true });
				
				// Time to First Byte
				const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
				
				// First Contentful Paint
				const fcp = (performance.getEntriesByName("first-contentful-paint")[0] as any)?.startTime || 0;
				
				// Wait a bit for metrics to stabilize
				setTimeout(() => {
					resolve({ lcp, fid, cls, ttfb, fcp });
				}, 3000);
			});
		});
		
		// Assert Core Web Vitals are within acceptable ranges (allow more headroom in CI)
		expect(metrics.lcp).toBeLessThan(3000); // LCP < 3.0s
		expect(metrics.cls).toBeLessThan(0.1); // Good CLS: < 0.1
		expect(metrics.ttfb).toBeLessThan(800); // Good TTFB: < 0.8s
		expect(metrics.fcp).toBeLessThan(1800); // Good FCP: < 1.8s
	});

	test.fixme("schedule page loads within performance budget (Amplify client required)", async ({ page }) => {
		const startTime = Date.now();
		
		await page.goto("/event/schedule");
		await page.waitForSelector("[data-testid='schedule-container']");
		
		const loadTime = Date.now() - startTime;
		
		// Page should load within 3 seconds
		expect(loadTime).toBeLessThan(3000);
		
		// Check resource sizes
		const resourceSizes = await page.evaluate(() => {
			const resources = performance.getEntriesByType("resource");
			let totalJS = 0;
			let totalCSS = 0;
			let totalImages = 0;
			
			resources.forEach(resource => {
				const res: any = resource as any;
				const size = res.transferSize || 0;
				if (res.name.includes(".js")) totalJS += size;
				if (res.name.includes(".css")) totalCSS += size;
				if (res.name.match(/\.(jpg|jpeg|png|gif|webp|svg)/)) totalImages += size;
			});
			
			return {
				js: totalJS / 1024, // Convert to KB
				css: totalCSS / 1024,
				images: totalImages / 1024
			};
		});
		
		// Assert bundle sizes are reasonable
		expect(resourceSizes.js).toBeLessThan(700); // JS bundle < 700KB (CI-safe)
		expect(resourceSizes.css).toBeLessThan(100); // CSS < 100KB
		expect(resourceSizes.images).toBeLessThan(2000); // Images < 2MB
	});

	test.fixme("no memory leaks during navigation (heap API not stable across browsers)", async ({ page }) => {
		// Get initial memory usage
		const getMemoryUsage = () => page.evaluate(() => {
			if ('memory' in performance) {
				return (performance as any).memory.usedJSHeapSize;
			}
			return 0;
		});
		
		const initialMemory = await getMemoryUsage();
		
		// Navigate through multiple pages
		const pages = ["/", "/event", "/event/schedule", "/resources", "/"];
		
		for (const url of pages) {
			await page.goto(url);
			await page.waitForLoadState("networkidle");
		}
		
		// Force garbage collection if available
		await page.evaluate(() => {
			if (global.gc) global.gc();
		});
		
		// Check final memory usage
		const finalMemory = await getMemoryUsage();
		const memoryIncrease = finalMemory - initialMemory;
		
		// Memory increase should be minimal (< 10MB)
		expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
	});

	test("images are optimized and lazy loaded", async ({ page }) => {
		await page.goto("/");
		
		// Check for lazy loading attributes
		const lazyImages = await page.$$eval("img[loading='lazy']", imgs => imgs.length);
		const totalImages = await page.$$eval("img", imgs => imgs.length);
		
		// At least 50% of images should be lazy loaded
		expect(lazyImages).toBeGreaterThan(totalImages * 0.5);
		
		// Check for Next.js image optimization
		const optimizedImages = await page.$$eval("img[src*='/_next/image']", imgs => imgs.length);
		expect(optimizedImages).toBeGreaterThan(0);
		
		// Verify images have proper dimensions to prevent CLS
		const imagesWithoutDimensions = await page.$$eval("img", imgs => 
			imgs.filter(img => !img.width || !img.height).length
		);
		// Allow small number for decorative assets
		expect(imagesWithoutDimensions).toBeLessThanOrEqual(2);
	});

	test.fixme("critical CSS is inlined (Next.js app-router externalizes CSS)", async ({ page }) => {
		const response = await page.goto("/");
		const html = await response?.text() || "";
		
		// Check for inlined styles in head
		expect(html).toContain("<style");
		
		// Verify critical styles are present
		const hasInlinedStyles = await page.evaluate(() => {
			const styles = document.head.querySelectorAll("style");
			return styles.length > 0;
		});
		
		expect(hasInlinedStyles).toBe(true);
	});

	test.fixme("service worker caches resources (no SW configured)", async ({ page, context }) => {
		// Check if service worker is registered
		await page.goto("/");
		
		const hasServiceWorker = await page.evaluate(() => {
			return "serviceWorker" in navigator;
		});
		
		if (hasServiceWorker) {
			// Wait for service worker to be ready
			await page.evaluate(() => navigator.serviceWorker.ready);
			
			// Go offline
			await context.setOffline(true);
			
			// Try to navigate - should work with cache
			await page.goto("/event/schedule");
			
			// Page should still load from cache
			await expect(page.getByTestId("schedule-container")).toBeVisible();
			
			// Go back online
			await context.setOffline(false);
		}
	});
});
