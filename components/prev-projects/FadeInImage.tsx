import React, { useEffect, useRef } from "react";
import Image from "next/image";
type FadeInImageValues = {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
  lazy?: boolean;
};

const FadeInImage: React.FC<FadeInImageValues> = ({ src, alt, width, height, className, lazy }) => {
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("opacity-100", "translate-y-0");
					}
				});
			},
			{ threshold: 0.1 },
		);
		if (imgRef.current) {
			observer.observe(imgRef.current);
		}
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={imgRef} className="opacity-0 translate-y-4 transition-all duration-1000 east-in-out ">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
        loading={lazy ? "lazy" : "eager"}
				className={`fade-in-effect rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ${className}`}
			/>
		</div>
	);
};

export default FadeInImage;
