import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
	return (
		<HackRPILink
			href="https://hackrpi2024.devpost.com/project-gallery"
			className={`${className}  px-4 py-2 inline-block`}
			target="_blank"
		>
			<span className="block shift:hidden">Register Here!</span>
			<span className="hidden shift:block">Register!</span>
		</HackRPILink>
	);
}
