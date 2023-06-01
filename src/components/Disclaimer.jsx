import React, { useEffect, useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { RiErrorWarningLine } from "react-icons/ri"




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
            zIndex: 100,

            [theme.breakpoints.down('sm')]: {
                width: "100%",

                borderRadius: "0",

				bottom: "0",	
			},
			[theme.breakpoints.up('sm')]: {
                width: "50%",

                borderRadius: theme.spacing(2),

				bottom: theme.spacing(4),	
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
        importantText: {
            fontSize: theme.typography.pxToRem(18),
            fontWeight: 600,
            color: "#F2F4F8",

            marginBottom: theme.spacing(2),
        },
        text: {
            fontSize: theme.typography.pxToRem(14),
            color: "#F2F4F8",

            whiteSpace: "wrap",
            overflow: "wrap",

            margin: "0",
        },
        contactEmail: {
            color: "#ED872D",
            fontWeight: 600,
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



const Disclaimer = () => {
    const { classes } = useStyles()  

    const [isOpen, setIsOpen] = useState(false)


    
    const handleDisclaimerUnderstand = (event) => {
        event.preventDefault()

        window.localStorage.setItem("disclaimerAccepted", true)
        setIsOpen(false)
    }



    useEffect(() => {
        const disclaimerWasAccepted = window.localStorage.getItem("disclaimerAccepted")

        if(!disclaimerWasAccepted) {
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
                    <RiErrorWarningLine className={ classes.titleLogo } />
                    <h2 className={ classes.titleText }>Nirah est un projet personnel</h2>
                </div>
                <div className={ classes.textRoot }>
                    <p className={ classes.importantText }>Je vous remercie d'être venu jeter un oeil à mon projet personnel, Nirah.</p>
                    <p className={ classes.text }>Avant de vous libérer, il est important que vous compreniez qu'en sa qualité de projet personnel à but éducatif, Nirah n'est en aucun cas un produit final, et vous ne devriez absolument pas utiliser Nirah dans son état actuel à des fins professionnelles. De plus, vous acceptez que Nirah soit susceptible de présenter des bugs et des erreurs. Pour m'informer des erreurs ou pour quelconque demande, vous pouvez me joindre sur <span className={ classes.contactEmail }>contact@nirah.fr</span>.</p>
                </div>
                <motion.button className={ classes.understoodButton }
                    onClick={ handleDisclaimerUnderstand }
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



export default Disclaimer