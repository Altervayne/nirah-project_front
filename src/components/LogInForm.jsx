import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { logInHelper, signUpHelper } from "../helpers/authFormHelper"
import LoadingScreen from "./LoadingScreen"



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
    const navigate = useNavigate()


    /* Framer motion variants to animate the fading in and out of the form's elements when the user indicates they have or don't have an account */
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


    /* Using state hooks to keep track of the form's data, the form's validity and if there is an error in the form */
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
        }
    })
    const [isFormValid, setIsFormValid] = useState(false)
    const [formError, setFormError] = useState({
        message: 'Veuillez remplir le formulaire.',
        sendAttempted: false,
    })
    const [isLoading, setIsLoading] = useState(false)


    /* Storing the regular expressions in an object to use them and find them more efficiently */
    const regex = {
        username: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿÔ-]{3,14}$/g,
        email: /^[\w-.+ÔÀ-ÖØ-öø-ÿ]{1,64}@[\w-ÔÀ-ÖØ-öø-ÿ]{1,255}.+[\w-]{2,4}$/g,
        password: /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$/g
    }
    /* Helper function to validate one of the form's fields */
    const validateField = (name, value) => {
        let fieldIsValid = false

        /* If the field is the password verification, check if the value is the same as the entered password */
        if(name === 'verification') {
            value === formData.password.value   ? fieldIsValid = true
                                                : fieldIsValid = false
        }
        /* Otherwise, simply check the entered value against the appropriate regex */
        else {
            regex[name].test(value) ? fieldIsValid = true
                                    : fieldIsValid = false
        }

        /* Then return a boolean that indicates if the input is valid */
        return fieldIsValid
    }
    /* Helper function to validate the entire form */
    const validateForm = () => {
        /* We simply check if every field is valid. If not, we register an error. */
        if(formData.username.valid
        && formData.email.valid
        && formData.password.valid
        && formData.verification.valid) {
            setIsFormValid(true)
        } else {
            setFormError({ message:'Les données rentrées sont invalides' })
            setIsFormValid(false)
        }                                       
    }
      
    
    /* Helper function to deal with changes to the form's data */
    const handleFormChange = (event) => {
        const { name, value } = event.target

        /* If the modified field is the verification, we simply update it. Otherwise, we update the target field */
        /* and then we check if the verification field is still valid */
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

        /* We then verify the entire form's validity */
        validateForm()
    }

    /* We make use of a useEffect hook to make sure the formData and isFormValid states are always updated to the latest input */
    useEffect(() => {
        setFormData(formData)
    }, [formData])
    
    /* Helper function to deal with the form confirmation */   
    const handleFormSend = async (event) => {
        event.preventDefault()

        /* We toggle the loading screen */
        setIsLoading(true)

        /* We check the entered form data to validate it */
        const formValidity = formData.username.valid && formData.email.valid && formData.password.valid && formData.verification.valid

    
        /* We create additionnal helper functions to avoid repetition and help the code be readable */
        const handleSuccessfulFormSend = () => {
            setFormError({ ...formError, sendAttempted: true })
            setIsFormValid(true)
            setIsLoading(false)
        }
        const handleUnsuccessfulFormSend = (result) => {
            setFormError({ message: result.message, sendAttempted: true })
            setIsFormValid(false)
            setIsLoading(false)
        }
        const wasFormChanged = (formData) => {
            let formWasChanged = formData.username.changed && formData.email.changed && formData.password.changed && formData.verification.changed
            return formWasChanged
        }


        /* We check if the user has an account, and if so, if the email and password entered are valid */
        if(hasAccount && formData.email.valid && formData.password.valid) {
            const result = await logInHelper(formData.email.value, formData.password.value)

            if(result.success) {
                navigate('/dashboard')
                handleSuccessfulFormSend()
            } else {
                handleUnsuccessfulFormSend(result)
            } 

        /* If the user doesn't have an account, we check the entire form's validity */
        } else if(!hasAccount && formValidity) {
            const result = await signUpHelper(formData.username.value, formData.email.value, formData.password.value)

            if(result.success) {
                navigate('/dashboard')
                handleSuccessfulFormSend()
            } else {
                handleUnsuccessfulFormSend(result)
            } 

        /* If the form isn't valid at all, we check if it was changed */
        } else if(!formValidity && wasFormChanged(formData)) {
            setFormError({ message:'Les données rentrées sont invalides', sendAttempted: true })
            setIsFormValid(false)
            setIsLoading(false)

        /* If it was changed but is still invalid, we register an error */
        } else {
            setFormError({ ...formError, sendAttempted: true })
            setIsFormValid(false)
            setIsLoading(false)
        }
    }



    return  <div className={ classes.root }>
                <LoadingScreen isActive={ isLoading } startsActivated={ false } />

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



                <form className={ classes.formRoot } onSubmit={ handleFormSend }>

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

                        {/* An error message that displays only when needed */}
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

                        {/* An error message that displays only when needed */}
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

                        {/* An error message that displays only when needed */}
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

                        {/* An error message that displays only when needed */}
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

                    {/* An error message that displays only when needed */}
                    {/* The message has variable content depending on the error detected within the form */}
                    <motion.p className={ classes.invalidForm }
                                initial={{ visibility: "hidden", opacity: 0 }}
                                animate={ !isFormValid && formError.sendAttempted
                                    ? { visibility: "visible", opacity: 1 }
                                    : { visibility: "hidden", opacity: 0 }}
                                transition={{
                                    duration: .4,
                                    opacity: { delay: 0 },
                                    visibility: { delay: isFormValid && !formError.sendAttempted ? .4 : 0},
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
                        onClick={ handleFormSend }
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