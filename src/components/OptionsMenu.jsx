import React from "react"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import CloseButton from "./CloseButton"
import { HiCog } from "react-icons/hi"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			zIndex: 2,
		},
		currentUserButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            backgroundColor: "none",
            background: "none",
            border: "none",
            outline: "none",
        },
		currentUserButtonIcon: {
            fontSize: theme.typography.pxToRem(30),
        },
		onHeaderOpenButton: {
			position: "fixed",
            top: 0,
            right: 0,
            zIndex: 5,
            
            borderRadius: theme.spacing(1),
            outline: "none",
            border: "none",

            margin: theme.spacing(1),

            backgroundColor: "#1B2432",
            color: "#F2F4F8",

            cursor: "pointer",

            [theme.breakpoints.down('sm')]: {
                height: theme.spacing(6),
                width: theme.spacing(6),	
			},
			[theme.breakpoints.up('sm')]: {
                height: theme.spacing(5),
                width: theme.spacing(5),	
			},
		},
		onHeaderOpenButtonIcon: { 
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(32),	
			},
			[theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(24),	
			},
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
				minHeight: "100%",	
			},
			[theme.breakpoints.up('md')]: {
				width: "375px",
				height: "auto",

				borderRadius: "20px",
			},
		},
		optionsContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-between",

			width: "100%",
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(4),
		},
		formContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			width: "100%",
		},
		formTitle: {
			fontSize: theme.typography.pxToRem(24),
			fontWeight: 600,

			color: "#F2F4F8"
		},
		inputContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",

            position: "relative",
            boxSizing: "border-box",

            width: "75%",
            height: "70px",
        },
		formInput: {
            width: "100%",
            height: "33px",
            minHeight: "33px",

            border: "none",
            borderRadius: "10px",
            padding: "0 10px",

            boxSizing: "border-box",

            fontSize: theme.typography.pxToRem(16),

            "&:focus": {
                outline: "none",
            },
        },
		inputLabel: {
            color: "#C2D4EB",
            margin: "2px 10px",

            boxSizing: "border-box",
        },
		deleteAccountButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: theme.typography.pxToRem(15),
            fontWeight: 600,

            height: "40px",
            padding: "0 10px",
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(2),
            borderRadius: "10px",

            outline: "none",
            border: "none",

            color: "#F2F4F8",
            backgroundColor: "#d02b48",

            cursor: "pointer",
        },
	}
})



const OptionsMenu = ({ optionsType }) => {
	const { classes } = useStyles()

	const [isOpen, setIsOpen] = useState(false)
	const handleWindowClick = (event) => { event.stopPropagation() }
	const setParentIsOpen = (value) => {
		setIsOpen(value)
	}

	return  <div className={ classes.root }>
				{ optionsType === "userOptions" ? 	<motion.button className={ classes.currentUserButton }
														onClick={() => setIsOpen(true)}
														initial={{ color: "#F2F4F8", scale: 1 }}
														whileHover={{ color: "#ED872D", scale: 1.15 }}
													>
														<HiCog className={ classes.currentUserButtonIcon } />
													</motion.button>

												:	<motion.button className={ classes.onHeaderOpenButton }
														onClick={() => setIsOpen(!isOpen)}
														initial={{ color: "#F2F4F8", scale: 1 }}
														animate={{ color: isOpen ? "#ED872D" : "#F2F4F8" }}
														whileHover={{ color: "#ED872D", scale: 1.1 }}
														whileTap={{ color: "#F2F4F8", scale: .95 }}
													>
														<HiCog className={ classes.onHeaderOpenButtonIcon } />
													</motion.button> }



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
						onClick={ handleWindowClick }
						initial={{ scale: 0, visibility: "hidden" }}
						animate={{
							scale: isOpen ? 1 : 0,
							visibility: isOpen ? "visible" : "hidden",
							transition: {
								duration: .2,
								ease: "easeInOut",
								visibility: {
									delay: isOpen ? 0 : .2,
								},
							}
						}}
					> {/* The Modal Window contains the form to log in or sign in. It animates by growing or shrinking to open or close */}

						{ optionsType === "userOptions" && <CloseButton setIsOpen={ setParentIsOpen } /> }

						{ optionsType === "userOptions" ? 	<div className={ classes.optionsContainer }>
																<form className={ classes.formContainer }>
																	<h2 className={ classes.formTitle }>Supprimer mon compte</h2>

																	<div className={ classes.inputContainer }>

																		<label className={ classes.inputLabel } htmlFor="password-field">Entrez votre mot de passe</label>
																		<input className={ classes.formInput }
																			id="password-field"
																			name="password"
																			type="password"
																			autoComplete="off"
																			/* value={ formData.password.value } */
																			/* onChange={ handleFormChange } *//>

																	</div>
																	<motion.button className={ classes.deleteAccountButton }
																		/* onClick={ handleFormSend } */
																		whileHover={{
																			scale: 1.05,
																		}}
																		whileTap={{
																			scale: .97,
																		}}
																	>
																		Supprimer
																	</motion.button>
																</form>
															</div> 
														: <></> }

					</motion.div>


				</motion.div>



			</div>
}



export default OptionsMenu