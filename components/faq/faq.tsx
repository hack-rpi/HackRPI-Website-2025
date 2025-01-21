import React, { useState } from "react";
import "../../app/globals.css";
import RegistrationButton from "@/components/themed-components/registration-link";

type FAQ = {
	title: string;
	content: React.ReactNode;
};

const faqs: FAQ[] = [
	{
		title: "What is HackRPI?",
		content:
			"cheese. i like cheese.",
	},
	{
		title: "When is HackRPI?",
		content:
			"HackRPI takes place on November 9th and 10th, 2024. Arrival and check-in takes place from 9-10 AM. Our opening ceremony starts at 10 AM, and hacking begins at 11am. Your projects must be on Devpost by 10 AM Sunday, and all coding must stop at 11 AM Sunday. Teams will present, and the event will end around 4PM on Sunday. We are excited to see you there!",
	},
	{
		title: "Where is HackRPI?",
		content:
			"Tokyo",
	},
	{
		title: "Is HackRPI free to attend?",
		content: "No, there is a $3000 entry fee.",
	},
	{
		title: "How do I register?",
		content: (
			<div className="flex items-start md:items-center justify-start flex-col md:flex-row">
				<p className="pr-2">You can click here to register with Major League Hacking (MLH).</p>
				<RegistrationButton /> {/* This is a custom button component will update later */}
			</div>
		),
	},
	{
		title: "Who can participate?",
		content:
			"Everyone is welcome to participate, whether you are a hackathon veteran or this is your first hackathon, this is a great opportunity to learn, experiment with new technologies, and grow your skills. Our team of experienced mentors is here to help you in every step of the way.",
	},
	{
		title: "I'm under 18, can I still participate?",
		content:
			"Students under 18 are welcome to attend, but are not allowed to stay overnight in the sleep rooms. Students under the age of 17 must have an adult (21+) chaperone with them at all times during the event.",
	},
	{
		title: "Do I have to be an RPI student?",
		content:
			"No! HackRPI is open to everyone, students of all experience levels from all colleges and universities are welcome to attend. Did you know that students from over 45 other colleges attended HackRPI!",
	},
	{
		title: "Does HackRPI provide travel reimbursement?",
		content: (
			<p>
				Unfortunately, we are unable to provide travel reimbursement at this time, however, we have sleep rooms on
				campus for students 18 and older, and we are more than happy to recommend local accommodations if you email us
				at{" "}
				<a href="mailto:hackrpi@rpi.edu" className="text-hackrpi-primary-blue underline">
					hackrpi@rpi.edu
				</a>
				.
			</p>
		),
	},
	{
		title: "What should I bring?",
		content: "Bring your team, your laptop, chargers, any hardware you need, and a good night's sleep!",
	},
	{
		title: "What is the theme?",
		content:
			"The theme for HackRPI 2024 is Urban Upgrades. This theme is all about enhancing the infrastructure, services, and quality of life in our cities. From smart transportation systems and sustainable energy solutions to improved public safety and inclusive community spaces, this theme challenges you to develop ideas and technologies that make cities more livable, efficient, and enjoyable for everyone.",
	},
	{
		title: "Is it okay if I am late to the event?",
		content:
			"Yes! You can arrive at any time during the event, but we recommend arriving before 11 AM on Saturday. Remember, the longer you are late, the less time you have to work on your project!",
	},
	{
		title: "When are submissions due?",
		content:
			"All projects must be submitted to Devpost by 10 AM on Sunday. You will be able to modify your submission until 11am. After 11an, no coding or changes to your project are allowed.",
	},
	{
		title: "How do I submit my project?",
		content:
			// eslint-disable-next-line
			'You will submit your project on Devpost. See our "Event Information" and "Resources" pages for more details.',
	},
	{
		title: "When and how will prizes be awarded?",
		content:
			"Prizes are announced at the closing ceremony, which will take place around 4 PM on Sunday. Physical prizes will be distributed during the closing ceremony. Winners of cash prizes will be contacted by our team after the event. ",
	},
];

const FAQPage = () => {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div
			className="h-auto mb-8 flex flex-col items-center text-white bg-base-100 w-5/6 desktop:w-full pl-8 desktop:pl-0"
			id="faq"
		>
			<div className="flex w-full desktop:w-2/3">
				<h1 className="font-mokoto font-normal text-white text-left text-4xl text-shadow-md pb-4">FAQs</h1>
			</div>
			<div className="w-full desktop:w-2/3">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className={`collapse collapse-arrow custom-arrow bg-base-200 p-1 text-2xl border-t-2 ${
							index === faqs.length - 1 ? "border-b-2" : ""
						} border-hackrpi-primary-blue rounded-none`}
					>
						<input
							type="checkbox"
							className="w-auto h-auto"
							checked={expandedIndex === index}
							onChange={() => handleToggle(index)}
						/>
						<div className="collapse-title font-medium text-2xl text-hackrpi-primary-blue">{faq.title}</div>
						<div className="collapse-content">{faq.content}</div>
					</div>
				))}
			</div>
			<div className="w-full desktop:w-2/3">
				<h2 id="sponsors" className="font-poppins text-2xl text-center pt-10">
					Feel free to contact us with any other questions at{" "}
					<a href="mailto:hackrpi@rpi.edu" className="text-hackrpi-primary-blue">
						hackrpi@rpi.edu!
					</a>
				</h2>
			</div>
		</div>
	);
};

export default FAQPage;
