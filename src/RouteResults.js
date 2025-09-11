// src/RouteResults.js
import "leaflet/dist/leaflet.css";
import {
	MapContainer,
	TileLayer,
	Polyline,
	Marker,
	Popup,
	useMap,
} from "react-leaflet";
import L from "leaflet";

// Default Leaflet marker icon (CDN from leaflet)
const markerIcon = new L.Icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

// Helpers
const metersToKm = (m) => (m / 1000).toFixed(1);
const secondsToMin = (s) => Math.round(s / 60);

function FitBounds({ positions }) {
	const map = useMap();
	if (positions && positions.length > 1) {
		const b = L.latLngBounds(positions);
		map.fitBounds(b, { padding: [24, 24] });
	}
	return null;
}

export default function RouteResults({ route, onBack }) {
	if (!route) return null;

	// OSRM returns [lon, lat]; leaflet wants [lat, lon]
	const linePositions = route.geometry.coordinates.map(([lon, lat]) => [
		lat,
		lon,
	]);
	const startLatLng = [route.start.coord.lat, route.start.coord.lon];
	const destLatLng = [route.destination.coord.lat, route.destination.coord.lon];

	return (
		<div style={s.page}>
			<div style={s.header}>
				<button onClick={onBack} aria-label="Back" style={s.backBtn}>
					‹
				</button>
			</div>

			<h1 style={s.title}>Your Route</h1>

			<div style={s.summaryCard}>
				<div style={s.metric}>
					<span style={s.metricNum}>{metersToKm(route.distance)} km</span>
				</div>
				<div style={s.metric}>
					<span style={s.metricNum}>{secondsToMin(route.duration)} min</span>
				</div>
				<div style={s.pills}>
					<span style={{ ...s.pill, background: "#cfe1e5" }}>Bike Lanes</span>
					<span style={{ ...s.pill, background: "#dbe7cf" }}>Shades</span>
					<span style={{ ...s.pill, background: "#f3ddb5" }}>Low Traffic</span>
				</div>
			</div>

			<div style={s.actionsRow}>
				<button style={s.primary}>Save Route</button>
				<button style={s.secondary}>Share Route</button>
			</div>

			<h2 style={s.h2}>Turn-by-Turn Steps</h2>
			<ol style={s.steps}>
				{route.steps.map((st, i) => (
					<li key={i}>{st}</li>
				))}
			</ol>

			<div style={s.mapWrap}>
				<MapContainer
					style={s.map}
					center={startLatLng}
					zoom={14}
					scrollWheelZoom={false}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Polyline positions={linePositions} />
					<Marker position={startLatLng} icon={markerIcon}>
						<Popup>Start</Popup>
					</Marker>
					<Marker position={destLatLng} icon={markerIcon}>
						<Popup>{route.destination.text}</Popup>
					</Marker>
					<FitBounds positions={[...linePositions, startLatLng, destLatLng]} />
				</MapContainer>
			</div>
		</div>
	);
}

const s = {
	page: { width: 390, minHeight: 844, margin: "0 auto", padding: 16 },
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
	title: { fontSize: 36, fontWeight: 800, margin: "8px 0 10px" },

	summaryCard: {
		border: "1px solid #e5e7eb",
		borderRadius: 18,
		padding: 14,
		display: "grid",
		gridTemplateColumns: "auto auto 1fr",
		gap: 12,
		alignItems: "center",
		marginBottom: 14,
	},
	metric: { display: "flex", alignItems: "baseline", gap: 6 },
	metricNum: { fontWeight: 800, fontSize: 28 },
	pills: { display: "flex", gap: 8, flexWrap: "wrap" },
	pill: { padding: "8px 12px", borderRadius: 999, fontWeight: 700 },

	actionsRow: { display: "flex", gap: 16, margin: "10px 0 14px" },
	primary: {
		flex: 1,
		padding: "14px 16px",
		borderRadius: 16,
		border: "none",
		background: "#2B6E73",
		color: "#fff",
		fontWeight: 800,
		cursor: "pointer",
	},
	secondary: {
		flex: 1,
		padding: "14px 16px",
		borderRadius: 16,
		border: "none",
		background: "#E5A83C",
		color: "#fff",
		fontWeight: 800,
		cursor: "pointer",
	},

	h2: { fontSize: 24, fontWeight: 800, margin: "12px 0 8px" },
	steps: { margin: "0 0 12px 20px", lineHeight: 1.6 },

	mapWrap: { width: "100%", height: 260, borderRadius: 24, overflow: "hidden" },
	map: { width: "100%", height: "100%" },
};
