// ParkSearch.js
import { useMemo, useState } from "react";

/* ===== Icons (bottom nav + badges + search) ===== */
import HomeIcon from "./images/icons/Home.png";
import FavoritesIcon from "./images/icons/Heart.png";
import ParksIcon from "./images/icons/Alps.png";
import AboutIcon from "./images/icons/Info.png";

import BikeIcon from "./images/icons/Bicycle.png";
import PicnicIcon from "./images/icons/PicnicTable.png";
import LakeIcon from "./images/icons/Lake.png";
import SearchIcon from "./images/icons/Search.png";

/* ===== Park Images (all via imports) ===== */
import JacksonParkImg from "./images/SearchParks/JacksonPark.png";
import DieppeGardensImg from "./images/SearchParks/DieppeGardens.png";
import MaldenParkImg from "./images/SearchParks/MaldenPark.png";
import MicMacParkImg from "./images/SearchParks/MicMacPark.png"; // ensure file name matches exactly
import CoventryGardensImg from "./images/SearchParks/CoventryGardensPark.png";
import GanatchioTrailImg from "./images/SearchParks/GanatchioTrail.png";

/* ---------- Small reusable UI ---------- */
function Badge({ icon, label, bg = "#F1F5F9", color = "#111" }) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
				padding: "6px 12px",
				borderRadius: 999,
				background: bg,
				color,
				fontWeight: 600,
				fontSize: 13,
				lineHeight: 1,
			}}
		>
			{icon && <img src={icon} alt="" style={{ width: 16, height: 16 }} />}
			{label}
		</span>
	);
}

function ParkCard({ img, title, border = "#0E7C86", badges = [] }) {
	return (
		<div style={{ ...styles.card, borderColor: border }}>
			{img ? (
				<img src={img} alt={title} style={styles.cardImg} />
			) : (
				<div style={styles.cardImgPlaceholder} />
			)}
			<div style={{ flex: 1 }}>
				<h2 style={styles.cardTitle}>{title}</h2>
				<div
					style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}
				>
					{badges.map((b, i) => (
						<Badge key={i} {...b} />
					))}
				</div>
			</div>
		</div>
	);
}

/* ====================== MAIN SCREEN ====================== */
export default function ParkSearch() {
	const [query, setQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'bike' | 'waterfront' | 'playground'

	// Source of truth (labels drive filters)
	const parks = useMemo(
		() => [
			{
				title: "Jackson Park",
				img: JacksonParkImg,
				border: "#0E7C86",
				labels: ["bike", "picnic"],
				badges: [
					{ icon: BikeIcon, label: "Bike", bg: "#F8E1B2" },
					{ icon: PicnicIcon, label: "Picnic", bg: "#DCEFE4" },
				],
			},
			{
				title: "Dieppe Gardens",
				img: DieppeGardensImg,
				border: "#E5A83C",
				labels: ["bike", "picnic", "waterfront"],
				badges: [
					{ icon: BikeIcon, label: "Bike", bg: "#F8E1B2" },
					{ icon: PicnicIcon, label: "Picnic", bg: "#DCEFE4" },
					{ icon: LakeIcon, label: "Waterfront", bg: "#C9E0E6" },
				],
			},
			{
				title: "Malden Park",
				img: MaldenParkImg,
				border: "#6B8F3D",
				labels: ["bike", "picnic", "playground"],
				badges: [
					{ icon: BikeIcon, label: "Bike", bg: "#F8E1B2" },
					{ icon: PicnicIcon, label: "Picnic", bg: "#DCEFE4" },
				],
			},
			{
				title: "Mic Mac Park",
				img: MicMacParkImg,
				border: "#0E7C86",
				labels: ["bike", "playground", "picnic"],
				badges: [
					{ icon: BikeIcon, label: "Bike", bg: "#F8E1B2" },
					{ icon: PicnicIcon, label: "Picnic", bg: "#DCEFE4" },
				],
			},
			{
				title: "Coventry Gardens",
				img: CoventryGardensImg,
				border: "#E5A83C",
				labels: ["waterfront", "picnic"],
				badges: [
					{ icon: LakeIcon, label: "Waterfront", bg: "#C9E0E6" },
					{ icon: PicnicIcon, label: "Picnic", bg: "#DCEFE4" },
				],
			},
			{
				title: "Ganatchio Trail",
				img: GanatchioTrailImg,
				border: "#6B8F3D",
				labels: ["bike", "waterfront"],
				badges: [{ icon: BikeIcon, label: "Bike", bg: "#F8E1B2" }],
			},
		],
		[]
	);

	const filtered = parks.filter((p) => {
		const q = query.trim().toLowerCase();
		const matchText = !q || p.title.toLowerCase().includes(q);
		const matchFilter =
			activeFilter === "all" ? true : p.labels.includes(activeFilter);
		return matchText && matchFilter;
	});

	return (
		<div style={styles.page}>
			<div style={styles.phone}>
				{/* Header */}
				<h1 style={styles.title}>WindEss Rides&Parks</h1>
				<p style={styles.subtitle}>Windsor & Essex Cycling + Parks Explorer</p>

				{/* Scrollable content */}
				<div style={styles.content}>
					{/* Search with icon */}
					<div style={styles.searchWrap}>
						<img src={SearchIcon} alt="" style={styles.searchIcon} />
						<input
							aria-label="Search parks"
							placeholder="Search parks"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							style={styles.searchInput}
						/>
					</div>

					{/* Filters */}
					<div style={styles.filters}>
						<button
							onClick={() => setActiveFilter("waterfront")}
							style={{
								...styles.chip,
								...(activeFilter === "waterfront" && styles.chipActiveTeal),
							}}
						>
							Waterfront
						</button>
						<button
							onClick={() => setActiveFilter("bike")}
							style={{
								...styles.chip,
								...(activeFilter === "bike" && styles.chipActiveTeal),
							}}
						>
							Bike-friendly
						</button>
						<button
							onClick={() => setActiveFilter("playground")}
							style={{
								...styles.chip,
								...(activeFilter === "playground" && styles.chipActiveTeal),
							}}
						>
							Playground
						</button>
						<button
							onClick={() => setActiveFilter("all")}
							style={{
								...styles.chip,
								...(activeFilter === "all" && styles.chipActiveGray),
							}}
						>
							All
						</button>
					</div>

					{/* Cards list */}
					{filtered.map((p) => (
						<ParkCard key={p.title} {...p} />
					))}
				</div>

				{/* Bottom Nav */}
				<div style={styles.nav}>
					<button style={styles.navBtn}>
						<img src={HomeIcon} alt="Home" style={styles.navIcon} />
						<span>HOME</span>
					</button>
					<button style={styles.navBtn}>
						<img src={FavoritesIcon} alt="Favorites" style={styles.navIcon} />
						<span>FAVORITES</span>
					</button>
					<button style={{ ...styles.navBtn, color: "#0E7C86" }}>
						<img
							src={ParksIcon}
							alt="Parks & Rides"
							style={{ ...styles.navIcon, filter: "opacity(1)" }}
						/>
						<span>PARKS&RIDES</span>
					</button>
					<button style={styles.navBtn}>
						<img src={AboutIcon} alt="About" style={styles.navIcon} />
						<span>ABOUT</span>
					</button>
				</div>
			</div>
		</div>
	);
}

/* ----------------- Styles ----------------- */
const styles = {
	page: {
		minHeight: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "#ffffff",
	},
	phone: {
		position: "relative",
		width: 390,
		height: 844,
		borderRadius: 24,
		overflow: "hidden",
		boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
		border: "1px solid #e5e7eb",
		background: "#fff",
		display: "flex",
		flexDirection: "column",
	},
	title: { fontSize: 28, fontWeight: 800, margin: "32px 16px 2px" },
	subtitle: { margin: "0 16px 16px", color: "#4b5563" },

	content: {
		flex: 1,
		overflowY: "auto",
		padding: "0 16px 96px", // keep content above nav
	},

	// search (shorter with icon)
	searchWrap: {
		width: "100%",
		position: "relative",
		display: "flex",
		justifyContent: "center",
		marginBottom: 14,
	},
	searchIcon: {
		position: "absolute",
		width: 18,
		height: 18,
		left: 24,
		top: "50%",
		transform: "translateY(-50%)",
		opacity: 0.7,
		pointerEvents: "none",
	},
	searchInput: {
		width: "100%",
		maxWidth: 330,
		padding: "14px 16px 14px 46px",
		borderRadius: 14,
		border: "1px solid #d1d5db",
		outline: "none",
		fontSize: 16,
		boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
	},

	// chips
	filters: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" },
	chip: {
		padding: "8px 14px",
		borderRadius: 18,
		border: "1px solid #cbd5e1",
		background: "#f1f5f9",
		fontWeight: 600,
		cursor: "pointer",
	},
	chipActiveTeal: {
		background: "#0E7C86",
		color: "#fff",
		borderColor: "#0E7C86",
	},
	chipActiveGray: {
		background: "#e5e7eb",
		color: "#111",
		borderColor: "#e5e7eb",
	},

	// cards
	card: {
		display: "flex",
		gap: 12,
		border: "2px solid #0E7C86",
		padding: 12,
		borderRadius: 16,
		alignItems: "center",
		marginBottom: 14,
	},
	cardImg: {
		width: 120,
		height: 90,
		objectFit: "cover",
		borderRadius: 18,
		display: "block",
	},
	cardImgPlaceholder: {
		width: 120,
		height: 90,
		borderRadius: 18,
		background: "#e5e7eb",
	},
	cardTitle: { margin: 0, fontSize: 22, fontWeight: 800 },

	// bottom nav
	nav: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		padding: "10px 0",
		borderTop: "1px solid #e5e7eb",
		background: "#ffffff",
	},
	navBtn: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		background: "none",
		border: "none",
		fontSize: 11,
		color: "#0f172a",
		gap: 2,
	},
	navIcon: { width: 26, height: 26, marginBottom: 2, filter: "opacity(0.8)" },
};
