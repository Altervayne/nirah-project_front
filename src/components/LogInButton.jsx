import React from "react"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			position: "relative",
			zIndex: 2,
		},
		launchButton: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",

			width: theme.spacing(32),
			height: theme.spacing(8),
			borderRadius: theme.spacing(4),

			backgroundColor: "#121420",
			color: "#ED872D",
			boxShadow: "5px 5px 10px rgba(0, 0, 0, .5)",

			fontFamily: "Helvetica",
			fontWeight: 600,
			fontSize: theme.typography.pxToRem(20),

			cursor: "pointer",
		},
		modalContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",

			position: "fixed",
			top: "0",
			left: "0",

			width: "100vw",
			height: "100vh",
			backgroundColor: "rgba(0, 0, 0, .5)",
		},
		modalWindow: {
			width: "400px",
			height: "400px",
			backgroundColor: "#1B2432",
		},
		modalCloseButton: {
			width: "50px",
			height: "50px",
			borderRadius: "25px",

			color: "white",
			backgroundColor: "red",
		},
	}
})



const LogInButton = () => {
	const { classes } = useStyles()

	const [isOpen, setIsOpen] = useState(false)

	return  <div className={ classes.root }>
				<motion.div
					className={ classes.launchButton }
					whileHover={{
						scale: 1.05,
						transition: {
							duration: 0.1
						}
					}}
					onClick={() => setIsOpen(true)}
				>
					Lancer Nirah
				</motion.div>
				<motion.div
					className={ classes.modalContainer }
					initial={{ opacity: 0, visibility: "hidden" }}
					animate={{
						opacity: isOpen ? 1 : 0,
						visibility: isOpen ? "visible" : "hidden",
						transition: {
							duration: .2,
							ease: "easeInOut",
							visibility: {
								delay: isOpen ? 0 : .2,
							}
						}
					}}
				>
					<motion.div
						className={ classes.modalWindow }
						initial={{ scale: 0, visibility: "hidden" }}
						animate={{
							scale: isOpen ? 1 : 0,
							visibility: isOpen ? "visible" : "hidden",
							transition: {
								duration: .2,
								ease: "easeInOut",
								visibility: {
									delay: isOpen ? 0 : .2,
								}
							}
						}}
					>
						<div
							className={ classes.modalCloseButton }
							onClick={() => setIsOpen(false)}
						>
							X
						</div>
					</motion.div>
				</motion.div>
			</div>
}



export default LogInButton