import NextImage from "next/image";

export type CardProps = {
	svgPath: string;
	link: string;
	name: string;
	bgGradientFrom: string;
	bgGradientVia?: string;
	bgGradientTo: string;
	classname?: string;
};

export default function Card(props: CardProps) {
	return (
		<a
			href={props.link}
			aria-label={props.name}
			className={`${props.classname} w-12 aspect-square max-w-20
			bg-opacity-100 p-2 bg-transparent hover:bg-gradient-to-tr flex items-center justify-center
			 ${props.bgGradientFrom} ${props.bgGradientTo}
			  rounded-full hover:bg-opacity-0 transition-all duration-300 ease-[cubic-bezier(.43,-0.72,.47,1.8)]
				motion-safe:hover:scale-125 motion-reduce:scale-0`}
		>
			<NextImage src={props.svgPath} alt={props.name} height={40} width={40} />
		</a>
	);
}
