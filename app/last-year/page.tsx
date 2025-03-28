"use client";

import React from "react";
import "@/app/globals.css";
import Footer from "../../components/footer/footer";
import NavBar from "@/components/nav-bar/nav-bar";
import ProjectDisplay from "@/components/prev-projects/project-display";
import { podiumPrizes, carouselPrizes } from "@/data/previous-prize-winners";
import ProjectCarousel from "@/components/prev-projects/project-carousel";
import HackRPILink from "@/components/themed-components/hackrpi-link";
import Image from "next/image";

export default function PastYearProjects() {
	const topProjects = podiumPrizes.slice(0, 3);

	return (
		<div className="w-full flex items-center justify-center flex-col" id="winners">
			<NavBar showOnScroll={false} />
			<div className="w-11/12 lg:w-3/4 xl:w-2/3 pt-8 flex flex-col items-center justify-center">
				<h2 className="text-3xl font-bold text-center mb-8 pt-20">Previous Projects From HackRPI XI</h2>
				<HackRPILink href="/last-year#photos" className="text-2xl px-6 py-2 m-2">
					Jump to Photos
				</HackRPILink>
				<div className="grid grid-cols-1 gap-8 mx-auto">
					{topProjects.map((project, index) => (
						<div key={index}>
							<ProjectDisplay {...project} />
							{index < topProjects.length - 1 && (
								<hr className="my-8 border-t border-gray-200 w-full desktop:w-1/2 mx-auto" />
							)}
						</div>
					))}
				</div>
				<hr className="my-8 border-t border-gray-200 w-full desktop:w-1/2 " />
				<ProjectCarousel projects={carouselPrizes} />
				<hr className="my-8 border-t border-gray-200 w-full desktop:w-1/2 " id="photos" />
				<h2 className="text-3xl font-bold text-center mb-8 pt-24">A Memorable Time in HackRPI XI!</h2>
				<div className="flex items-center justify-center">
					<div className="grid grid-cols-8 gap-2 desktop:gap-5 p-5">
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1115.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1118.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1123.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1126.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1127.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1131.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1135.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1144.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1148.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1151.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1153.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1157.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1162.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1169.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1179.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1182.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1196.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1197.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1199.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1209-2.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1221.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1252.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1258.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1263.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1288.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1292.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1299.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1303.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1327.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1343.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1373.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1375.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1382.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1394.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1407.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1425.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1433.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1437.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1464.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1470.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1474.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1477.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1494.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1500.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1518.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1545.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1553.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1563.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1573.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1579.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1603.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1724.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1732.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1736.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1740.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1756.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1758.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1762.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1812.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1817.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1845.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1850.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1860.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1883-2.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1892.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1896.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1904.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1918.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1923.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1940.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1950.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1967.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1974.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_1975.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_1991.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2006.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2008.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2013.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2040.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2054.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2063.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2070.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2076.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2085.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2097.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2103.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2111.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2117.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2127.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2139.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2145.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2155.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2161.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2167.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2175.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2180.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2187.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2205.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-2 grid grid-rows-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2209.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2213.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2257-Edit.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2260.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2224.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2231.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2265.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2283.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-5 grid grid-cols-3 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2311.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2314.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2316.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-3">
							<Image src="/lastYearPhotos/IMG_2234.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
						<div className="col-span-4 grid grid-cols-2 gap-2 desktop:gap-5">
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2234.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2248.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2290.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
							<div className="col-span-1">
								<Image src="/lastYearPhotos/IMG_2298.jpg" alt="HackRPI X 2023 Photo" width={500} height={500} />
							</div>
						</div>
						<div className="col-span-4">
							<Image src="/lastYearPhotos/IMG_2327.jpg" alt="HackRPI X 2023 Photo" width={1000} height={1000} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
