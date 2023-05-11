import React, { useEffect, useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { BiCookie } from "react-icons/bi"




const useStyles = makeStyles()((theme) => {
	return {
		root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            padding: theme.spacing(2),

            backgroundColor: "#1B2432",
            boxShadow: "0 0 10px rgba(0, 0, 0, .25)",

            position: "fixed",
            zIndex: 99,

            [theme.breakpoints.down('sm')]: {
                width: "100%",

                borderRadius: "0",

				bottom: "0",	
			},
			[theme.breakpoints.up('sm')]: {
                width: "auto",

                borderRadius: theme.spacing(2),

				bottom: theme.spacing(6),	
			},
		},
        titleRoot: {
            display: "flex",
            alignItems: "center",

            color: "#C2D4EB",
        },
        titleLogo: {
            fontSize: theme.typography.pxToRem(42),
            

            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(2),
                fontSize: theme.typography.pxToRem(32),	
			},
			[theme.breakpoints.up('sm')]: {
                marginRight: theme.spacing(4),
                fontSize: theme.typography.pxToRem(34),	
			},
			[theme.breakpoints.up('md')]: {
				fontSize: theme.typography.pxToRem(42),	
			}
        },
        titleText: {
            margin: "0",

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(18),	
			},
			[theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(22),	
			},
			[theme.breakpoints.up('md')]: {
				fontSize: theme.typography.pxToRem(24),	
			}
        },
        textRoot: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            textAlign: "center",
            textOverflow: "wrap",

            padding: theme.spacing(2),
        },
        text: {
            fontSize: theme.typography.pxToRem(14),
            color: "#F2F4F8",

            margin: "0",
        },
        understoodButton: {
            display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",

			width: theme.spacing(16),
			height: theme.spacing(5),
			borderRadius: theme.spacing(1.5),

            outline: "none",
            border: "none",

			backgroundColor: "#121420",
			color: "#F2F4F8",

			fontFamily: "Helvetica",
			fontWeight: 600,
			fontSize: theme.typography.pxToRem(16),

			cursor: "pointer",
        },
	}
})



const CookiePrompt = () => {
    const { classes } = useStyles()  

    const [isOpen, setIsOpen] = useState(false)


    
    const handleCookieUnderstand = (event) => {
        event.preventDefault()

        window.localStorage.setItem("cookiesAccepted", true)
        setIsOpen(false)
    }



    useEffect(() => {
        const areCookiesAccepted = window.localStorage.getItem("cookiesAccepted")

        if(!areCookiesAccepted) {
            setIsOpen(true)
        }
    }, [setIsOpen])



    return  <motion.div className={ classes.root }
                initial={{ scale: 0 }}
                animate={{
                    scale: isOpen ? 1 : 0,
                    visibility: isOpen ? "visible" : "hidden"
                }}
                transition={{
                    duration: .2,
                    visibility: {
                        delay: !isOpen ? 0.2 : 0
                    }
                }}
            >
                <div className={ classes.titleRoot }>
                    <BiCookie className={ classes.titleLogo } />
                    <h2 className={ classes.titleText }>Nirah utilise les cookies</h2>
                </div>
                <div className={ classes.textRoot }>
                    <p className={ classes.text }>Pour votre sécurité, Nirah utilise un cookie d'authentification obligatoire.</p>
                    <p className={ classes.text }>En utilisant Nirah, vous acceptez l'utilisation de ce cookie.</p>
                </div>
                <motion.button className={ classes.understoodButton }
                    onClick={ handleCookieUnderstand }
                    whileHover={{
                        scale: 1.05,
                        color: "#ED872D",
                        transition: {
                            duration: 0.1
                        }
                    }}
                >
                    J'ai compris
                </motion.button>     
            </motion.div>
}



export default CookiePrompt