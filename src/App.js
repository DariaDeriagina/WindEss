import { useState } from "react";
import WindEssLanding from "./WindEssLanding";
import ParkSearch from "./ParkSearch";

export default function App() {
	const [screen, setScreen] = useState("landing"); // landing | search

	return (
		<>
			{screen === "landing" && (
				<WindEssLanding onNext={() => setScreen("search")} />
			)}
			{screen === "search" && <ParkSearch />}
		</>
	);
}
