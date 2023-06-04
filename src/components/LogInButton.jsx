import React from "react"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import LogInForm from "./LogInForm"
import CloseButton from "./CloseButton"



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
			color: "#F2F4F8",
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

			boxSizing: "border-box",

			backgroundColor: "#1B2432",

			[theme.breakpoints.down('md')]: {
				paddingTop: theme.spacing(8),

				width: "100%",
                height: "100dvh",
			},
			[theme.breakpoints.up('md')]: {
				width: "375px",
				height: "600px",

				borderRadius: "20px",
			},
		},
	}
})



const LogInButton = () => {
	const { classes } = useStyles()

	const [isOpen, setIsOpen] = useState(false)
	const [hasAccount, setHasAccount] = useState(false)
	const handleWindowClick = (event) => { event.stopPropagation() }
	const setParentHasAccount = (value) => { setHasAccount(value) }
	const setParentIsOpen = (value) => { setIsOpen(value) }

	return  <div className={ classes.root }>
				<motion.div className={ classes.launchButton }
					onClick={() => setIsOpen(true)}
					whileHover={{
						scale: 1.05,
						color: "#ED872D",
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
				> {/* The Modal Container takes up the entire screen (except for the header) with a slightly transparent black background */}

					<motion.div className={ classes.modalWindow }
						onClick={handleWindowClick}
						initial={{ scale: 0, visibility: "hidden", height:"600px" }}
						animate={{
							scale: isOpen ? 1 : 0,
							visibility: isOpen ? "visible" : "hidden",
							height: hasAccount ? "400px" : "600px" ,
							transition: {
								duration: .2,
								ease: "easeInOut",
								visibility: {
									delay: isOpen ? 0 : .2,
								},
								height: {
									delay: hasAccount ? 0.4 : 0,
								},
							}
						}}
					> {/* The Modal Window contains the form to log in or sign in. It animates by growing or shrinking to open or close */}

						<CloseButton setIsOpen={ setParentIsOpen } />

						<LogInForm setHasAccount={ setParentHasAccount } hasAccount={ hasAccount } />

					</motion.div>
				</motion.div>
			</div>
}



export default LogInButton