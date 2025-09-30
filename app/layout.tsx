import { Metadata } from "next";
import "./globals.css";

// Create a conditional metadata object based on environment
export const metadata: Metadata = {
	title: "HackRPI 2025",
	description:
		"HackRPI is RPI&apos;s annual intercollegiate hackathon hosted by students for students. Get swag and free food as you compete for exciting prizes! With a broad range of workshops and mentors on-site, there's no experience necessary to attend.",
	...(process.env.NODE_ENV !== "test" && {
		openGraph: {
			title: "HackRPI 2025",
			description: "HackRPI is RPI's annual intercollegiate hackathon hosted by students for students.",
			url: "https://hackrpi.com",
			siteName: "HackRPI",
			images: [
				{
					url: "/banner.png",
					width: 1200,
					height: 630,
					alt: "HackRPI 2025 Banner",
				},
			],
			locale: "en_US",
			type: "website",
		},
	}),
};

import ClientLayout from "@/app/client-layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
