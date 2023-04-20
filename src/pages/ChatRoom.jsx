import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"
import { useParams } from "react-router-dom"
import NavMenu from "../components/NavMenu"
import Message from "../components/Message"
import { FaPaperPlane } from "react-icons/fa"




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

			width: "80%",
			height: "100vh",
			maxHeight: "100vh",

            boxSizing: "border-box",

			position: "absolute",
			top: "0",
            right: "0",
			zIndex: "0",

            [theme.breakpoints.down('sm')]: {
				paddingTop: theme.spacing(9),	
			},
			[theme.breakpoints.up('sm')]: {
				paddingTop: theme.spacing(7),	
			},
			[theme.breakpoints.up('md')]: {
				paddingTop: theme.spacing(9),	
			}
		},
        backgroundLogo: {
            position: "fixed",
            zIndex: 0,

            width: "40%",
            opacity: .05,
        },
        chatRoot: {
            position: "relative",

            boxSizing: "border-box",

            width: "93%",
            height: "89%",
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
            }
        },
        chatBarContainer: {
            display: "flex",
            justifyContent: "center",

            position: "fixed",
            bottom: "40px",
            right: 0,
            zIndex: 999,

            height: theme.spacing(6),
            width: "80%",
        },
        chatBar: {
            border: "none",
            borderRadius: "10px",

            padding: "0 15px",
            marginRight: theme.spacing(2),
            width: "90%",

            boxSizing: "border-box",

            fontSize: theme.typography.pxToRem(16),
            backgroundColor: "#F2F4F8",
            color: "#121420",

            "&:focus": {
                outline: "none",
            },
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
    const elementRef= useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
}



const ChatRoom = () => {
    const { classes } = useStyles() 
    const { id } = useParams()
    const currentUser = "testUser3"

    const [messages, setMessages] = useState([]);
    const newMessageHandler = (newMessage) => {
        const newMessagesArray = [...messages, newMessage]
        setMessages(newMessagesArray)
    }

    const [currentMessage, setCurrentMessage] = useState("")
    const handleCurrentMessageChange = (e) => {
        setCurrentMessage(e.target.value)
    }

    const handleSendingMessage = (e) => {
        e.preventDefault()
        const message = {
            user: currentUser,
            time: "00:00",
            content: currentMessage
        }
        newMessageHandler(message)
        setCurrentMessage("")
    }

    return <div className={ classes.root }>
                <NavMenu isChatRoom={ true } chatRoomId={ id }/>
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
                        <Message user="TestUser1" time="00:00" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in. Sit amet tellus cras adipiscing enim eu turpis. Quam quisque id diam vel quam." />
                        <Message user="TestUser2" time="00:00" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in. Sit amet tellus cras adipiscing enim eu turpis. Quam quisque id diam vel quam." />
                        <Message user="TestUser2" time="00:00" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in. Sit amet tellus cras adipiscing enim eu turpis. Quam quisque id diam vel quam." />
                        <Message user="TestUser1" time="00:00" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in. Sit amet tellus cras adipiscing enim eu turpis. Quam quisque id diam vel quam." />
                        <Message user="TestUser1" time="00:00" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in. Sit amet tellus cras adipiscing enim eu turpis. Quam quisque id diam vel quam." />
                        <Message user="TestUser2" time="00:00" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in. Sit amet tellus cras adipiscing enim eu turpis. Quam quisque id diam vel quam." />
                        { messages.map((message, index) => (
                            <Message
                                key={ index }
                                user={ message.user }
                                time={ message.time }
                                content={ message.content }
                            />
                        )) }
                        <AlwaysScrollToBottom />
                    </div>
				</div>
			</div>
}



export default ChatRoom