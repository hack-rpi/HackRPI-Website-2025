import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
	return (
		<HackRPILink
			href="https://events.mlh.io/events/12668-hackrpi-2025"
			className={`${className}  px-4 py-2 inline-block`}
			target="_blank"
		>
			<span className="block shift:hidden">Register Here!</span>
			<span className="hidden shift:block">Register!</span>
		</HackRPILink>
	);
}
