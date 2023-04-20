import React, { useState } from "react"
import { useMediaQuery } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { useTheme } from "@mui/material"
import { motion } from "framer-motion"
import { RxExit } from "react-icons/rx"
import UsersList from "./UsersList"
import { BiMenu } from "react-icons/bi"



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
            maxHeight: "100%",
			padding: "5px 0",
            paddingBottom: theme.spacing(4),
            zIndex: 2,

			backgroundColor: "#121420",
			boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",

            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",

            "&::-webkit-scrollbar": {
                boxSizing: "border-box",

                backgroundColor: "transparent",

                borderRadius: theme.spacing(2),
                width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(194, 212, 235, 0.3)",
                maxWidth: "10px",
                borderRadius: theme.spacing(2),
            },
            "&::-webkit-scrollbar-track-piece:end": {
                marginBottom: theme.spacing(1),
            },
            "&::-webkit-scrollbar-track-piece:start": {
                marginTop: theme.spacing(10),
            },

            [theme.breakpoints.down('sm')]: {
				paddingTop: theme.spacing(9),	
			},
			[theme.breakpoints.up('sm')]: {
				paddingTop: theme.spacing(7),	
			},
			[theme.breakpoints.up('md')]: {
                width: "30%",
				paddingTop: theme.spacing(9),	
			},
            [theme.breakpoints.up('lg')]: {
				width: "20%",	
			},
		},
        navMenuButton: {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 5,
            
            borderRadius: theme.spacing(1),
            outline: "none",
            border: "none",

            margin: theme.spacing(1),

            height: theme.spacing(5),
            width: theme.spacing(5),

            backgroundColor: "#1B2432",
            color: "#F2F4F8",

            cursor: "pointer",
        },
        navMenuButtonIcon: {
            fontSize: theme.typography.pxToRem(24),
        },
        navMenuBackgroundFade: {
            position: "fixed",
            zIndex: 2,
            top: 0,
            left: 0,

            height: "100%",
            width: "100%",

            backgroundColor: "rgba(0, 0, 0, .5)"
        },
        currentUserRoot: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            boxSizing: "border-box",

            marginBottom: theme.spacing(4),

            width: "75%",
            height: "12%",
            maxHeight: "12%",
        },
        currentUserName: {
            color: "#F2F4F8",
            fontSize: theme.typography.pxToRem(24),

            textOverflow: "ellipsis",
            overflow: "hidden",
        },
        currentUserDisconnectRoot: {
            cursor: "pointer",
        },
        currentUserDisconnect: {
            fontSize: theme.typography.pxToRem(30),
        },
        roomIdAndFormContainer: {
            display: "flex",
            alignItems: "center",

            boxSizing: "border-box",

            marginBottom: theme.spacing(4),

            width: "75%",
            height: "20%",
            maxHeight: "20%",
        },
        roomJoinForm: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",

            width: "100%",
            
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
            minWidth: theme.spacing(8),
            height: "40px",
            padding: "0 10px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            outline: "none",
            border: "none",

            color: "#F2F4F8",
            backgroundColor: "#1B2432",

            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "hidden",

            cursor: "pointer",
        },
        roomIdContainer: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",

            width: "100%"
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

            fontSize: theme.typography.pxToRem(18),
            width: "100%",
            minHeight: "40px",

            backgroundColor: "rgba(27, 36, 50, .7)",
            color: "#F2F4F8",
        },
	}
})



const NavMenuContent = ({ isChatRoom, chatRoomId }) => {
    const { classes } = useStyles()
    const [chosenRoomId, setChosenRoomId] = useState('test')
    const handleChosenRoomIdChange = (e) => {
        setChosenRoomId(e.target.value)
    }

    return  <>
                <div className={ classes.currentUserRoot }>
                    <p className={ classes.currentUserName }>USERNAME</p>
                    <motion.div className={ classes.currentUserDisconnectRoot }
                        initial={{ color: "#F2F4F8", scale: 1 }}
                        whileHover={{ color: "#ED872D", scale: 1.15 }}
                    >
                        <RxExit className={ classes.currentUserDisconnect } onClick={() => window.location.href = "/"} />
                    </motion.div>
                </div>

                <div className={ classes.roomIdAndFormContainer }>
                    { !isChatRoom ? 
                        <form className={ classes.roomJoinForm }>
                            <div className={ classes.inputContainer }>
                                <label className={ classes.formLabel } for="join-field">Rejoindre ou Créer un Salon</label>
                                <motion.input className={ classes.formInput } placeholder="Entrez l'ID..." id="join-field" type="text" value={ chosenRoomId }
                                    onChange={ handleChosenRoomIdChange }
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
                </div>

                { isChatRoom ? <UsersList listType="members" /> : <UsersList listType="friends" /> }
            </>
}



const NavMenu = ({ isChatRoom, chatRoomId }) => {
	const { classes } = useStyles()
    const [isOpen, setIsOpen] = useState(false)

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))

	return  ( isSmallScreen ? 
                <>
                    <motion.button className={ classes.navMenuButton }
                        onClick={() => setIsOpen(!isOpen)}
                        initial={{ color: "#F2F4F8", scale: 1 }}
                        animate={{ color: isOpen ? "#ED872D" : "#F2F4F8" }}
                        whileHover={{ color: "#ED872D", scale: 1.1 }}
                        whileTap={{ color: "#F2F4F8", scale: .95 }}
                    >
                        <BiMenu className={ classes.navMenuButtonIcon }/>
                    </motion.button>
                    <motion.div className={ classes.navMenuBackgroundFade }
                        initial={{
                            visibility: "hidden",
                            display: "none",
                            opacity: 0,
                        }}
                        animate={ isOpen ? {
                            visibility: "visible",
                            display: "block",
                            opacity: 1,
                        } : {
                            visibility: "hidden",
                            display: "none",
                            opacity: 0,
                        } }
                        transition={{
                        duration: .5,
                        visibility: {
                            delay: !isOpen ? .5 : 0
                        },
                        display: {
                            delay: !isOpen ? .5 : 0
                        }}}/>
                    <motion.nav className={ classes.root }
                        initial={{
                            visibility: "hidden",
                            display: "none",
                            width: "0",
                        }}
                        animate={ isOpen ? {
                            visibility: "visible",
                            display: "flex",
                            width: "50%",
                        } : {
                            visibility: "hidden",
                            display: "none",
                            width: "0",
                        } }
                        transition={{
                        duration: .5,
                        visibility: {
                            delay: !isOpen ? .5 : 0
                        },
                        display: {
                            delay: !isOpen ? .5 : 0
                        }
                    }}>
                        <NavMenuContent isChatRoom={ isChatRoom } chatRoomId={ chatRoomId } />
                    </motion.nav>
                </>
            : 
                <nav className={ classes.root }>
                    <NavMenuContent isChatRoom={ isChatRoom } chatRoomId={ chatRoomId } />
                </nav>  

    )
}



export default NavMenu