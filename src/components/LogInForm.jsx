import React from "react"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",

            width: "100%",
            height: "100%",
		},
        formTitle: {
			marginTop: theme.spacing(4),

			fontSize: theme.typography.pxToRem(28),
			fontWeight: 600,

			color: "#F2F4F8"
		},
        formRoot: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",
            paddingBottom: theme.spacing(4),

            width: "100%",
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
        inputContainer: {
            display: "flex",
            flexDirection: "column",

            position: "relative",
            boxSizing: "border-box",

            margin: "20px 0",
            width: "75%",
            height: "55px",
        },
        invalidInput: {
            color: "#DF4661",

            fontSize: theme.typography.pxToRem(13),
            margin: "0",
            marginTop: theme.spacing(.5),
        },
        buttonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "75%",
            marginBottom: "20px",
        },
        formButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: theme.typography.pxToRem(15),
            fontFamily: "Helvetica",

            height: "40px",
            padding: "0 10px",
            borderRadius: "10px",

            color: "#F2F4F8",
            backgroundColor: "#121420",

            cursor: "pointer",
        },
	}
})



const LogInForm = ({ setHasAccount, hasAccount }) => {
    const { classes } = useStyles()

    const fadeInAndOutAccount = {
        rest: {
            visibility: "hidden",
            display: "none",
            opacity: 0
        },
        fade: {
            visibility: hasAccount ? "visible" : "hidden",
            display: hasAccount ? "flex" : "none",
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
        }
    }
    const fadeInAndOutNoAccount = {
        rest: {
            visibility: "visible",
            display: "flex",
            opacity: 1
        },
        fade: {
            visibility: !hasAccount ? "visible" : "hidden",
            display: !hasAccount ? "flex" : "none",
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
        }
    }


    const [chosenUsername, setChosenUsername] = useState('')
    const [validUsername, setValidUsername] = useState(true)
    const usernameRegex = /^[0-9a-zA-ZÀ-ÖØ-öø-ÿÔ-]{3,14}$/g
    const handleUsernameChange = (event) => {
        setChosenUsername(event.target.value)

        usernameRegex.test(event.target.value) ? setValidUsername(true) : setValidUsername(false)
    }
    const [chosenEmail, setChosenEmail] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const emailRegex = /^[\w-.+ÔÀ-ÖØ-öø-ÿ]{1,64}@[\w-ÔÀ-ÖØ-öø-ÿ]{1,255}.+[\w-]{2,4}$/g
    const handleEmailChange = (event) => {
        setChosenEmail(event.target.value)

        emailRegex.test(event.target.value) ? setValidEmail(true) : setValidEmail(false)
    }
    const [chosenPassword, setChosenPassword] = useState('')
    const [validPassword, setValidPassword] = useState(true)
    const passwordRegex = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$/g
    const handlePasswordChange = (event) => {
        setChosenPassword(event.target.value)

        passwordRegex.test(event.target.value) ? setValidPassword(true) : setValidPassword(false)
    }
    const [passwordVerification, setPasswordVerification] = useState('')
    const [validVerification, setValidVerification] = useState(true)
    const handlePasswordVerificationChange = (event) => {
        setPasswordVerification(event.target.value)

        event.target.value === chosenPassword ? setValidVerification(true) : setValidVerification(false)
    }



    return  <div className={ classes.root }>
                <motion.h2 className={ classes.formTitle }
                    initial="rest"
                    animate="fade"
                    variants={ fadeInAndOutAccount }
                >
                    Connectez-vous
                </motion.h2>

                <motion.h2 className={ classes.formTitle }
                    initial="rest"
                    animate="fade"
                    variants={ fadeInAndOutNoAccount }
                >
                    Inscrivez-vous
                </motion.h2>

                <form className={ classes.formRoot }>

                    <motion.div className={ classes.inputContainer }
                        initial="rest"
                        animate="fade"
                        variants={ fadeInAndOutNoAccount }
                    >
                        <label className={ classes.inputLabel } for="username-field">Pseudonyme</label>
                        <input className={ classes.formInput } id="username-field" type="text" value={ chosenUsername }
                            onChange={ handleUsernameChange }/>
                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ validUsername ? {
                                    visibility: "hidden", display: "none", opacity: 0
                                } : {
                                    visibility: "visible", display: "block", opacity: 1
                                } }
                            transition={{
                                duration: .2,
                                opacity: { delay: !validUsername ? .2 : 0},
                                visibility: { delay: validUsername ? .2 : 0},
                                display: { delay: .2 }
                                }}>Veuillez utiliser entre 3 et 14 chiffres ou lettres.</motion.p>
                    </motion.div>

                    <div className={ classes.inputContainer }>
                        <label className={ classes.inputLabel } for="email-field">Adresse mail</label>
                        <input className={ classes.formInput } id="email-field" type="email" value={ chosenEmail }
                            onChange={ handleEmailChange }/>
                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ validEmail || hasAccount ? {
                                    visibility: "hidden", display: "none", opacity: 0
                                } : {
                                    visibility: "visible", display: "block", opacity: 1
                                } }
                            transition={{
                                duration: .2,
                                opacity: { delay: !validEmail ? .2 : 0},
                                visibility: { delay: validEmail ? .2 : 0},
                                display: { delay: .2 }
                                }}>Veuillez entrer une adresse email valide.</motion.p>
                    </div>

                    <div className={ classes.inputContainer }>
                        <label className={ classes.inputLabel } for="password-field">Mot de passe</label>
                        <input className={ classes.formInput } id="password-field" type="password" value={ chosenPassword }
                            onChange={ handlePasswordChange }/>
                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ validPassword || hasAccount ? {
                                    visibility: "hidden", display: "none", opacity: 0
                                } : {
                                    visibility: "visible", display: "block", opacity: 1
                                } }
                            transition={{
                                duration: .2,
                                opacity: { delay: !validPassword ? .2 : 0},
                                visibility: { delay: validPassword ? .2 : 0},
                                display: { delay: .2 }
                                }}>Votre mot de passe doit contenir au moins 6 caractères dont un chiffre et une lettre</motion.p>
                    </div>

                    <motion.div className={ classes.inputContainer }
                        initial="rest"
                        animate="fade"
                        variants={ fadeInAndOutNoAccount }
                    >
                        <label className={ classes.inputLabel } for="verify-field">Vérifiez votre mot de passe</label>
                        <input className={ classes.formInput } id="verify-field" type="password" value={ passwordVerification }
                            onChange={ handlePasswordVerificationChange }/>
                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ validVerification ? {
                                    visibility: "hidden", display: "none", opacity: 0
                                } : {
                                    visibility: "visible", display: "block", opacity: 1
                                } }
                            transition={{
                                duration: .2,
                                opacity: { delay: !validVerification ? .2 : 0},
                                visibility: { delay: validVerification ? .2 : 0},
                                display: { delay: .2 }
                                }}>Les deux mots de passe doivent être identiques.</motion.p>
                    </motion.div>
                    
                </form> {/* The form is set up so the nickname and password verification can disappear when switching to log-in */}

                <div className={ classes.buttonsContainer }>
                    <motion.h3 className={ classes.formButton }
                        onClick={() => setHasAccount(true)}
                        initial="rest"
                        animate="fade"
                        variants={ fadeInAndOutNoAccount }
                        whileHover={{
                            color: "#ED872D",
                            scale: 1.05,
                        }}
                        whileTap={{
                            color: "#ED872D",
                            scale: .97,
                        }}
                    >
                        J'ai déjà un compte
                    </motion.h3>

                    <motion.h3 className={ classes.formButton }
                        onClick={() => setHasAccount(false)}
                        initial="rest"
                        animate="fade"
                        variants={ fadeInAndOutAccount }
                        whileHover={{
                            color: "#ED872D",
                            scale: 1.05,
                        }}
                        whileTap={{
                            color: "#ED872D",
                            scale: .97,
                        }}
                    >
                        Je n'ai pas de compte
                    </motion.h3>

                    <motion.h3 className={ classes.formButton }
                        onClick={() => (window.location.href = "/dashboard")}
                        whileHover={{
                            color: "#ED872D",
                            scale: 1.05,
                        }}
                        whileTap={{
                            color: "#ED872D",
                            scale: .97,
                        }}
                    >
                        Valider
                    </motion.h3>
                </div> {/* The buttons to switch between sign-up and log-in replace each other by fading out */}
            </div>
}



export default LogInForm