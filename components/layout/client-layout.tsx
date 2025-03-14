"use client";

import NavBar from "@/components/nav-bar/nav-bar";
import Footer from "@/components/footer/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar showOnScroll={true} />
			<main>{children}</main>
			<Footer />
		</>
	);
}
