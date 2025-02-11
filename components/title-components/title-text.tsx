import { useState, useEffect } from "react";
import RegistrationButton from "@/components/themed-components/registration-link";

export default function TitleText() {
	const [year, setYear] = useState(1824);

	// This kinda works, we may want to add a delay before this starts counting
	// We may also want to make the count ease in and out
	useEffect(() => {
		const startCounting = setTimeout(() => {
			const target = 2024;

			const interval = setInterval(() => {
				setYear((prev) => {
					if (prev < target) return prev + 1;
					else {
						clearInterval(interval);
						return prev;
					}
				});
			}, 10);

			return () => clearInterval(interval);
		}, 700);

		return () => clearTimeout(startCounting);
	}, [year]);

	return (
		<div className="w-full font-sans  text-left flex items-start justify-center flex-col mb-8">
			<h1 className="w-full text-5xl 2xs:text-7xl sm:text-8xl 2xl:text-9xl font-bold font-neutral">HACKRPI</h1>
			<h2>
				<span className="w-full text-4xl sm:text-[3.5rem] 2xl:text-7xl whitespace-nowrap h-14 2xl:h-20 font-retro">Retro </span>
				<span className="w-full text-4xl sm:text-[3.5rem] 2xl:text-7xl whitespace-nowrap h-14 2xl:h-20 font-neutral font-bold">V. </span>
				<span className="w-full text-4xl sm:text-[3.5rem] 2xl:text-7xl whitespace-nowrap h-14 2xl:h-20 font-modern">Modern</span>
			</h2>
			<p className={`w-full text-3xl sm:text-4xl 2xl:text-5xl mb-8`}>
				November 9-10, <span onMouseEnter={() => setYear(1824)}>{year}</span>
			</p>
			<RegistrationButton className="text-3xl" />
		</div>
	);
}
