"use client";

import { useState, useEffect } from "react";

export default function TitleText() {
	const fullText = "HACK\u00A0\u00A0\u00A0RPI";
	const [displayedText, setDisplayedText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const typingSpeed = isDeleting ? 100 : 150;

		const handleTyping = setTimeout(() => {
			if (!isDeleting) {
				if (index < fullText.length) {
					setDisplayedText((prev) => prev + fullText[index]);
					setIndex((prev) => prev + 1);
				} else {
					return;
				}
			} else {
				if (index > 0) {
					setDisplayedText((prev) => prev.slice(0, -1));
					setIndex((prev) => prev - 1);
				} else {
					setIsDeleting(false);
				}
			}
		}, typingSpeed);

		return () => clearTimeout(handleTyping);
	}, [index, isDeleting]);

	return (
		<div className="pt-12">
			{/* Left side: Box with image */}
			<div
				className="bg-contain bg-center bg-no-repeat relative z-10 w-[90vw] h-[80vh] p-0 rounded-2xl overflow-hidden flex items-start justify-start"
				style={{ backgroundImage: "url('/cityscape_background_retro_modern.png')" }}
			>
				{/* Overlayed typing text */}
				<h1
					className="absolute text-[10vw] font-modern font-extrabold drop-shadow-lg text-white"
					style={{ top: "32%", left: "12%" }}
				>
					{displayedText}
					<span className="animate-pulse">|</span>
				</h1>

				<h1
					className="absolute text-[10vw] font-modern font-extrabold drop-shadow-lg text-white"
					style={{ top: "32%", left: "12.2%" }}
				>
					{displayedText}
					<span className="animate-pulse">|</span>
				</h1>

				<h1
					className="absolute text-[10vw] font-modern font-extrabold drop-shadow-lg text-retro-purple-medium"
					style={{ top: "32%", left: "12.4%" }}
				>
					{displayedText}
					<span className="animate-pulse">|</span>
				</h1>

				<h1>
					<span
						className="absolute text-[4vw] font-modern font-extrabold drop-shadow-lg text-white"
						style={{ top: "90%", left: "10%" }}
						data-testid="event-date"
					>
						November 15-16, 2025 &#8226; Troy, NY
					</span>
				</h1>
				<h1>
					<span
						className="absolute text-[5vw] font-modern font-extrabold drop-shadow-lg text-white"
						style={{ top: "43%", left: "26%" }}
					>
						Retro V. Modern
					</span>
				</h1>
			</div>
		</div>
	);
}
