import React, { useEffect } from "react"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { logInHelper, signUpHelper } from "../helpers/authFormHelper"



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
            paddingBottom: theme.spacing(2),

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
        invalidForm: {
            color: "#DF4661",

            width: "100%",

            fontSize: theme.typography.pxToRem(13),
            textAlign: "center",

            margin: "0",
            padding: "0",
            marginBottom: theme.spacing(1),
        },
        buttonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",

            width: "75%",
            marginBottom: "20px",
        },
        formButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: theme.typography.pxToRem(15),
            fontWeight: 600,
            fontFamily: "Helvetica",

            height: "40px",
            padding: "0 10px",
            borderRadius: "10px",

            outline: "none",
            border: "none",

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



    const [formData, setFormData] = useState({
        username: {
            value: '',
            valid: false,
            changed: false
        },
        email: {
            value: '',
            valid: false,
            changed: false
        },
        password: {
            value: '',
            valid: false,
            changed: false
        },
        verification: {
            value: '',
            valid: false,
            changed: false
        },
    })

    const [formError, setFormError] = useState({
        message: 'Veuillez remplir le formulaire.',
        sendAttempted: false,
        errorReceived: false,
    })



    const regex = {
        username: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿÔ-]{3,14}$/g,
        email: /^[\w-.+ÔÀ-ÖØ-öø-ÿ]{1,64}@[\w-ÔÀ-ÖØ-öø-ÿ]{1,255}.+[\w-]{2,4}$/g,
        password: /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$/g
    }

    const indicateInvalidData = () => {
        setFormError({ message:'Les données rentrées sont invalides', sendAttempted: true, errorReceived: true })
    }

    const indicateUnchangedData = () => {
        setFormError({ ...formError, sendAttempted: true, errorReceived: true })
    }

    const indicateValidData = () => {
        setFormError({ ...formError, sendAttempted: true, errorReceived: false })
    }

    const validateField = (name, value) => {
        let fieldIsValid = false

        if(name === 'verification') {
            value === formData.password.value   ? fieldIsValid = true
                                                : fieldIsValid = false
        } else {
            regex[name].test(value) ? fieldIsValid = true
                                    : fieldIsValid = false
        }

        return fieldIsValid
    }
      
    
    const handleFormChange = (event) => {
        const { name, value } = event.target


        name === "verification" ? setFormData({
                                    ...formData,
                                    verification: {
                                        value: value,
                                        valid: validateField("verification", value),
                                        changed: true,
                                    }
                                })
                                : setFormData({
                                    ...formData,
                                    [name]: {
                                        value: value,
                                        valid: validateField(name, value),
                                        changed: true,
                                    },
                                    verification: {
                                        ...formData.verification,
                                        valid: validateField("verification", formData.verification.value)
                                    }
                                })


        formData.username.valid
        && formData.email.valid
        && formData.password.valid
        && formData.verification.valid  ? indicateValidData()
                                        : indicateInvalidData()


        console.log(formData)
        console.log('Form is valid after handleFormChange: ' + (formData.username.valid
                                                                && formData.email.valid
                                                                && formData.password.valid
                                                                && formData.verification.valid))
    }

    useEffect(() => {
        setFormData(formData)
        console.log(formData)

        console.log('Form is valid after useEffect: ' + (formData.username.valid
                                                            && formData.email.valid
                                                            && formData.password.valid
                                                            && formData.verification.valid))
    }, [formData])


    
    const handleFormSend = (event) => {
        event.preventDefault()

        if(hasAccount) {
            if(formData.email.valid && formData.password.valid) {
                logInHelper(formData.email.value, formData.password.value)
                indicateValidData()
            } else {
                formData.username.changed
                && formData.email.changed
                && formData.password.changed
                && formData.verification.changed    ? indicateInvalidData()
                                                    : indicateUnchangedData()
            }
        } else {
            if(formData.username.valid && formData.email.valid && formData.password.valid && formData.verification.valid) {
                signUpHelper(formData.username.value, formData.email.value, formData.password.value)
            } else {
                formData.username.changed
                && formData.email.changed
                && formData.password.changed
                && formData.verification.changed    ? indicateInvalidData()
                                                    : indicateUnchangedData()
            }
        }
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

                        <label className={ classes.inputLabel } htmlFor="username-field">Pseudonyme</label>
                        <input className={ classes.formInput }
                            id="username-field"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={ formData.username.value }
                            onChange={ handleFormChange }/>

                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ !formData.username.valid && formData.username.changed
                                ? { visibility: "visible", display: "block", opacity: 1 }
                                : { visibility: "hidden", display: "none", opacity: 0 }}
                            transition={{
                                duration: .2,
                                opacity: { delay: !formData.username.valid ? .2 : 0},
                                visibility: { delay: formData.username.valid ? .2 : 0},
                                display: { delay: .2 }
                                }}>Veuillez utiliser entre 3 et 14 chiffres ou lettres.</motion.p>

                    </motion.div>



                    <div className={ classes.inputContainer }>

                        <label className={ classes.inputLabel } htmlFor="email-field">Adresse mail</label>
                        <input className={ classes.formInput }
                            id="email-field"
                            name="email"
                            type="email" 
                            autoComplete="off"
                            value={ formData.email.value }
                            onChange={ handleFormChange }/>

                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ !formData.email.valid && formData.email.changed && !hasAccount
                                ? { visibility: "visible", display: "block", opacity: 1 }
                                : { visibility: "hidden", display: "none", opacity: 0 }}
                            transition={{
                                duration: .2,
                                opacity: { delay: !formData.email.valid ? .2 : 0},
                                visibility: { delay: formData.email.valid ? .2 : 0},
                                display: { delay: .2 }
                                }}>Veuillez entrer une adresse email valide.</motion.p>

                    </div>



                    <div className={ classes.inputContainer }>

                        <label className={ classes.inputLabel } htmlFor="password-field">Mot de passe</label>
                        <input className={ classes.formInput }
                            id="password-field"
                            name="password"
                            type="password"
                            autoComplete="off"
                            value={ formData.password.value }
                            onChange={ handleFormChange }/>

                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ !formData.password.valid && formData.password.changed && !hasAccount
                                ? { visibility: "visible", display: "block", opacity: 1 }
                                : { visibility: "hidden", display: "none", opacity: 0 }}
                            transition={{
                                duration: .2,
                                opacity: { delay: !formData.password.valid ? .2 : 0},
                                visibility: { delay: formData.password.valid ? .2 : 0},
                                display: { delay: .2 }
                                }}>Votre mot de passe doit contenir au moins 6 caractères dont un chiffre et une lettre</motion.p>

                    </div>



                    <motion.div className={ classes.inputContainer }
                        initial="rest"
                        animate="fade"
                        variants={ fadeInAndOutNoAccount }
                    >

                        <label className={ classes.inputLabel } htmlFor="verify-field">Vérifiez votre mot de passe</label>
                        <input className={ classes.formInput }
                            id="verify-field"
                            name="verification"
                            type="password"
                            autoComplete="off"
                            value={ formData.verification.value }
                            onChange={ handleFormChange }/>

                        <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ !formData.verification.valid && formData.verification.changed && !hasAccount
                                ? { visibility: "visible", display: "block", opacity: 1 }
                                : { visibility: "hidden", display: "none", opacity: 0 }}
                            transition={{
                                duration: .2,
                                opacity: { delay: !formData.verification.valid ? .2 : 0},
                                visibility: { delay: formData.verification.valid ? .2 : 0},
                                display: { delay: .2 }
                                }}>Les deux mots de passe doivent être identiques.</motion.p>

                    </motion.div>
                    
                </form> {/* The form is set up so the nickname and password verification can disappear when switching to log-in */}



                <div className={ classes.buttonsContainer }>
                    <motion.p className={ classes.invalidForm }
                                initial={{ visibility: "hidden", display: "block", opacity: 0 }}
                                animate={ formError.errorReceived && formError.sendAttempted
                                    ? { visibility: "visible", display: "block", opacity: 1 }
                                    : { visibility: "hidden", display: "block", opacity: 0 }}
                                transition={{
                                    duration: .2,
                                    opacity: { delay: formError.errorReceived && formError.sendAttempted ? .2 : 0},
                                    visibility: { delay: !formError.errorReceived && !formError.sendAttempted ? .2 : 0},
                                    display: { delay: .2 }
                                    }}>{ formError.message }</motion.p>

                    <motion.button className={ classes.formButton }
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
                    </motion.button>

                    <motion.button className={ classes.formButton }
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
                    </motion.button>

                    <motion.button className={ classes.formButton }
                        onClick={(event) => handleFormSend(event)}
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
                    </motion.button>
                </div> {/* The buttons to switch between sign-up and log-in replace each other by fading out */}
            </div>
}



export default LogInForm