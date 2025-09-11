// src/App.js
import { useState } from "react";
import WindEssLanding from "./WindEssLanding";
import ParkSearch from "./ParkSearch";
import ParkDetail from "./ParkDetail";
import RoutePlanner from "./RoutePlanner";
import RouteResults from "./RouteResults";
import { parks } from "./parksData";

export default function App() {
	// landing | search | detail | planner | results
	const [screen, setScreen] = useState("landing");
	const [selected, setSelected] = useState(null);
	const [route, setRoute] = useState(null); // OSRM result we render on results screen

	const goSearch = () => setScreen("search");
	const goDetail = (p) => {
		setSelected(p);
		setScreen("detail");
	};
	const goPlanner = () => setScreen("planner");
	const goResults = () => setScreen("results");

	const handlePlanRide = () => goPlanner();

	// Build OSRM request and navigate to results
	const handleGetRoute = async (payload) => {
		try {
			// MVP: require coordinates for start (use "Use my location")
			if (!payload.start.coord) {
				alert("For now, please use 'Use my location' so we have coordinates.");
				return;
			}
			const start = payload.start.coord; // {lat, lon}
			const dest = payload.destination.coord; // {lat, lon}

			const url =
				`https://router.project-osrm.org/route/v1/bike/` +
				`${start.lon},${start.lat};${dest.lon},${dest.lat}` +
				`?overview=full&geometries=geojson&steps=true`;

			const res = await fetch(url);
			const data = await res.json();
			if (!data.routes || !data.routes.length) {
				alert("No route found. Try another start point.");
				return;
			}

			const r = data.routes[0];
			const steps = r.legs[0].steps.map((st) => {
				const dist = (st.distance / 1000).toFixed(1);
				// st.maneuver.instruction sometimes exists; fallback to name
				const name = st.name || "road";
				// Build a readable text
				return `• ${st.maneuver.type || "Go"} on ${name} (${dist} km)`;
			});

			const routeForUI = {
				start: payload.start,
				destination: payload.destination,
				geometry: r.geometry, // GeoJSON LineString
				distance: r.distance, // meters
				duration: r.duration, // seconds
				steps,
			};

			setRoute(routeForUI);
			goResults();
		} catch (e) {
			console.error(e);
			alert("Routing failed. Please try again.");
		}
	};

	return (
		<>
			{screen === "landing" && <WindEssLanding onNext={goSearch} />}

			{screen === "search" && <ParkSearch parks={parks} onSelect={goDetail} />}

			{screen === "detail" && selected && (
				<ParkDetail
					park={selected}
					onBack={goSearch}
					onPlanRide={handlePlanRide}
				/>
			)}

			{screen === "planner" && selected && (
				<RoutePlanner
					park={selected}
					onBack={() => setScreen("detail")}
					onGetRoute={handleGetRoute}
				/>
			)}

			{screen === "results" && route && (
				<RouteResults route={route} onBack={() => setScreen("planner")} />
			)}
		</>
	);
}
