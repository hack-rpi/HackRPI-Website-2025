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
		content: "come and code.",
	},
	{
		title: "When is HackRPI?",
		content: "Never again.",
	},
	{
		title: "Where is HackRPI?",
		content: "RPI where else. ",
	},
	{
		title: "Is HackRPI free to attend?",
		content: "Nope. Now it's 3 trillion dollars. Good luck.",
	},
	{
		title: "How do I register?",
		content: (
			<div className="flex items-start md:items-center justify-start flex-col md:flex-row">
				<p className="pr-2">Dont bother. You wont win.</p>
				<RegistrationButton /> {/* This is a custom button component will update later */}
			</div>
		),
	},
	{
		title: "Who can participate?",
		content: "Only RPI students.",
	},
	{
		title: "I'm under 18, can I still participate?",
		content: "Nope. Minimum age is now 30.",
	},
	{
		title: "Do I have to be an RPI student?",
		content: "yes you do.",
	},
	{
		title: "Does HackRPI provide travel reimbursement?",
		content: (
			<p>
				What do you think we're rich?{" "}
				<a href="mailto:dontbother@rpi.edu" className="text-hackrpi-primary-blue underline">
					hackrpi@rpi.edu
				</a>
				.
			</p>
		),
	},
	{
		title: "What should I bring?",
		content: "your body.",
	},
	{
		title: "What is the theme?",
		content: "free choice.",
	},
	{
		title: "Is it okay if I am late to the event?",
		content: "Absolutely not, immediate disqualification.",
	},
	{
		title: "When are submissions due?",
		content: "2 hours after starting.",
	},
	{
		title: "How do I submit my project?",
		content:
			// eslint-disable-next-line
			"nah",
	},
	{
		title: "When and how will prizes be awarded?",
		content: "Whoever has the worst project wins the most money. ",
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
