/* Libraries imports */
import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"
import { useParams, useNavigate } from "react-router-dom"
/* React-icons imports */
import { FaPaperPlane } from "react-icons/fa"
/* Components imports */
import LoadingScreen from "../components/LoadingScreen"
import NavMenu from "../components/NavMenu"
import Message from "../components/Message"
/* Helper functions imports */
import { socket, socketJoinHandler } from "../helpers/socketHandler"
import { getCurrentUserInfo } from "../helpers/userRequestHelper"
import { sortChatRoomMembers, getCurrentChatRoomInfo } from "../helpers/chatRoomHelper"




const useStyles = makeStyles()((theme) => {
	return {
		root: {
			width: "100%",
			height: "100%",
		},
		mainContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
            justifyContent: "flex-start",

			height: "100vh",
			maxHeight: "100vh",

            boxSizing: "border-box",

			position: "absolute",
			top: "0",
            right: "0",
			zIndex: "0",

            [theme.breakpoints.down('sm')]: {
				paddingTop: theme.spacing(10),
                paddingBottom: theme.spacing(9),
                width: "100%",	
			},
			[theme.breakpoints.up('sm')]: {
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(9),
				width: "100%",
			},
			[theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(10),
                paddingBottom: theme.spacing(9),
				width: "70%",
			},
			[theme.breakpoints.up('lg')]: {
                paddingBottom: theme.spacing(11),
				width: "80%",
			}
		},
        backgroundLogo: {
            position: "fixed",
            zIndex: 0,

            opacity: .05,

            [theme.breakpoints.down('sm')]: {
				top: theme.spacing(22),
				width: "90%",	
			},
			[theme.breakpoints.up('sm')]: {
                top: theme.spacing(22),
				width: "60%",
			},
			[theme.breakpoints.up('md')]: {
				width: "50%",
			},
			[theme.breakpoints.up('lg')]: {
				width: "40%",
			}
        },
        chatRoot: {
            position: "relative",

            boxSizing: "border-box",

            width: "93%",
            height: "100%",
            padding: theme.spacing(6),
            paddingRight: theme.spacing(7),
            paddingLeft: "0",

            overflowY: "scroll",

            "&::-webkit-scrollbar": {
                boxSizing: "border-box",

                backgroundColor: "rgba(194, 212, 235, 0.03)",

                borderRadius: theme.spacing(2),
                width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#C2D4EB",
                maxWidth: "10px",
                borderRadius: theme.spacing(2),
            },
        },
        introMessage: {
            textAlign: "center",
            
            width: "100%",

            color: "#C2D4EB",
            opacity: .5,
            fontWeight: 600,
            fontSize: theme.typography.pxToRem(26),
        },
        chatBarContainer: {
            display: "flex",
            justifyContent: "center",

            position: "fixed",
            right: 0,
            zIndex: 999,

            height: theme.spacing(6),

            [theme.breakpoints.down('sm')]: {
                bottom: theme.spacing(2),

                paddingTop: theme.spacing(10),
				width: "100%",
			},
			[theme.breakpoints.up('sm')]: {
                bottom: theme.spacing(2),

                paddingTop: theme.spacing(10),
				width: "100%",
			},
			[theme.breakpoints.up('md')]: {
                bottom: theme.spacing(2),

                paddingTop: theme.spacing(8),
				width: "70%",
			},
			[theme.breakpoints.up('lg')]: {
                bottom: theme.spacing(4),

                paddingTop: theme.spacing(10),
				width: "80%",
			}
        },
        chatBar: {
            border: "none",
            borderRadius: "10px",

            padding: "0 15px",
            marginRight: theme.spacing(2),

            boxSizing: "border-box",

            fontSize: theme.typography.pxToRem(16),
            backgroundColor: "#F2F4F8",
            color: "#121420",

            "&:focus": {
                outline: "none",
            },

            [theme.breakpoints.down('sm')]: {
				width: "82%",	
			},
			[theme.breakpoints.up('sm')]: {
                width: "87%",
			},
			[theme.breakpoints.up('md')]: {
                width: "86%",
			},
			[theme.breakpoints.up('lg')]: {
                width: "90%",
			}
        },
        chatBarSendButton: {
            borderRadius: "10px",
            outline: "none",
            border: "none",

            width: theme.spacing(6),

            backgroundColor: "#121420",
            color: "#F2F4F8",

            cursor: "pointer",
        },
        chatBarSendIcon: {
            fontSize: theme.typography.pxToRem(20),
        },
	}
})



const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={ elementRef } />
}



const ChatRoom = () => {
    const { classes } = useStyles() 
    const { id } = useParams()
    const navigate = useNavigate()


    /* This block is the general handler for displaying messages */
    /* The members state is an object containing four arrays, "friends", "requestsReceived", "requestsSent" and "normalUsers" */
    const [members, setMembers] = useState({
        friends: [],
        requestsReceived: [],
        requestsSent: [],
        normalUsers: [],
    })
    const [messages, setMessages] = useState([])
    const newMessageHandler = (newMessage) => {
        const newMessagesArray = [...messages, newMessage]
        setMessages(newMessagesArray)
    }


    /* This block handles writing and sending messages */
    const [currentMessage, setCurrentMessage] = useState("")
    const handleCurrentMessageChange = (event) => {
        setCurrentMessage(event.target.value)
    }
    const handleSendingMessage = (event) => {
        event.preventDefault()
        const message = {
            body: currentMessage,
            sender: { username: currentUser.username },
            createdAt: new Date(),
            fromServer: false
        }

        newMessageHandler(message)
        socket.emit("sendMessage", { message: message.body })

        setCurrentMessage("")
    }


    /* This block handles fetching the user's info and loading in the chatroom */
    const [isLoading, setIsLoading] = useState(true)
	const [currentUser, setCurrentUser] = useState({
		username: '',
		friendsList: [],
		requestsReceived: [],
		requestsSent: []
	})
  
    useEffect(() => {
		const connectUserToChat = async () => {
			const authenticatedUser = await getCurrentUserInfo()
            const chatRoomData = await getCurrentChatRoomInfo(id)
	
			if(!authenticatedUser) {
				navigate('/')	
			} else {
                const members = sortChatRoomMembers(authenticatedUser, chatRoomData.members)

				await setCurrentUser(authenticatedUser)
                await setMessages(chatRoomData.messages)
                await setMembers(members)

                socketJoinHandler(id)
                
				setIsLoading(false)
			}
		}

        const listenForSameRoomName = (data) => {
            console.log(data.message)
            navigate(`/room/${id}`)
        }
        
        const roomIdRegex = /^\d{1,6}$/

        if(roomIdRegex.test(`${id}`)) {
            socket.on("sameRoomName", listenForSameRoomName)
            connectUserToChat()
        } else {
            navigate('/dashboard')
        }
		
        return () => {
            socket.off("sameRoomName", listenForSameRoomName)
        }
	}, [ navigate, id ])


    /* This block handles listening for and receiving messages */
    useEffect(() => {
        const handleReceivingMessage = (data) => {
            if(data.sender.username === currentUser.username && !data.fromServer) {
                return
            }

            const newMessagesArray = [...messages, data]
            setMessages(newMessagesArray)
        }

    
        socket.on("message", handleReceivingMessage)
    
        return () => {
            socket.off("message", handleReceivingMessage)
        }
    }, [ currentUser.username, messages, setMessages ])



    return  <>
                <motion.div className={ classes.root }
                    initial={{ display: "none", visibility: "hidden", opacity: 0 }}
                    animate={{
                        display: !isLoading ? "block" : "none",
                        visibility: !isLoading ? "visible" : "hidden",
                        opacity: !isLoading ? 1 : 0,
                    }}
                    transition={{
                        ease: 'linear',
                        duration: .5,
                    }}				
                >
                    
                    <NavMenu    setUsersState={ setMembers }
                                isChatRoom={ true }
                                chatRoomId={ id }
                                usersArray={ members }
                                currentUserInfo={ currentUser } />

                    <div className={ classes.mainContainer }>
                        <img src="/images/logos/nirah_logo_white.png" alt="Nirah, Serpent mascotte de l'application" className={ classes.backgroundLogo }/>

                        <form className={ classes.chatBarContainer }>
                                <motion.input className={ classes.chatBar} placeholder="Entrez votre message..." type="text" id="chat-bar" autoComplete="off" value={ currentMessage }
                                    onChange={handleCurrentMessageChange}
                                    initial={{ backgroundColor: "#F2F4F8" }}
                                    whileFocus={{ backgroundColor: "#C2D4EB" }}
                                />
                                <motion.button className={ classes.chatBarSendButton }
                                    onClick={handleSendingMessage}
                                    initial={{ color: "#F2F4F8", scale: 1 }}
                                    whileHover={{ color: "#ED872D", scale: 1.1 }}
                                >
                                    <FaPaperPlane className={ classes.chatBarSendIcon }/>
                                </motion.button>
                        </form>

                        <div className={ classes.chatRoot }>
                            <p className={ classes.introMessage }>Votre légende commence ici...</p>
                            { messages.map((message, index) => (
                                <Message
                                    key={ index }
                                    senderUsername={ message.sender.username }
                                    createdAt={ message.createdAt }
                                    body={ message.body }
                                    fromServer={ message.fromServer }
                                />
                            )) }
                            <AlwaysScrollToBottom />
                        </div>
                    </div>
                </motion.div>

                <LoadingScreen isActive={ isLoading } startsActivated={ true } />
            </>
}



export default ChatRoom