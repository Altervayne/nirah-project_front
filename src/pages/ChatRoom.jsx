import React from "react"
import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"
import { useParams } from "react-router-dom"
import NavMenu from "../components/NavMenu"
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
            justifyContent: "center",

			width: "80%",
			height: "100vh",
			maxHeight: "100vh",

			position: "absolute",
			top: "0",
            right: "0",
			zIndex: "0",
		},
        backgroundLogo: {
            position: "fixed",
            zIndex: 0,

            width: "40%",
            opacity: .05,
        },
        chatRoot: {
            position: "relative",
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
            width: "70%",

            boxSizing: "border-box",

            fontSize: theme.typography.pxToRem(16),

            "&:focus": {
                outline: "none",
            },
        },
        chatBarSend: {
            width: "20%",
        },
        chatBarSendButton: {

        },
	}
})



const ChatRoom = () => {
    const { classes } = useStyles() 
    const { id } = useParams()

    return <div className={ classes.root }>
                <NavMenu isChatRoom={ true } chatRoomId={ id }/>
				<div className={ classes.mainContainer }>
                    <img src="/images/logos/nirah_logo_white.png" alt="Nirah, Serpent mascotte de l'application" className={ classes.backgroundLogo }/>

                    <form className={ classes.chatBarContainer }>
                            <motion.input className={ classes.chatBar} placeholder="Entrez votre message..." type="text" id="chat-bar"
                                initial={{ backgroundColor: "#F2F4F8" }}
                                whileFocus={{ backgroundColor: "#C2D4EB" }}
                            />
                            <button className={ classes.chatBarSendButton }>
                                <FaPaperPlane />
                            </button>
                    </form>

                    <div className={ classes.chatRoot }>
                        
                    </div>
				</div>
			</div>
}



export default ChatRoom