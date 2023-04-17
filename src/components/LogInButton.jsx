import React from "react"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { FaTimes } from "react-icons/fa"



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
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			position: "relative",

			width: "400px",
			height: "400px",
			backgroundColor: "#1B2432",

			borderRadius: "20px",
		},
		modalCloseButton: {
			position: "absolute",
			right: "0",

			width: "30px",
			height: "30px",
			margin: "15px",

			color: "#F2F4F8",

			cursor: "pointer",
		},
		modalTitle: {
			marginTop: theme.spacing(4),

			fontSize: theme.typography.pxToRem(28),
			fontWeight: 600,

			color: "#F2F4F8"
		},
	}
})



const LogInButton = () => {
	const { classes } = useStyles()

	const [isOpen, setIsOpen] = useState(false)
	const [hasAccount, setHasAccount] = useState(false)
	const handleWindowClick = (event) => {
		event.stopPropagation()
	}

	return  <div className={ classes.root }>
				<motion.div className={ classes.launchButton }
					onClick={() => setIsOpen(true)}
					whileHover={{
						scale: 1.05,
						transition: {
							duration: 0.1
						}
					}}		
				>
					Lancer Nirah
				</motion.div>

				<motion.div className={ classes.modalContainer }
					onClick={() => setIsOpen(false)}
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
					<motion.div className={ classes.modalWindow }
						onClick={handleWindowClick}
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
						<FaTimes className={ classes.modalCloseButton }
							onClick={() => setIsOpen(false)}
						/>

						<motion.h2 className={ classes.modalTitle }
							onClick={() => setHasAccount(false)}
							initial={{ visibility: "hidden", display: "none", opacity: 0 }}
							animate={{
								visibility: hasAccount ? "visible" : "hidden",
								display: hasAccount ? "block" : "none",
								opacity: hasAccount ? 1 : 0,
								transition: {
									duration: .4,
									ease: "easeInOut",
									opacity: {
										delay: hasAccount ? .4 : 0
									},
									visibility: {
										delay: hasAccount ? 0 : .4
									},
									display: {
										delay: .4
									},
								}
							}}
						>
							Connectez-vous
						</motion.h2>
						<motion.h2 className={ classes.modalTitle }
							onClick={() => setHasAccount(true)}
							initial={{ visibility: "visible", display: "block", opacity: 1 }}
							animate={{
								visibility: !hasAccount ? "visible" : "hidden",
								display: !hasAccount ? "block" : "none",
								opacity: !hasAccount ? 1 : 0,
								transition: {
									duration: .4,
									ease: "easeInOut",
									opacity: {
										delay: !hasAccount ? .4 : 0
									},
									visibility: {
										delay: !hasAccount ? 0 : .4
									},
									display: {
										delay: .4
									},
								}
							}}
						>
							Inscrivez-vous
						</motion.h2>

					</motion.div>
				</motion.div>
			</div>
}



export default LogInButton