import React from "react"
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

            width: "100%",
        },
        formInput: {
            width: "100%",
            height: "75%",

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

            margin: "10px 0",
            width: "75%",
            height: "55px",
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
                        <label className={ classes.inputLabel } for="nickname-field">Pseudonyme</label>
                        <input className={ classes.formInput } id="nickname-field" type="text"/>
                    </motion.div>
                    <div className={ classes.inputContainer }>
                        <label className={ classes.inputLabel } for="email-field">Adresse mail</label>
                        <input className={ classes.formInput } id="email-field" type="email"/>
                    </div>
                    <div className={ classes.inputContainer }>
                        <label className={ classes.inputLabel } for="password-field">Mot de passe</label>
                        <input className={ classes.formInput } id="password-field" type="password"/>
                    </div>
                    <motion.div className={ classes.inputContainer }
                        initial="rest"
                        animate="fade"
                        variants={ fadeInAndOutNoAccount }
                    >
                        <label className={ classes.inputLabel } for="verify-field">Vérifiez votre mot de passe</label>
                        <input className={ classes.formInput } id="verify-field" type="password"/>
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