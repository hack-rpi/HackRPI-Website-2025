"use client";

import NavBar from "@/components/nav-bar/nav-bar";
import Footer from "@/components/footer/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
      {/* TODO: set to true if this is main file*/}
			<NavBar showOnScroll={false} />
			<main>{children}</main>
			<Footer />
		</>
	);
}
