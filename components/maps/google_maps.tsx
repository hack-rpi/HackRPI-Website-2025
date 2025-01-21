export default function GoogleMapsWidget() {
	return (
		<a
			href="../../app/resources/images.jpg"
			target="_blank"
			rel="noopener noreferrer"
			className="block"
		>
			{/* Embed Google Maps iframe */}
			<div className="w-full h-64 border rounded-lg overflow-hidden">
				<iframe
					width="100%"
					height="100%"
					frameBorder="0"
					style={{ border: 0 }}
					referrerPolicy="no-referrer-when-downgrade"
					src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Darrin+Communications+Center,Rensselaer+Polytechnic+Institute|1102+Sage+Ave,+Troy,+NY+12180&zoom=15`}
					allowFullScreen
				></iframe>
			</div>
		</a>
	);
}
