import "../app/globals.css";
import { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar/nav-bar";
import TitleComponent from "@/components/title-components/title";

export default function Home() {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="h-screen overflow-x-hidden overflow-y-visible">
			<NavBar />
			<TitleComponent />
		</div>
	);
}
