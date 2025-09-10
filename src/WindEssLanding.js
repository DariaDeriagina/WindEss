import { motion } from "framer-motion";
import Bike from "./images/Bike.png";
import Bulb from "./images/Bulb.png";
import Logo from "./images/LogoWindEss.png";
import Tree from "./images/Tree.png";

export default function WindEssLanding({ onNext }) {
	return (
		<div style={styles.page}>
			<div style={styles.phone}>
				{/* Background art */}
				<img src={Tree} alt="tree" style={styles.tree} />
				<img src={Bulb} alt="bulb" style={styles.bulb} />

				{/* Headline */}
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
					style={styles.headlineWrap}
				>
					<h1 style={styles.headline}>
						Ride your way to
						<br />
						Windsor-Essex parks
					</h1>
				</motion.div>

				{/* Logo */}
				<div style={styles.logoWrap}>
					<img src={Logo} alt="WindEss logo" style={styles.logo} />
				</div>

				{/* Bike animation */}
				<motion.img
					src={Bike}
					alt="bike"
					style={styles.bike}
					initial={{ opacity: 0, x: -80 }}
					animate={{ opacity: 1, x: [0, 80, -100, -100] }}
					transition={{ duration: 2.8, ease: "easeInOut" }}
				/>

				{/* CTA */}
				<div style={styles.ctaArea}>
					<button style={styles.ctaBtn} onClick={onNext}>
						Find Parks & Plan Ride
					</button>

					<p style={styles.caption}>
						A community project for
						<br />
						Windsor & Essex cyclists and families
					</p>
				</div>
			</div>
		</div>
	);
}

/* ===== Styles tuned to Figma mock ===== */
const styles = {
	page: {
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
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
	},
	tree: {
		position: "absolute",
		top: -60,
		left: -210,
		width: 420,
		pointerEvents: "none",
	},
	bulb: {
		position: "absolute",
		right: -80,
		bottom: 0,
		width: 230,
		pointerEvents: "none",
	},
	headlineWrap: {
		position: "absolute",
		top: 180,
		left: 24,
		right: 24,
		textAlign: "center",
	},
	headline: {
		margin: 0,
		fontSize: 24,
		lineHeight: 1.25,
		fontWeight: 600,
		color: "#0f172a", // slate-900
	},
	logoWrap: {
		position: "absolute",
		top: 330,
		left: 0,
		right: 0,
		display: "flex",
		justifyContent: "center",
	},
	logo: { width: 260, height: "auto" },
	bike: {
		position: "absolute",
		bottom: 240,
		left: 40,
		width: 260,
		height: "auto",
		zIndex: 2,
	},
	ctaArea: {
		position: "absolute",
		bottom: 38,
		left: 0,
		right: 0,
		padding: "0 24px",
		textAlign: "center",
	},
	ctaBtn: {
		width: "100%",
		padding: "16px 18px",
		borderRadius: 16,
		background: "#2B6E73",
		color: "#ffffff",
		fontSize: 18,
		fontWeight: 600,
		border: "none",
		boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
	},
	caption: {
		marginTop: 14,
		fontSize: 12,
		color: "#64748b", // slate-500
	},
};
