// src/ParkDetail.js
import { useRef, useState } from "react";
import BikeIcon from "./images/icons/Bicycle.png";
import PicnicIcon from "./images/icons/PicnicTable.png";
import LakeIcon from "./images/icons/Lake.png";

/** OSM <iframe> URL with marker at park coord */
const osmEmbed = (lat, lon) => {
	const d = 0.01; // ~1km box
	const bbox = `${lon - d}%2C${lat - d}%2C${lon + d}%2C${lat + d}`;
	return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
};

export default function ParkDetail({ park, onBack, onPlanRide }) {
	// ✅ Hooks must be first, not inside conditionals
	const [userPhotos, setUserPhotos] = useState([]); // [{id,url,name}]
	const fileInputRef = useRef(null);

	const onPickFile = () => fileInputRef.current?.click();

	const onFilesSelected = (e) => {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;
		const next = files.slice(0, 6 - userPhotos.length).map((f) => ({
			id: `${Date.now()}-${f.name}`,
			url: URL.createObjectURL(f),
			name: f.name,
		}));
		setUserPhotos((prev) => [...prev, ...next]);
		e.target.value = ""; // allow reselecting same file later
	};

	const removePhoto = (id) => {
		setUserPhotos((prev) => prev.filter((p) => p.id !== id));
	};

	// ✅ Render a small fallback if park is missing (hooks already called)
	if (!park) {
		return (
			<div style={s.page}>
				<div style={s.header}>
					<button onClick={onBack} aria-label="Back" style={s.backBtn}>
						‹
					</button>
					<div style={s.headerTitle}>Park</div>
				</div>
				<p style={s.desc}>No park selected.</p>
			</div>
		);
	}

	return (
		<div style={s.page}>
			{/* Header */}
			<div style={s.header}>
				<button onClick={onBack} aria-label="Back" style={s.backBtn}>
					‹
				</button>
				<div style={s.headerTitle}>{park.title}</div>
			</div>

			{/* Hero */}
			<img src={park.img} alt={park.title} style={s.hero} />

			{/* Description */}
			<p style={s.desc}>{park.desc}</p>

			{/* Tags */}
			<div style={s.tags} role="list">
				{park.tags.includes("bike") && (
					<Chip icon={BikeIcon} label="Bike" tone="#F8E1B2" />
				)}
				{park.tags.includes("picnic") && (
					<Chip icon={PicnicIcon} label="Picnic" tone="#DCEFE4" />
				)}
				{park.tags.includes("waterfront") && (
					<Chip icon={LakeIcon} label="Waterfront" tone="#C9E0E6" />
				)}
				{park.tags.includes("playground") && (
					<Chip label="Playground" tone="#EEE" />
				)}
				{park.tags.includes("scenic") && <Chip label="Scenic" tone="#EEE" />}
			</div>

			{/* CTA */}
			<button style={s.cta} onClick={onPlanRide}>
				Plan Ride To This Park
			</button>

			{/* Map + info */}
			<h3 style={s.section}>Map</h3>
			<div style={s.mapRow}>
				<div style={s.mapFrameWrap}>
					<iframe
						title={`${park.title} map`}
						src={osmEmbed(park.coord.lat, park.coord.lon)}
						style={s.mapFrame}
						loading="lazy"
					/>
				</div>
				<div>
					<div>
						<b>Features:</b> {park.features.join(", ")}
					</div>
					<div style={{ marginTop: 8 }}>
						<b>Hours:</b> {park.hours}
					</div>
				</div>
			</div>

			{/* Community photos */}
			<hr style={s.hr} />
			<h3 style={s.section}>User Photos From Rides/Walks</h3>
			<p style={s.helper}>
				Browse community photos or share your own memories here.
			</p>

			<div style={s.galleryControls}>
				<button style={s.uploadBtn} onClick={onPickFile}>
					+ Upload Your Image
				</button>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					onChange={onFilesSelected}
					style={{ display: "none" }}
				/>
				<span style={s.note}>JPG/PNG, up to 6 photos (local only)</span>
			</div>

			<div style={s.galleryGrid}>
				{userPhotos.map((p) => (
					<div key={p.id} style={s.thumb}>
						<img src={p.url} alt={p.name} style={s.thumbImg} />
						<button
							style={s.removeThumb}
							aria-label="Remove photo"
							onClick={() => removePhoto(p.id)}
							title="Remove"
						>
							×
						</button>
					</div>
				))}
				{userPhotos.length < 6 && (
					<button style={s.addTile} onClick={onPickFile} aria-label="Add photo">
						+
					</button>
				)}
			</div>
		</div>
	);
}

function Chip({ icon, label, tone }) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
				padding: "8px 12px",
				background: tone,
				borderRadius: 999,
				fontWeight: 600,
			}}
			role="listitem"
		>
			{icon && <img src={icon} alt="" style={{ width: 16, height: 16 }} />}
			{label}
		</span>
	);
}

const s = {
	page: { width: 390, minHeight: 844, margin: "0 auto", padding: "16px" },
	header: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
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
	headerTitle: { fontWeight: 800, fontSize: 18 },
	hero: {
		width: "100%",
		height: 220,
		objectFit: "cover",
		borderRadius: 24,
		marginTop: 8,
	},
	desc: { color: "#334155", margin: "12px 0 10px" },
	tags: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 },

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
		margin: "8px 0 16px",
		cursor: "pointer",
	},

	section: { fontSize: 20, fontWeight: 800, margin: "12px 0" },
	mapRow: { display: "flex", gap: 16, alignItems: "center" },
	mapFrameWrap: {
		width: 220,
		height: 140,
		borderRadius: 16,
		overflow: "hidden",
		background: "#E5EEF1",
	},
	mapFrame: { width: "100%", height: "100%", border: "0" },

	hr: { border: "none", borderTop: "1px solid #e5e7eb", margin: "16px 0" },
	helper: { color: "#475569", marginTop: -4 },

	galleryControls: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		margin: "8px 0 8px",
	},
	uploadBtn: {
		padding: "10px 12px",
		borderRadius: 12,
		border: "1px solid #cbd5e1",
		background: "#fff",
		fontWeight: 700,
		cursor: "pointer",
	},
	note: { color: "#64748b", fontSize: 12 },

	galleryGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gap: 10,
		marginTop: 8,
	},
	thumb: {
		position: "relative",
		width: "100%",
		aspectRatio: "1 / 1",
		overflow: "hidden",
		borderRadius: 16,
		background: "#f1f5f9",
	},
	thumbImg: { width: "100%", height: "100%", objectFit: "cover" },
	removeThumb: {
		position: "absolute",
		top: 6,
		right: 6,
		width: 24,
		height: 24,
		borderRadius: 999,
		border: "none",
		background: "rgba(0,0,0,0.5)",
		color: "#fff",
		cursor: "pointer",
		lineHeight: 1,
		fontSize: 16,
	},
	addTile: {
		width: "100%",
		aspectRatio: "1 / 1",
		borderRadius: 16,
		border: "2px dashed #cbd5e1",
		background: "#fff",
		fontSize: 28,
		display: "grid",
		placeItems: "center",
		color: "#2B6E73",
		cursor: "pointer",
	},
};
