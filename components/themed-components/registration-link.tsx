import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
	return (
		<HackRPILink
			href="https://hackrpi2024.devpost.com/project-gallery"
			className={`${className}  px-4 py-2`}
			target="_blank"
		>
			<span className="hidden [@media(max-width:500px)]:inline">Register!</span>
      		<span className="inline [max-width:500px]:hidden">Register Here!</span>
		</HackRPILink>
	);
}
