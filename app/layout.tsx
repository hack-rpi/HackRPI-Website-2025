import { Metadata } from "next";
import Script from 'next/script';

export const metadata: Metadata = {
	title: "HackRPI 2025",
	description:
		"HackRPI is RPI&apos;s annual intercollegiate hackathon hosted by students for students. Get swag and free food as you compete for exciting prizes! With a broad range of workshops and mentors on-site, there's no experience necessary to attend.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="hackrpi">
			<body>
				{children}
				<Script id="daisyui-theme-script" strategy="beforeInteractive">
					{`
					// This ensures the DaisyUI theme applies correctly
					document.documentElement.setAttribute('data-theme', 'hackrpi');
					`}
				</Script>
			</body>
		</html>
	);
}
