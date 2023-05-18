/* Libraries imports */
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "tss-react/mui"
/* Icons imports */
import { BiMenu, BiPowerOff } from "react-icons/bi"
/* Components imports */
import OptionsMenu from "./OptionsMenu"
import UsersList from "./UsersList"
/* Helper functions imports */
import { logOutHelper } from "../helpers/authFormHelper"
import { socketLeaveHandler, socketDisconnectHandler } from "../helpers/socketHandler"



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
        navMenuButtonIcon: { 
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(32),	
			},
			[theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(24),	
			},
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

            marginTop: theme.spacing(4),

            width: "75%",
            height: "12%",
            maxHeight: "6%",
        },
        currentUserName: {
            color: "#F2F4F8",
            fontSize: theme.typography.pxToRem(24),

            textOverflow: "ellipsis",
            overflow: "hidden",

            margin: 0,
        },
        currentUserButtonsRoot: {
            display: "flex",
            alignItems: "center",
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
        roomIdAndFormContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxSizing: "border-box",

            marginTop: theme.spacing(4),

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
        invalidInput: {
            color: "#DF4661",

            width: "100%",

            boxSizing: "border-box",

            fontSize: theme.typography.pxToRem(13),
            padding: "0 10px",
            marginTop: theme.spacing(.5),
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



const NavMenuContent = ({ setUsersState, isChatRoom, chatRoomId, usersArray, currentUserInfo, setIsLoading }) => {
    const { classes } = useStyles()
    const navigate = useNavigate()

    
    const [chosenRoomId, setChosenRoomId] = useState({ valid: false, value: '', changed: false, error: '' })
    const handleChosenRoomIdChange = (event) => {
        const newValue = event.target.value
        const roomIdRegex = /^\d{1,6}$/

        if(newValue === '0') {
            setChosenRoomId({ valid: false, value: newValue, changed: true, error: "L'identifiant ne peut être 0" })
        } else if(roomIdRegex.test(newValue)) {
            setChosenRoomId({ valid: true, value: newValue, changed: true, error: '' })
        } else {
            setChosenRoomId({ valid: false, value: newValue, changed: true, error: "L'identifiant doit être un nombre d'entre 1 et 6 chiffres" })
        }
    }
    

    /* This block handles basic connection logic */
    const handleDisconnect = async (event) => {
        event.preventDefault()

        socketDisconnectHandler()
        await logOutHelper()

        navigate('/')
    }
    const handleRoomJoin = async (event) => {
        event.preventDefault()

        if(chosenRoomId.valid){
            navigate(`/room/${chosenRoomId.value}`)
        }       
    }
    const handleRoomLeave = async (event) => {
        event.preventDefault()

        const userLeft = await socketLeaveHandler()

        if(userLeft) {
            navigate('/dashboard')
        } else {
            console.log("There was an issue with leaving the room, please wait and try again.")
        }
    }
    

    return  <>         
                <div className={ classes.roomIdAndFormContainer }>
                    { !isChatRoom ? 
                        <>
                            <form className={ classes.roomJoinForm } onSubmit={ handleRoomJoin }>
                                <div className={ classes.inputContainer }>
                                    <label className={ classes.formLabel } htmlFor="join-field">Rejoindre ou Créer un salon</label>
                                    <motion.input className={ classes.formInput } placeholder="Entrez l'ID..." id="join-field" type="text" value={ chosenRoomId.value }
                                        onChange={ handleChosenRoomIdChange }
                                        initial={{ backgroundColor: "#F2F4F8" }}
                                        whileFocus={{ backgroundColor: "#C2D4EB" }}
                                    />
                                </div>
                                
                                <motion.button className={ classes.formButton }
                                        onClick={ handleRoomJoin }
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
                            <motion.p className={ classes.invalidInput }
                            initial={{ visibility: "hidden", display: "none", opacity: 0 }}
                            animate={ !chosenRoomId.valid && chosenRoomId.changed
                                ? { visibility: "visible", display: "block", opacity: 1 }
                                : { visibility: "hidden", display: "none", opacity: 0 }}
                            transition={{
                                duration: .2,
                                opacity: { delay: !chosenRoomId.valid ? .2 : 0},
                                visibility: { delay: chosenRoomId.valid ? .2 : 0},
                                display: { delay: .2 }
                                }}>{ chosenRoomId.error }</motion.p>
                        </>
                    : 
                        <div className={ classes.roomIdContainer }>
                            <div className={ classes.inputContainer }>
                                <p className={ classes.formLabel }>Identifiant du Salon</p>
                                <h2 className={ classes.roomIdNumber }>{ chatRoomId }</h2>
                            </div>
                        
                            <motion.button className={ classes.formButton }
                                    onClick={ handleRoomLeave }
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

                { isChatRoom    ? <UsersList setUsersState={ setUsersState } listType="members" usersArray={ usersArray } currentUserInfo={ currentUserInfo } />
                                : <UsersList setUsersState={ setUsersState } listType="friends" usersArray={ usersArray } currentUserInfo={ currentUserInfo } /> }

                <div className={ classes.currentUserRoot }>
                    <p className={ classes.currentUserName }>{ currentUserInfo.username }</p>
                    <div className={ classes.currentUserButtonsRoot }>
                        <motion.button className={ classes.currentUserButton }
                            onClick={ handleDisconnect }
                            initial={{ color: "#F2F4F8", scale: 1 }}
                            whileHover={{ color: "#ED872D", scale: 1.15 }}
                        >
                            <BiPowerOff className={ classes.currentUserButtonIcon } />
                        </motion.button>

                        <OptionsMenu optionsType={ "userOptions" } setIsLoading={ setIsLoading }/>
                    </div>
                </div>
            </>
}



const NavMenu = ({ setUsersState, isChatRoom, chatRoomId, usersArray, currentUserInfo, setIsLoading }) => {
	const { classes } = useStyles()
    const [isOpen, setIsOpen] = useState(false)

    const handleWindowClick = (event) => { event.stopPropagation() }

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const isPhoneScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
                        onClick={() => setIsOpen(false)}
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
                        onClick={ handleWindowClick }
                        initial={{
                            visibility: "hidden",
                            display: "none",
                            width: "0",
                        }}
                        animate={ isOpen ? {
                            visibility: "visible",
                            display: "flex",
                            width: isPhoneScreen ? "100%" : "50%" ,
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
                        <NavMenuContent setUsersState={ setUsersState }
                                        isChatRoom={ isChatRoom }
                                        chatRoomId={ chatRoomId }
                                        usersArray={ usersArray }
                                        currentUserInfo={ currentUserInfo }
                                        setIsLoading={ setIsLoading } />
                    </motion.nav>
                </>
            : 
                <nav className={ classes.root }>
                    <NavMenuContent setUsersState={ setUsersState }
                                    isChatRoom={ isChatRoom }
                                    chatRoomId={ chatRoomId }
                                    usersArray={ usersArray }
                                    currentUserInfo={ currentUserInfo }
                                    setIsLoading={ setIsLoading } />
                </nav>  

    )
}



export default NavMenu