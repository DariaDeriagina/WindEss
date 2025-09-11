// src/RoutePlanner.js
import { useEffect, useRef, useState } from "react";
import SearchIcon from "./images/icons/Search.png";

/** Build an OSM <iframe> URL centered near the park with a marker */
const osmEmbed = (lat, lon) => {
	const d = 0.01; // ~1 km box
	const bbox = `${lon - d}%2C${lat - d}%2C${lon + d}%2C${lat + d}`;
	return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
};

export default function RoutePlanner({ park, onBack, onGetRoute }) {
	// Start: user text (UI) and coordinates (when "Use my location" is chosen)
	const [startText, setStartText] = useState("");
	const [startCoord, setStartCoord] = useState(null); // {lat, lon} | null

	// Simple single optional stop for the MVP
	const [stopText, setStopText] = useState("");

	// Focus start input on mount
	const startInputRef = useRef(null);
	useEffect(() => {
		startInputRef.current?.focus();
	}, []);

	const useMyLocation = () => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser.");
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude: lat, longitude: lon } = pos.coords;
				setStartCoord({ lat, lon });
				setStartText("Current location");
			},
			(err) => {
				console.error(err);
				alert("Couldn't get your location. Please type a starting point.");
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	};

	const removeDestination = () => {
		onBack?.(); // MVP: go back to Detail
	};

	const handleGetRoute = () => {
		if (!startText && !startCoord) {
			alert("Enter a starting point or use your current location.");
			return;
		}
		const payload = {
			start: { text: startText || null, coord: startCoord || null },
			destination: { text: park.title, coord: park.coord },
			stops: stopText ? [{ text: stopText }] : [],
		};
		onGetRoute?.(payload);
	};

	return (
		<div style={s.page}>
			<div style={s.header}>
				<button onClick={onBack} aria-label="Back" style={s.backBtn}>
					‹
				</button>
			</div>

			<h1 style={s.title}>Start Location Input</h1>

			{/* Start input */}
			<div style={s.field}>
				<div style={s.searchWrap}>
					<img src={SearchIcon} alt="" style={s.searchIcon} />
					<input
						ref={startInputRef}
						value={startText}
						onChange={(e) => {
							setStartText(e.target.value);
							if (startCoord) setStartCoord(null); // clear coord if typing manually
						}}
						placeholder="Enter starting point..."
						aria-label="Enter starting point"
						style={s.searchInput}
					/>
				</div>
				<div style={s.inlineBtns}>
					<button style={s.secondaryBtn} onClick={useMyLocation}>
						Use my location
					</button>
				</div>
			</div>

			{/* Destination (locked) */}
			<h2 style={s.h2}>Destination Field</h2>
			<div style={s.destRow}>
				<div style={s.destPill} aria-readonly>
					{park.title}
				</div>
				<button style={s.removeBtn} onClick={removeDestination}>
					Remove
				</button>
			</div>

			{/* Add stop (optional) */}
			<div style={{ marginTop: 12 }}>
				<div style={s.addStopWrap}>
					<span style={s.plus}>＋</span>
					<input
						value={stopText}
						onChange={(e) => setStopText(e.target.value)}
						placeholder="Add stop..."
						aria-label="Add stop"
						style={s.addStopInput}
					/>
				</div>
			</div>

			{/* CTA */}
			<button style={s.cta} onClick={handleGetRoute}>
				Get Route
			</button>

			{/* Map preview (destination) */}
			<div style={s.mapFrameWrap}>
				<iframe
					title={`${park.title} map`}
					src={osmEmbed(park.coord.lat, park.coord.lon)}
					style={s.mapFrame}
					loading="lazy"
				/>
			</div>
		</div>
	);
}

const s = {
	page: { width: 390, minHeight: 844, margin: "0 auto", padding: "16px" },

	header: { display: "flex", alignItems: "center", marginBottom: 8 },
	backBtn: {
		width: 44,
		height: 44,
		borderRadius: 999,
		border: "1px solid #e5e7eb",
		background: "#fff",
		fontSize: 24,
		lineHeight: 1,
		cursor: "pointer",
	},

	title: { fontSize: 32, fontWeight: 800, margin: "8px 0 16px" },
	h2: { fontSize: 24, fontWeight: 800, margin: "18px 0 10px" },

	// Start input
	field: { marginBottom: 6 },
	searchWrap: {
		position: "relative",
		display: "flex",
		justifyContent: "center",
	},
	searchIcon: {
		position: "absolute",
		width: 18,
		height: 18,
		left: 14,
		top: "50%",
		transform: "translateY(-50%)",
		opacity: 0.7,
		pointerEvents: "none",
	},
	searchInput: {
		width: "100%",
		padding: "14px 16px 14px 42px",
		borderRadius: 14,
		border: "1px solid #d1d5db",
		outline: "none",
		fontSize: 16,
		boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
	},
	inlineBtns: { display: "flex", gap: 8, marginTop: 8 },
	secondaryBtn: {
		padding: "10px 12px",
		borderRadius: 12,
		border: "1px solid #cbd5e1",
		background: "#fff",
		fontWeight: 700,
		cursor: "pointer",
	},

	// Destination
	destRow: { display: "flex", gap: 10, alignItems: "center" },
	destPill: {
		flex: 1,
		padding: "14px 16px",
		borderRadius: 12,
		border: "1px solid #d1d5db",
		fontSize: 20,
		fontWeight: 700,
		background: "#fff",
	},
	removeBtn: {
		padding: "12px 14px",
		borderRadius: 12,
		border: "none",
		background: "#E5A83C",
		color: "#fff",
		fontWeight: 800,
		cursor: "pointer",
	},

	// Add stop
	addStopWrap: {
		display: "flex",
		alignItems: "center",
		gap: 10,
		border: "1px solid #d1d5db",
		borderRadius: 14,
		padding: "12px 14px",
	},
	plus: { fontSize: 20, color: "#64748b" },
	addStopInput: { flex: 1, border: "none", outline: "none", fontSize: 16 },

	// CTA
	cta: {
		width: "100%",
		padding: "16px",
		borderRadius: 16,
		border: "none",
		background: "#2B6E73",
		color: "#fff",
		fontWeight: 700,
		fontSize: 16,
		boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
		margin: "18px 0 16px",
		cursor: "pointer",
	},

	// Map
	mapFrameWrap: {
		width: "100%",
		height: 220,
		borderRadius: 24,
		overflow: "hidden",
		background: "#E5EEF1",
	},
	mapFrame: { width: "100%", height: "100%", border: "0" },
};
