/* Libraries imports */
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
/* React-icons imports */
import { BsPersonFillUp } from "react-icons/bs"
import { BsPersonFillAdd } from "react-icons/bs"
import { BsPersonFillCheck } from "react-icons/bs"
import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"
import { RxEnter } from "react-icons/rx"
import { RiChatOffLine } from "react-icons/ri"
import { TiDelete } from "react-icons/ti"
/* Helper functions imports */
import { handleFriendRequest, handleFriendsUpdate } from "../helpers/friendRequestHelper"
import { socketFriendRequestHandler } from "../helpers/socketHandler"
/* Components imports */
import RemoveFriendOverlay from "./RemoveFriendOverlay"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            backgroundColor: "rgba(27, 36, 50, 1)",

            boxSizing: "border-box",
            width: "100%",

            [theme.breakpoints.down('sm')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),       
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
            },

            "&:hover": {
                backgroundColor: "rgba(36, 47, 66, 1)",
            }
        },
        userUsername: {
            margin: "10px 0",
            
            textOverflow: "ellipsis",
            overflow: "hidden",

            color: "#F2F4F8",

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(20),
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(18),    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(16),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(18),
            }
        },
        userUsernameOffline: {
            margin: "10px 0",

            textOverflow: "ellipsis",
            overflow: "hidden",

            color: "#C2D4EB",
            opacity: .5,

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(20),
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(18),      
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(16),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(18),
            }
        },
        userStateContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            height: "100%",
            width: "auto",

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(22),
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(20),    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(18),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(20),
            }
        },
        userStateIconContainerButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            backgroundColor: "none",
            background: "none",
            outline: "none",
            border: "none",

            padding: "0",
            marginLeft: theme.spacing(1),

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(22),
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: theme.typography.pxToRem(20),    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(18),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(20),
            }
        },
        userStateIconActive: {
            display: "flex",
            alignItems: "center",
        },
        userStateIconPassive: {
            display: "flex",
            alignItems: "center",

            color: "#C2D4EB",
            opacity: .5,
        },
        requestReceivedIcons: {
            marginLeft: theme.spacing(1),
        },
    }
})



const UserEntry = ({ setUsersState, usersArray, username, userId, friendState, isFriendsList, isOnline, currentRoom }) => {
    const { classes } = useStyles()
    const navigate = useNavigate()


    const [overlayOpen, setOverlayOpen] = useState(false)


    const addFriendHandler = async (event) => {
        event.preventDefault()

        const requestWasSent = await handleFriendRequest(userId, "sendRequest")

        if(requestWasSent) {
            socketFriendRequestHandler(userId, "sendRequest")
            handleFriendsUpdate(userId, username, "normalUsers", "requestsSent", usersArray, setUsersState)
        }
    }

    const requestResponseHandler = async (event, response) => {
        event.preventDefault()

        const requestWasAccepted = response
        let requestResponse = ""

        requestWasAccepted ? requestResponse = "acceptRequest" : requestResponse = "rejectRequest"

        const requestWasSent = await handleFriendRequest(userId, requestResponse)



        if(requestWasSent && requestWasAccepted) {
            socketFriendRequestHandler(userId, requestResponse)
            handleFriendsUpdate(userId, username, "requestsReceived", "friends", usersArray, setUsersState)
        } else if(requestWasSent && !requestWasAccepted) {
            socketFriendRequestHandler(userId, requestResponse)
            handleFriendsUpdate(userId, username, "requestsReceived", "normalUsers", usersArray, setUsersState)
        }
    }

    const handleJoinFriend = (event, roomId) => {
        event.preventDefault()

        navigate(`/room/${roomId}`)
    }


    return  <div className={ classes.root } >
                <RemoveFriendOverlay    userId={ userId } 
                                        username={ username }
                                        usersArray={ usersArray }
                                        setUsersState={ setUsersState }
                                        isOpen={ overlayOpen }
                                        setIsOpen={ setOverlayOpen }/>


                <p className={ isOnline ? classes.userUsername : classes.userUsernameOffline }>{ username }</p>
                <div className={ classes.userStateContainer }>



                    {/* Room Members List block */}

                    { friendState === "notFriend" && !isFriendsList && 
                            <motion.button className={ classes.userStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <BsPersonFillAdd className={ classes.userStateIconActive } onClick={ addFriendHandler } />
                            </motion.button> }


                    { friendState === "isFriend" && !isFriendsList && 
                            <>
                                <div className={ classes.userStateIconContainerPassive }>
                                    <BsPersonFillCheck className={ classes.userStateIconPassive } />
                                </div>
                                <motion.button className={ classes.userStateIconContainerButton }
                                    initial={{ color: "#F2F4F8", scale: 1 }}
                                    whileHover={{ color: "#ED872D", scale: 1.15 }}
                                >
                                    <TiDelete className={ classes.userStateIconActive } onClick={() => setOverlayOpen(true)} />
                                </motion.button>
                            </> }


                    
                    {/* Friends List block */}                    

                    { friendState !== "requestReceived" && friendState !== "requestSent" && isOnline && isFriendsList &&
                        <>{ currentRoom === 0   ?   <div className={ classes.userStateIconContainerPassive }>
                                                        <RxEnter className={ classes.userStateIconPassive } />
                                                    </div>

                                                :   <motion.button className={ classes.userStateIconContainerButton }
                                                        initial={{ color: "#F2F4F8", scale: 1 }}
                                                        whileHover={{ color: "#ED872D", scale: 1.15 }}
                                                    >
                                                        <RxEnter className={ classes.userStateIconActive } onClick={(event) => handleJoinFriend(event, currentRoom)} />
                                                    </motion.button> }

                                                    <motion.button className={ classes.userStateIconContainerButton }
                                                        initial={{ color: "#F2F4F8", scale: 1 }}
                                                        whileHover={{ color: "#ED872D", scale: 1.15 }}
                                                    >
                                                        <TiDelete className={ classes.userStateIconActive } onClick={() => setOverlayOpen(true)} />
                                                    </motion.button>
                        </> }


                    { friendState !== "requestReceived" && friendState !== "requestSent" && !isOnline && isFriendsList &&
                        <>
                            <div className={ classes.userStateIconContainerPassive }>
                                <RiChatOffLine className={ classes.userStateIconPassive }/>
                            </div>

                            <motion.button className={ classes.userStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <TiDelete className={ classes.userStateIconActive } onClick={() => setOverlayOpen(true)} />
                            </motion.button>
                        </> }



                    {/* General Block */}

                    { friendState === "requestReceived" && 
                            <>
                            <motion.button className={ classes.userStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <FaCheck className={ classes.requestReceivedIcons } onClick={(event) => requestResponseHandler(event, true)} />
                            </motion.button>
                            <motion.button className={ classes.userStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <FaTimes className={ classes.requestReceivedIcons } onClick={(event) => requestResponseHandler(event, false)} />
                            </motion.button> 
                            </> }

                    { friendState === "requestSent" && 
                            <div className={ classes.userStateIconContainerPassive }>
                                <BsPersonFillUp className={ classes.userStateIconPassive } />
                            </div> }
                    
                </div>
            </div>
}



export default UserEntry