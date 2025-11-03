import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
	return (
		<HackRPILink
			href="https://hackrpi2025.devpost.com/"
			className={`${className}  px-4 py-2 inline-block`}
			target="_blank"
		>
			<span className="block shift:hidden">Register Here!</span>
			<span className="hidden shift:block">Register!</span>
		</HackRPILink>
	);
}
