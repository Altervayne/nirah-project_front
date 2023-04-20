import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { RxExit } from "react-icons/rx"
import FriendsList from "./FriendsList"
import MembersList from "./MembersList"



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
            marginBottom: theme.spacing(8),
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
        formLabel: {
            color: "#C2D4EB",
            margin: "2px 10px",

            boxSizing: "border-box",
            overflow: "visible",
            whiteSpace: "nowrap",

            fontSize: theme.typography.pxToRem(15),
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
        roomIdContainer: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",

            width: "70%",
            marginBottom: theme.spacing(8),
        },
        roomIdNumber: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            position: "relative",
            boxSizing: "border-box",

            paddingLeft: theme.spacing(2),
            margin: "0",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",

            width: "100%",
            minHeight: "40px",

            backgroundColor: "rgba(27, 36, 50, .7)",
            color: "#F2F4F8",
        },
	}
})



const NavMenu = ({ isChatRoom, chatRoomId }) => {
	const { classes } = useStyles()

	return  <nav className={ classes.root }>
                <div className={ classes.currentUserRoot }>
                    <p className={ classes.currentUserName }>USERNAME</p>
                    <motion.div className={ classes.currentUserDisconnectRoot }
                        initial={{ color: "#F2F4F8", scale: 1 }}
                        whileHover={{ color: "#ED872D", scale: 1.15 }}
                    >
                        <RxExit className={ classes.currentUserDisconnect } onClick={() => window.location.href = "/"} />
                    </motion.div>
                </div>

                { !isChatRoom ? 
                    <form className={ classes.roomJoinForm }>
                        <div className={ classes.inputContainer }>
                            <label className={ classes.formLabel } for="join-field">Rejoindre ou Créer un Salon</label>
                            <motion.input className={ classes.formInput } placeholder="Entrez l'ID..." id="join-field" type="text"
                                initial={{ backgroundColor: "#F2F4F8" }}
                                whileFocus={{ backgroundColor: "#C2D4EB" }}
                            />
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
                : 
                    <div className={ classes.roomIdContainer }>
                        <div className={ classes.inputContainer }>
                            <p className={ classes.formLabel }>Identifiant du Salon</p>
                            <h2 className={ classes.roomIdNumber }>{ chatRoomId }</h2>
                        </div>
                    
                        <motion.button className={ classes.formButton }
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
                                Quitter
                        </motion.button>
                    </div>
                }

                { isChatRoom ? <MembersList /> : <FriendsList /> }
            </nav>
}



export default NavMenu