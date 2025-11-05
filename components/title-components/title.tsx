"use client";

import { useEffect, useState } from "react";
import DesktopTitleComponent from "./desktop-title";
import MobileTitleComponent from "./mobile-title";

export default function TitleComponent() {
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const shouldRenderMobile = windowWidth !== null && windowWidth <= 860;

	return (
		<section data-testid="hero-section" className="w-full">
			{shouldRenderMobile ? <MobileTitleComponent /> : <DesktopTitleComponent />}
		</section>
	);
}
