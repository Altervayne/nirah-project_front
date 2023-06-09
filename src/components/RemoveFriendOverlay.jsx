/* Libraries imports */
import React, { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
/* React Icons imports */
import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"
/* Helper functions imports */
import { handleFriendRequest, handleFriendsUpdate } from "../helpers/friendRequestHelper"
import { socketFriendRequestHandler } from "../helpers/socketHandler"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
            display: "flex",
			alignItems: "center",
			justifyContent: "center",

			position: "relative",
			top: "0",
			left: "0",

			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0, 0, 0, .5)",
		},
        userStateIconActive: {
            display: "flex",
            alignItems: "center",
        },
	}
})



const RemoveFriendOverlay = ({ userId, username, usersArray, setUsersState, isOpen, setIsOpen }) => {
	const { classes } = useStyles()



    const removeFriendHandler = async (event) => {
        event.preventDefault()

        setIsOpen(false)

        const friendWasRemoved = await handleFriendRequest(userId, "remove")

        if(friendWasRemoved) {
            socketFriendRequestHandler(userId, "remove")
            handleFriendsUpdate(userId, username, "friends", "normalUsers", usersArray, setUsersState)
        }
    }



    /* We declare the modal's handler functions */
	const handleWindowClick = (event) => { event.stopPropagation() }
	const setParentIsOpen = (value) => {
		setIsOpen(value)
	}



    return  <motion.div className={ classes.root }
					onClick={() => setIsOpen(false)}
					initial={{ opacity: 0, visibility: "hidden" }}
					animate={{
						opacity: isOpen ? 1 : 0,
						visibility: isOpen ? "visible" : "hidden",
						transition: {
							duration: .2,
							ease: "easeInOut",
							visibility: {
								delay: isOpen ? 0 : .2,
							}
						}
					}}					
		    >

                    <p className={ classes.modalText }>Supprimer ?</p>
                        
                    <motion.button className={ classes.userStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                    >
                        <FaCheck className={ classes.requestReceivedIcons } onClick={() => removeFriendHandler} />
                    </motion.button>
                    <motion.button className={ classes.userStateIconContainerButton }
                        initial={{ color: "#F2F4F8", scale: 1 }}
                        whileHover={{ color: "#ED872D", scale: 1.15 }}
                    >
                        <FaTimes className={ classes.requestReceivedIcons } onClick={() => setIsOpen(false)} />
                    </motion.button>

            </motion.div>
}



export default RemoveFriendOverlay