/* Libraries imports */
import React from "react"
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
/* Helper functions imports */
import { handleFriendRequest, handleFriendsUpdate } from "../helpers/friendRequestHelper"
import { socketFriendRequestHandler } from "../helpers/socketHandler"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
            cursor: "pointer",

            backgroundColor: "none",
            background: "none",
            outline: "none",
            border: "none",

            padding: "0",

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
        },
        userStateIconPassive: {
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


    const addFriendHandler = async (event) => {
        event.preventDefault()

        const requestWasSent = await handleFriendRequest(userId, "sendRequest")

        if(requestWasSent) {
            socketFriendRequestHandler(userId, "send")
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
            socketFriendRequestHandler(userId, "accept")
            handleFriendsUpdate(userId, username, "requestsReceived", "friends", usersArray, setUsersState)
        } else if(requestWasSent && !requestWasAccepted) {
            socketFriendRequestHandler(userId, "reject")
            handleFriendsUpdate(userId, username, "requestsReceived", "normalUsers", usersArray, setUsersState)
        } else {
            console.log("The request could not be sent or the requestWasAccepted value is invalid.")
        }
    }

    const handleJoinFriend = (event, roomId) => {
        event.preventDefault()

        navigate(`/room/${roomId}`)
    }


    return  <div className={ classes.root }>
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
                            <div className={ classes.userStateIconContainerPassive }>
                                <BsPersonFillCheck className={ classes.userStateIconPassive } />
                            </div> }


                    
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
                        </> }


                    { friendState !== "requestReceived" && friendState !== "requestSent" && !isOnline && isFriendsList &&
                        <div className={ classes.userStateIconContainerPassive }>
                            <RiChatOffLine className={ classes.userStateIconPassive }/>
                        </div> }



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