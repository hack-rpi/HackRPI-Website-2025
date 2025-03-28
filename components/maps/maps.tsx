"use client";
import React, { useState } from "react";
import DCC from "@/public/maps_img/DCC.png";
import LOW from "@/public/maps_img/LOW.png";
import "@/app/globals.css";
import NextImg from "next/image";
import HackRPIButton from "@/components/themed-components/hackrpi-button";

const MapsDCCLow = () => {
	const [showDCC, setShowDCC] = useState(true);
	const [showLOW, setShowLOW] = useState(false);

	const handleShowDCC = () => {
		setShowDCC(true);
		setShowLOW(false);
	};

	const handleShowLOW = () => {
		setShowDCC(false);
		setShowLOW(true);
	};

	return (
		<div className="p-2 flex flex-col items-center justify-center w-full">
			<div id="maps" className="text-center flex items-center justify-center flex-col w-full">
				<div className="mt-2 mb-2 max-w-[800px] w-full">
					<div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4 mb-4 desktop:h-24">
						<HackRPIButton
							onClick={handleShowDCC}
							active={showDCC}
							className="text-2xl w-full h-full flex items-center justify-center text-white"
						>
							Darrin Communications Center
						</HackRPIButton>

						<HackRPIButton
							onClick={handleShowLOW}
							active={showLOW}
							className="text-2xl w-full h-full flex items-center justify-center text-white"
						>
							Low Center for Industrial Innovation
						</HackRPIButton>
					</div>
					{showDCC && <NextImg src={DCC} alt="DCC Image" className="w-full" />}
					{showLOW && <NextImg src={LOW} alt="LOW Image" className="w-full" />}
				</div>
			</div>
		</div>
	);
};

export default MapsDCCLow;
