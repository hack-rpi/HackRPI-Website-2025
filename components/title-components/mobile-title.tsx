"use client";

import TitleText from "./mobile-title-text";
import RegistrationButton from "@/components/themed-components/registration-link";

export default function MobileTitleComponent() {
	return (
		<div className="w-full flex flex-col items-center justify-start space-y-6 p-4">
			{/* Skyline box / main title */}
			<div className="w-full max-w-[700px]">
				<TitleText />
			</div>

			{/* Registration button below everything */}
			<div className="w-full flex justify-center">
				<RegistrationButton className="text-[28px] px-6 py-3" />
			</div>
		</div>
	);
}
