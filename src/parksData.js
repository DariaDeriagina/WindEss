// src/parksData.js
import JacksonParkImg from "./images/SearchParks/JacksonPark.png";
import DieppeGardensImg from "./images/SearchParks/DieppeGardens.png";
import MaldenParkImg from "./images/SearchParks/MaldenPark.png";
import MicMacParkImg from "./images/SearchParks/MicMacPark.png";
import CoventryGardensImg from "./images/SearchParks/CoventryGardensPark.png";
import GanatchioTrailImg from "./images/SearchParks/GanatchioTrail.png";

export const parks = [
	{
		id: "dieppe",
		title: "Dieppe Gardens",
		img: DieppeGardensImg,
		desc: "Scenic riverfront park with bike paths, art, and waterfront views.",
		tags: ["bike", "picnic", "waterfront", "scenic"],
		hours: "7am – 10pm",
		features: ["Bike lanes", "Picnic tables"],
		coord: { lat: 42.3169, lon: -83.0448 },
		border: "#E5A83C",
	},
	{
		id: "jackson",
		title: "Jackson Park",
		img: JacksonParkImg,
		desc: "Historic park with formal gardens, playgrounds, and seasonal displays.",
		tags: ["bike", "picnic", "playground", "scenic"],
		hours: "6am – 11pm",
		features: ["Gardens", "Playground"],
		coord: { lat: 42.3049, lon: -83.0227 },
		border: "#0E7C86",
	},
	{
		id: "malden",
		title: "Malden Park",
		img: MaldenParkImg,
		desc: "Large natural park with trails, picnic areas, and a family-friendly vibe.",
		tags: ["bike", "picnic", "scenic"],
		hours: "6am – 10pm",
		features: ["Trails", "Scenic hill"],
		coord: { lat: 42.2631, lon: -83.0496 },
		border: "#6B8F3D",
	},
	{
		id: "micmac",
		title: "Mic Mac Park",
		img: MicMacParkImg,
		desc: "Community park with sports, playgrounds and shady paths.",
		tags: ["bike", "playground", "picnic"],
		hours: "6am – 11pm",
		features: ["Playgrounds", "Sports"],
		coord: { lat: 42.3042, lon: -83.0667 },
		border: "#0E7C86",
	},
	{
		id: "coventry",
		title: "Coventry Gardens",
		img: CoventryGardensImg,
		desc: "Waterfront garden space on the Detroit River with views and paths.",
		tags: ["waterfront", "picnic", "scenic"],
		hours: "7am – 10pm",
		features: ["Waterfront", "Gardens"],
		coord: { lat: 42.3409, lon: -82.953 },
		border: "#E5A83C",
	},
	{
		id: "ganatchio",
		title: "Ganatchio Trail",
		img: GanatchioTrailImg,
		desc: "Popular multi-use trail network along Riverside and Little River.",
		tags: ["bike", "waterfront", "scenic"],
		hours: "Open 24h",
		features: ["Trail", "River views"],
		coord: { lat: 42.3344, lon: -82.919 },
		border: "#6B8F3D",
	},
];
