import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
	return (
		<HackRPILink
			href="https://events.mlh.io/events/12668-hackrpi-2025"
			className={`${className} pl-2 pr-5 py-2`}
			target="_blank"
		>
			Register Here!
		</HackRPILink>
	);
}
