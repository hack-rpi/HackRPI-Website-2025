import RegistrationLink from "./themed-components/registration-link";

export default function AboutUs() {
	return (
		<div
			id="about"
			className="w-11/12 lg:w-full mx-auto mt-12 mb-8 flex flex-col lg:flex-row items-start justify-start h-fit ml-0 pl-8 lg:pl-0 "
		>
			<div className="w-full lg:w-3/6 ml-auto lg:pl-4 pr-4">
				<h1 className="text-white text-4xl mb-2 font-bold font-sans-Helvetica">About HackRPI</h1>

				<div className="w-11/12">
					<p className="pb-3">
						HackRPI 2024 is Rensselaer Polytechnic Institute&apos;s 11th annual intercollegiate hackathon hosted by
						students for students. Starting at noon on Saturday, November 9th, teams of 1-4 people have 24 hours to
						build and submit projects relating to our theme,{" "}
						<span className="text-hackrpi-primary-light-green font-bold">Urban Upgrades</span>. After submitting their
						projects, participants demonstrate their projects in front of a panel of professors, industry professionals,
						and fellow students.
					</p>
					<p className="pb-3">
						<span className="text-hackrpi-primary-light-green font-bold">Urban Upgrades</span> is all about enhancing
						the infrastructure, services, and quality of life in our cities. From smart transportation systems and
						sustainable energy solutions to improved public safety and inclusive community spaces, this theme challenges
						you to develop ideas and technologies that make cities more livable, efficient, and enjoyable for everyone.
					</p>
					<p className="pb-3">
						Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs in New York&apos;s
						Tech Valley and beyond. All students from all schools are welcome to participate, regardless of their major
						or experience level. Whether you&apos;re a seasoned hacker or a first-time participant, HackRPI is the
						perfect opportunity to learn new skills, meet new people, and have fun!
					</p>
				</div>
			</div>

			<div className="w-full lg:w-2/6 flex flex-col items-center lg:items-start mt-4 lg:mt-0 h-full lg:ml-4">
				<div className="w-full lg:w-11/12 bg-hackrpi-secondary-yellow text-black text-xl h-fit overflow-hidden whitespace-nowrap font-bold lg:mt-16 pl-1 ">
					REGISTER NOW! REGISTER NOW! REGISTER NOW! REGISTER NOW! REGISTER NOW! REGISTER NOW! REGISTER NOW!
				</div>
				<div className="w-full lg:w-11/12 bg-gray-900 text-white h-fit flex flex-col items-start justify-start">
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
					<div className=" w-11/12 flex flex-col md:flex-row lg:flex-col items-start justify-center md:justify-start md:items-center lg:items-start lg:justify-center">
						<div className="pl-2 text-md xs:text-xl mb-4 md:mb-8 lg:mb-4 mt-2 w-1/2 md:min-w-80 ">
							<p className="w-fit text-nowrap">November 9-10, 2024</p>
							<p className="w-fit text-nowrap">Rensselaer Polytechnic Institute</p>
							<p className="w-fit text-nowrap">Darrin Communications Center</p>
						</div>
						<div className="w-fit pl-2 md:pl-0 lg:pl-2 mb-4 md:mb-0 lg:mb-4">
							<RegistrationLink className="text-xl pr-2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// this is a test where I changed the code by adding comments