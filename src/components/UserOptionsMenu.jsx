/* Libraries imports */
import React, { useState, useEffect } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"
/* Components imports */
import CloseButton from "./CloseButton"
/* React Icons imports */
import { HiCog } from "react-icons/hi"
/* Helper functions imports */
import { deleteAccountHelper, changePasswordHelper } from "../helpers/authFormHelper"
import { socket, socketLeaveHandler, socketAccountDeleteHandler } from "../helpers/socketHandler"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			zIndex: 6,
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
			position: "fixed",

			boxSizing: "border-box",

			backgroundColor: "#1B2432",

			minHeight: "100%",

			[theme.breakpoints.down('sm')]: {
				/* paddingTop: theme.spacing(16), */
				width: "100%",	
			},
			[theme.breakpoints.up('sm')]: {
				/* paddingTop: theme.spacing(12), */
				width: "400px",
			},
			[theme.breakpoints.up('md')]: {
				/* paddingTop: theme.spacing(16), */
			},
		},
		optionsContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			boxSizing: "border-box",

			width: "100%",
			height: "100%",
			maxHeight: "100vh",		

			overflow: "scroll",
            scrollbarWidth: "thin",

			marginTop: theme.spacing(4),


            "&::-webkit-scrollbar": {

                backgroundColor: "rgba(194, 212, 235, 0.03)",

                width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#C2D4EB",
                maxWidth: "10px",
                borderRadius: theme.spacing(2),
            },

			[theme.breakpoints.down('sm')]: {
				paddingTop: theme.spacing(6),
			},
			[theme.breakpoints.up('sm')]: {
				paddingTop: theme.spacing(4),
			},
			[theme.breakpoints.up('md')]: {
				paddingTop: theme.spacing(6),
			},
		},
		userInfoRoot: {
			display: "flex",
		},
		userInfoText: {
			color: "#F2F4F8",
			backgroundColor: "rgba(255, 255, 255, .05)",

			padding: "10px",
			borderRadius: "10px",
		},
		formContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			height: "600px",
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
            height: "auto",
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

			marginTop: theme.spacing(2),
        },
		invalidInput: {
            color: "#DF4661",

            fontSize: theme.typography.pxToRem(13),
            margin: "0",
            marginTop: theme.spacing(.5),
        },
		invalidForm: {
            color: "#DF4661",

            width: "100%",

            fontSize: theme.typography.pxToRem(13),
            textAlign: "center",

            margin: "0",
            padding: "0",
            marginTop: theme.spacing(1),
        },
		validForm: {
			color: "#00ff80",

            width: "100%",

            fontSize: theme.typography.pxToRem(13),
            textAlign: "center",

            margin: "0",
            padding: "0",
            marginTop: theme.spacing(1),
		},
		deleteAccountButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: theme.typography.pxToRem(15),
            fontWeight: 600,

            height: "40px",
            padding: "0 10px",
			marginTop: theme.spacing(2),
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



const UserOptionsMenu = ({ setIsLoading, isChatRoom, currentUser }) => {
	const { classes } = useStyles()
	const navigate = useNavigate()



	/* We declare state variables */
	const [isOpen, setIsOpen] = useState(false)
	const [changePasswordForm, setChangePasswordForm] = useState({
		oldPassword: {
			value: ''
		},
		newPassword: {
			value: '',
			valid: false,
			changed: false
		},
		newPasswordVerification: {
			value: '',
			valid: false,
			changed: false
		},
		error: false,
		message: '',
		sent: false
	})
	const [formPassword, setFormPassword] = useState({
		value: '',
		valid: false,
		error: ' '
	})
	
	/* We declare the forms' handler functions */
	const handleDeleteFormChange = (event) => {
		const password = event.target.value

		setFormPassword({ ...formPassword, value: password })
	}
	const handleChangeFormChange = (event) => {
		const { name, value } = event.target
		let isValid = false


		if (name === 'newPassword') {
			isValid = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$/g.test(value)
		} else if ( name === 'newPasswordVerification') {
			isValid = (value === changePasswordForm.newPassword.value)
		}


		setChangePasswordForm({
			...changePasswordForm,
			[name]: {
				value: value,
				valid: isValid,
				changed: true
			}
		})
	}
	const handleDeleteFormSend = async (event) => {
		event.preventDefault()
		await setIsLoading(true)


		if(isChatRoom) {
			await socketLeaveHandler()
		}

		socket.disconnect()


		const accountDeletionState = await deleteAccountHelper(formPassword.value)
		const accountWasDeleted = accountDeletionState.success
		const serverErrorMessage = accountDeletionState.message


		if(accountWasDeleted) {
			socketAccountDeleteHandler()

			navigate('/')
		} else {
			setFormPassword({
				...formPassword,
				valid: false,
				error: serverErrorMessage
			})
		}

		setIsLoading(false)
	}
	const handleChangeFormSend = async (event) => {
		event.preventDefault()
		await setIsLoading(true)



		const passwordChange = await changePasswordHelper(changePasswordForm)

		if (passwordChange.success) {
			await setChangePasswordForm({
				...changePasswordForm,
				error: false,
				message: passwordChange.message,
				sent: true
			})
		} else {
			await setChangePasswordForm({
				...changePasswordForm,
				error: true,
				message: passwordChange.message,
				sent: true
			})
		}

		await setIsLoading(false)
	}

	/* We use useEffect hooks to make sure the forms' data are always up to date */
	useEffect(() => {
        setChangePasswordForm(changePasswordForm)
    }, [changePasswordForm])

	useEffect(() => {
        setFormPassword(formPassword)
    }, [formPassword])

	/* We declare the modal's handler functions */
	const handleWindowClick = (event) => { event.stopPropagation() }
	const setParentIsOpen = (value) => {
		setIsOpen(value)
	}



	return  <div className={ classes.root }>
				<motion.button className={ classes.currentUserButton }
					onClick={() => setIsOpen(true)}
					initial={{ color: "#F2F4F8", scale: 1 }}
					whileHover={{ color: "#ED872D", scale: 1.15 }}
				>
					<HiCog className={ classes.currentUserButtonIcon } />
				</motion.button>

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



						<div className={ classes.optionsContainer }>

							<CloseButton setIsOpen={ setParentIsOpen } />

							<div className={ classes.formContainer }>
								<h2 className={ classes.formTitle }>Mes Informations</h2>

								<div className={ classes.inputContainer }>
									<p className={ classes.inputLabel } htmlFor="password-field">Nom d'utilisateur</p>
									<p className={ classes.userInfoText }>{ currentUser.username }</p>
								</div>
								<div className={ classes.inputContainer }>
									<p className={ classes.inputLabel } htmlFor="password-field">Adresse Email</p>
									<p className={ classes.userInfoText }>{ currentUser.email }</p>
								</div>
							</div>

							<form className={ classes.formContainer }>
								<h2 className={ classes.formTitle }>Changer mon Mot de Passe</h2>

								<div className={ classes.inputContainer }>

									<label className={ classes.inputLabel } htmlFor="password-field">Mot de passe actuel</label>
									<input className={ classes.formInput }
										id="password-field"
										name="oldPassword"
										type="password"
										autoComplete="off"
										value={ changePasswordForm.oldPassword.value }
										onChange={ handleChangeFormChange }/>



									<label className={ classes.inputLabel } htmlFor="password-field">Nouveau mot de passe</label>
									<input className={ classes.formInput }
										id="password-field"
										name="newPassword"
										type="password"
										autoComplete="off"
										value={ changePasswordForm.newPassword.value }
										onChange={ handleChangeFormChange }/>
									<motion.p className={ classes.invalidInput }
										initial={{ visibility: "hidden", display: "none", opacity: 0 }}
										animate={ !changePasswordForm.newPassword.valid && changePasswordForm.newPassword.changed
											? { visibility: "visible", display: "block", opacity: 1 }
											: { visibility: "hidden", display: "none", opacity: 0 }}
										transition={{
											duration: .2,
											opacity: { delay: !changePasswordForm.newPassword.valid ? .2 : 0},
											visibility: { delay: changePasswordForm.newPassword.valid ? .2 : 0},
											display: { delay: .2 }
											}}>Votre mot de passe doit contenir au moins 6 caractères dont un chiffre et une lettre</motion.p>



									<label className={ classes.inputLabel } htmlFor="password-field">Vérifiez votre nouveau mot de passe</label>
									<input className={ classes.formInput }
										id="password-field"
										name="newPasswordVerification"
										type="password"
										autoComplete="off"
										value={ changePasswordForm.newPasswordVerification.value }
										onChange={ handleChangeFormChange }/>
									<motion.p className={ classes.invalidInput }
										initial={{ visibility: "hidden", display: "none", opacity: 0 }}
										animate={ !changePasswordForm.newPasswordVerification.valid && changePasswordForm.newPasswordVerification.changed
											? { visibility: "visible", display: "block", opacity: 1 }
											: { visibility: "hidden", display: "none", opacity: 0 }}
										transition={{
											duration: .2,
											opacity: { delay: !changePasswordForm.newPasswordVerification.valid ? .2 : 0},
											visibility: { delay: changePasswordForm.newPasswordVerification.valid ? .2 : 0},
											display: { delay: .2 }
											}}>Votre mot de passe et la vérification doivent être identiques.</motion.p>

								</div>


								<motion.p className={ changePasswordForm.error ? classes.invalidForm : classes.validForm }
									initial={{ visibility: "hidden", opacity: 0 }}
									animate={ !formPassword.valid
										? { visibility: "visible", opacity: 1 }
										: { visibility: "hidden", opacity: 0 }}
									transition={{
										duration: .4,
										opacity: { delay: 0 },
										visibility: { delay: formPassword.valid ? .4 : 0}}}

								>{ changePasswordForm.error }</motion.p>


								<motion.button className={ classes.deleteAccountButton }
									onClick={ handleChangeFormSend }
									whileHover={{
										scale: 1.05,
									}}
									whileTap={{
										scale: .97,
									}}
								>
									Confirmer
								</motion.button>
							</form>

							<form className={ classes.formContainer }>
								<h2 className={ classes.formTitle }>Supprimer mon compte</h2>

								<div className={ classes.inputContainer }>

									<label className={ classes.inputLabel } htmlFor="password-field">Entrez votre mot de passe</label>
									<input className={ classes.formInput }
										id="password-field"
										name="password"
										type="password"
										autoComplete="off"
										value={ formPassword.value }
										onChange={ handleDeleteFormChange }/>

								</div>


								<motion.p className={ classes.invalidForm }
									initial={{ visibility: "hidden", opacity: 0 }}
									animate={ !formPassword.valid
										? { visibility: "visible", opacity: 1 }
										: { visibility: "hidden", opacity: 0 }}
									transition={{
										duration: .4,
										opacity: { delay: 0 },
										visibility: { delay: formPassword.valid ? .4 : 0}}}

								>{ formPassword.error }</motion.p>


								<motion.button className={ classes.deleteAccountButton }
									onClick={ handleDeleteFormSend }
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



					</motion.div>

				</motion.div>
			</div>
}



export default UserOptionsMenu