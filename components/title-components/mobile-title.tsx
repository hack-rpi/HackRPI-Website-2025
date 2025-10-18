"use client";

import TitleText from "./title-text";

export default function MobileTitleComponent() {
	return (
		<div className="w-full h-fit flex flex-col items-start justify-start mb-8 pl-8">
			<div className="h-28 w-full"></div>
			<TitleText />
		</div>
	);
}
