import React, { useState } from "react";
import "../../app/globals.css";
import RegistrationButton from "@/components/themed-components/registration-link";
import faqs from "@/data/faqData";

type FAQ = {
	title: string;
	content: React.ReactNode;
};



const FAQPage = () => {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div
			className="h-auto flex flex-col items-center text-hackrpi-pink bg-base-100 w-5/6 desktop:w-full pl-8 desktop:pl-0"
			id="faq"
			data-testid="faq-section"
		>
				<div>
					<div className="w-full flex flex-col items-center lg:items-startlg:mt-0 h-full lg:ml-4 p-2 bg-gray-900 bg-opacity-100 m-2 hover:bg-opacity-100 rounded-xl">
						{/* Registration Banner */}
						<div
							data-testid="register-now-banner"
							className="w-full bg-hackrpi-secondary-orange text-white text-xl h-fit overflow-hidden whitespace-nowrap font-bold lg:mt-16\\ pl-1"
						>
							REGISTER NOW!
						</div>
						{/* Event Info Box */}
						<div className="w-full bg-gray-900 text-white h-fit flex flex-col items-start justify-start font-modern">
							<div className="w-full h-2 bg-white mt-4" />

							<h2 className="flex items-center text-2xl xs:text-4xl font-semibold pl-2 mt-2 text-nowrap">
								When &amp; Where{" "}
								<svg
									className="fill-white ml-4 rotate-180 md:rotate-90 lg:rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									viewBox="0 0 11 11"
								>
									<path d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z" />
								</svg>
							</h2>

							<div className="w-11/12 flex flex-col md:flex-row lg:flex-col items-start justify-center md:justify-start md:items-center lg:items-start lg:justify-center">
								<div className="pl-2 text-md xs:text-xl mb-4 md:mb-8 lg:mb-4 mt-2 w-1/2 md:min-w-80">
									<p data-testid="event-date" className="w-fit text-nowrap">
										November 15-16, 2025
									</p>
									<p data-testid="event-location" className="w-fit text-nowrap">
										Rensselaer Polytechnic Institute
									</p>
									<p data-testid="event-venue" className="w-fit text-nowrap">
										Darrin Communications Center
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			<div className="flex w-full desktop:w-2/3">
				<h1 className="font-modern text-hackrpi-orange text-left text-4xl text-shadow-md pb-4">FAQs</h1>
			</div>
			<div className="w-full desktop:w-2/3">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className={`collapse collapse-arrow custom-arrow bg-retro-purple-dark p-1 text-2xl border-t-4 ${
							index === faqs.length - 1 ? "border-b-2" : ""
						} border-hackrpi-light-purple border-rounded-r-xl border-double pixel-glow-hover`}
						data-testid={`faq-item-${index}`}
					>
						<input
							type="checkbox"
							className="w-auto h-auto"
							checked={expandedIndex === index}
							onChange={() => handleToggle(index)}
							data-testid={`faq-checkbox-${index}`}
							aria-label={`Toggle ${faq.title}`}
							aria-expanded={expandedIndex === index}
							aria-controls={`faq-content-${index}`}
						/>
						<div
							className="font-modern collapse-title font-medium text-2xl text-retro-orange transition-all duration-200 hover:text-retro-pink glow-hover"
							data-testid={`faq-title-${index}`}
							id={`faq-title-${index}`}
						>
							{faq.title}
						</div>
						<div
							className="font-neutral2 collapse-content"
							data-testid={`faq-content-${index}`}
							id={`faq-content-${index}`}
							aria-labelledby={`faq-title-${index}`}
						>
							{faq.content}
						</div>
					</div>
				))}
			</div>
			<div className="w-full desktop:w-2/3">
				<h2
					id="sponsors"
					className="font-pix font-regular text-2xl text-center pt-10"
					data-testid="faq-contact-section"
				>
					Feel free to contact us with any other questions at{" "}
					<a href="mailto:hackrpi@rpi.edu" className="text-hackrpi-primary-blue" data-testid="contact-email">
						hackrpi@rpi.edu!
					</a>
				</h2>
			</div>
		</div>
	);
};

export default FAQPage;