import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
	return (
		<HackRPILink
			href="https://hackrpi2025.devpost.com/"
			className={`${className} pl-2 pr-5 py-2`}
			target="_blank"
		>
			Register Here!
		</HackRPILink>
	);
}
