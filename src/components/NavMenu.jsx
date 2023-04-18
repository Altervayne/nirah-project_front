import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { BiExit } from "react-icons/bi"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
            position: "absolute",
            left: "0",
            top: "0",

			display: "flex",
            flexDirection: "column",
			alignItems: "center",
            boxSizing: "border-box",

            height: "100%",
            width: "20%",
			padding: "5px 0",
            zIndex: "1",

			backgroundColor: "#121420",
			boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",

            [theme.breakpoints.down('sm')]: {
				paddingTop: theme.spacing(8),	
			},
			[theme.breakpoints.up('sm')]: {
				paddingTop: theme.spacing(6),	
			},
			[theme.breakpoints.up('md')]: {
				paddingTop: theme.spacing(8),	
			}
		},
        currentUserRoot: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: "75%",
            height: theme.spacing(6),
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        currentUserName: {
            color: "#F2F4F8",
            fontSize: theme.typography.pxToRem(26),
        },
        currentUserDisconnectRoot: {
            cursor: "pointer",
        },
        currentUserDisconnect: {
            fontSize: theme.typography.pxToRem(30),
        },
        roomJoinForm: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",

            width: "75%",
        },
        formInput: {
            width: "100%",
            height: "40px",

            border: "none",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
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
            overflow: "visible",
            whiteSpace: "nowrap",

            fontSize: theme.typography.pxToRem(15)
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
        formButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: theme.typography.pxToRem(15),
            fontWeight: 600,
            fontFamily: "Helvetica",

            width: "50%",
            height: "40px",
            padding: "0 10px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            outline: "none",
            border: "none",

            color: "#F2F4F8",
            backgroundColor: "#1B2432",

            cursor: "pointer",
        },
	}
})



const NavMenu = () => {
	const { classes } = useStyles()

	return  <nav className={ classes.root }>
                <div className={ classes.currentUserRoot }>
                    <p className={ classes.currentUserName }>USERNAME</p>
                    <motion.div className={ classes.currentUserDisconnectRoot }
                        initial={{ color: "#F2F4F8", scale: 1 }}
                        whileHover={{ color: "#ED872D", scale: 1.15 }}
                    >
                        <BiExit className={ classes.currentUserDisconnect } onClick={() => window.location.href = "/"} />
                    </motion.div>
                </div>

                <form className={ classes.roomJoinForm }>
                    <div className={ classes.inputContainer }>
                        <label className={ classes.inputLabel } for="join-field">Rejoindre ou Créer un Salon</label>
                        <input className={ classes.formInput } id="join-field" type="text"/>
                    </div>
                    
                    <motion.button className={ classes.formButton }
                            onClick={() => (window.location.href = "/room/ID_HERE")}
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
                </form>
            </nav>
}



export default NavMenu