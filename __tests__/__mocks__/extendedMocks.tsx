/**
 * Extended Component Mocks for HackRPI Website Testing
 *
 * This file contains additional specialized mocks for complex components
 * Import these as needed in your tests.
 */

import React from "react";

// Define types for the mock components
type ScheduleItem = {
	time: string;
	title: string;
	description: string;
};

type ScheduleDay = "friday" | "saturday" | "sunday";

type ScheduleItems = {
	[key in ScheduleDay]: ScheduleItem[];
};

type Sponsor = {
	name: string;
	logo: string;
	url: string;
};

type SponsorsByTier = {
	[key: string]: Sponsor[];
};

/**
 * Mock for the Schedule component
 */
export const MockSchedule = ({ day = "saturday" }: { day?: ScheduleDay }) => {
	const scheduleItems: ScheduleItems = {
		friday: [
			{ time: "5:00 PM", title: "Check-in Begins", description: "Early arrivals welcome" },
			{ time: "7:00 PM", title: "Dinner", description: "Food will be provided" },
			{ time: "9:00 PM", title: "Team Formation", description: "Find teammates" },
		],
		saturday: [
			{ time: "8:00 AM", title: "Breakfast", description: "Start your day" },
			{ time: "9:00 AM", title: "Opening Ceremony", description: "Welcome announcements" },
			{ time: "10:00 AM", title: "Hacking Begins", description: "Start building!" },
			{ time: "12:00 PM", title: "Lunch", description: "Food will be provided" },
		],
		sunday: [
			{ time: "8:00 AM", title: "Breakfast", description: "Final day fuel" },
			{ time: "11:00 AM", title: "Hacking Ends", description: "Pencils down" },
			{ time: "12:00 PM", title: "Judging Begins", description: "Present your projects" },
			{ time: "2:00 PM", title: "Closing Ceremony", description: "Winners announced" },
		],
	};

	return (
		<section data-testid="schedule-section" id="schedule" role="region" aria-labelledby="schedule-heading">
			<h2 id="schedule-heading">Event Schedule</h2>
			<div className="schedule-tabs" role="tablist" aria-label="Schedule Days">
				<button role="tab" aria-selected={day === "friday"} aria-controls="friday-panel" data-testid="friday-tab">
					Friday
				</button>
				<button role="tab" aria-selected={day === "saturday"} aria-controls="saturday-panel" data-testid="saturday-tab">
					Saturday
				</button>
				<button role="tab" aria-selected={day === "sunday"} aria-controls="sunday-panel" data-testid="sunday-tab">
					Sunday
				</button>
			</div>
			<div role="tabpanel" id={`${day}-panel`} aria-labelledby={`${day}-tab`} data-testid={`${day}-panel`}>
				<ul className="schedule-list" role="list" aria-label={`${day} Schedule`}>
					{scheduleItems[day].map((item, i) => (
						<li key={i} className="schedule-item" data-testid={`schedule-item-${i}`}>
							<div className="schedule-time">{item.time}</div>
							<div className="schedule-details">
								<h3 className="schedule-title">{item.title}</h3>
								<p className="schedule-description">{item.description}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

/**
 * Mock for the Sponsors component
 */
export const MockSponsors = ({ tiers = ["platinum", "gold", "silver"] }: { tiers?: string[] }) => {
	const sponsorsByTier: SponsorsByTier = {
		platinum: [
			{ name: "Platinum Sponsor 1", logo: "/sponsor1.png", url: "https://example.com/1" },
			{ name: "Platinum Sponsor 2", logo: "/sponsor2.png", url: "https://example.com/2" },
		],
		gold: [
			{ name: "Gold Sponsor 1", logo: "/sponsor3.png", url: "https://example.com/3" },
			{ name: "Gold Sponsor 2", logo: "/sponsor4.png", url: "https://example.com/4" },
		],
		silver: [
			{ name: "Silver Sponsor 1", logo: "/sponsor5.png", url: "https://example.com/5" },
			{ name: "Silver Sponsor 2", logo: "/sponsor6.png", url: "https://example.com/6" },
		],
	};

	return (
		<section data-testid="sponsors-section" id="sponsors" role="region" aria-labelledby="sponsors-heading">
			<h2 id="sponsors-heading">Our Sponsors</h2>
			{tiers.map((tier) => (
				<div key={tier} className={`${tier}-sponsors`} data-testid={`${tier}-tier`}>
					<h3>{tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors</h3>
					<div className="sponsors-list" role="list" aria-label={`${tier} Sponsors`}>
						{sponsorsByTier[tier]?.map((sponsor: Sponsor, i: number) => (
							<div key={i} className="sponsor-item" role="listitem" data-testid={`${tier}-sponsor-${i}`}>
								<a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>
									<img src={sponsor.logo} alt={`${sponsor.name} logo`} />
								</a>
							</div>
						))}
					</div>
				</div>
			))}
			<div className="become-sponsor" data-testid="become-sponsor">
				<h3>Become a Sponsor</h3>
				<p>
					Interested in sponsoring HackRPI? Contact us at <a href="mailto:hackrpi@rpi.edu">hackrpi@rpi.edu</a>
				</p>
			</div>
		</section>
	);
};

/**
 * Mock for the Registration Form component
 */
export const MockRegistrationForm = ({ onSubmit = () => {} }: { onSubmit?: (data: any) => void }) => {
	return (
		<form
			data-testid="registration-form"
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const data = Object.fromEntries(formData.entries());
				onSubmit(data);
			}}
			aria-labelledby="registration-heading"
		>
			<h2 id="registration-heading">Register for HackRPI</h2>
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" required aria-required="true" data-testid="name-input" />
			</div>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" required aria-required="true" data-testid="email-input" />
			</div>
			<div className="form-group">
				<label htmlFor="university">University</label>
				<input
					type="text"
					id="university"
					name="university"
					required
					aria-required="true"
					data-testid="university-input"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="major">Major</label>
				<input type="text" id="major" name="major" required aria-required="true" data-testid="major-input" />
			</div>
			<div className="form-group">
				<label htmlFor="year">Year</label>
				<select id="year" name="year" required aria-required="true" data-testid="year-select">
					<option value="">Select Year</option>
					<option value="freshman">Freshman</option>
					<option value="sophomore">Sophomore</option>
					<option value="junior">Junior</option>
					<option value="senior">Senior</option>
					<option value="graduate">Graduate</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="dietary">Dietary Restrictions</label>
				<textarea id="dietary" name="dietary" data-testid="dietary-textarea"></textarea>
			</div>
			<div className="form-group">
				<button type="submit" data-testid="submit-button">
					Register
				</button>
			</div>
		</form>
	);
};

/**
 * Mock for a loading spinner/indicator
 */
export const MockLoadingSpinner = ({
	size = "medium",
	label = "Loading...",
}: {
	size?: "small" | "medium" | "large";
	label?: string;
}) => {
	const sizeClasses = {
		small: "w-4 h-4",
		medium: "w-8 h-8",
		large: "w-12 h-12",
	};

	return (
		<div data-testid="loading-spinner" role="status" aria-label={label} className={`spinner ${sizeClasses[size]}`}>
			<div className="spinner-inner"></div>
			<span className="sr-only">{label}</span>
		</div>
	);
};

/**
 * Mock for error boundary testing
 */
export class MockErrorBoundary extends React.Component<
	{ fallback?: React.ReactNode; children: React.ReactNode },
	{ hasError: boolean }
> {
	constructor(props: { fallback?: React.ReactNode; children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): { hasError: boolean } {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error("Error caught by MockErrorBoundary:", error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div data-testid="error-boundary-fallback" role="alert">
						<h2>Something went wrong.</h2>
						<p>Please try again later or contact support.</p>
					</div>
				)
			);
		}

		return this.props.children;
	}
}

export default {
	MockSchedule,
	MockSponsors,
	MockRegistrationForm,
	MockLoadingSpinner,
	MockErrorBoundary,
};
