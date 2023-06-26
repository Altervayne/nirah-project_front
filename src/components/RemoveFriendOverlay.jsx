/* Libraries imports */
import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
/* Helper functions imports */
import { handleFriendRequest, handleFriendsUpdate } from "../helpers/friendRequestHelper"
import { socketFriendRequestHandler } from "../helpers/socketHandler"
/* Components imports */
import CloseButton from "./CloseButton"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",

			position: "fixed",
			top: "0",
			left: "0",
            zIndex: 9999,

			width: "100vw",
			height: "100vh",
			backgroundColor: "rgba(0, 0, 0, .5)",
		},
		modalWindow: {
            display: "flex",
			flexDirection: "column",
			alignItems: "center",
			position: "relative",

			boxSizing: "border-box",

			backgroundColor: "#1B2432",


			[theme.breakpoints.down('sm')]: {
                height: "100%",
				width: "100%",

                paddingTop: theme.spacing(10)
			},
			[theme.breakpoints.up('sm')]: {
                height: "auto",
				width: "400px",

                borderRadius: "20px",
			},
		},
        modalTitle: {
			fontSize: theme.typography.pxToRem(24),
			fontWeight: 600,

			color: "#F2F4F8"
		},
        modalText: {
            margin: "10px 0",

            textAlign: "center",

            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            
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
        userStateIconActive: {
            display: "flex",
            alignItems: "center",
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
        deleteFriendButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: theme.typography.pxToRem(15),
            fontWeight: 600,

            height: "40px",
            padding: "0 10px",
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
            borderRadius: "10px",

            outline: "none",
            border: "none",

            color: "#F2F4F8",
            backgroundColor: "#d02b48",

            cursor: "pointer",
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
		    > {/* The Modal Container takes up the entire screen (except for the header) with a slightly transparent black background */}

                <motion.div className={ classes.modalWindow }
                    onClick={ handleWindowClick }
                    initial={{ scale: 0, visibility: "hidden" }}
                    animate={{
                        scale: isOpen ? 1 : 0,
                        visibility: isOpen ? "visible" : "hidden",
                        transition: {
                            duration: .2,
                            ease: "easeInOut",
                            visibility: {
                                delay: isOpen ? 0 : .2,
                            },
                        }
                    }}
                > {/* The Modal Window contains the form to log in or sign in. It animates by growing or shrinking to open or close */}

                    <CloseButton setIsOpen={ setParentIsOpen } />

                    <h2 className={ classes.modalTitle }>Supprimer un ami</h2>
                    <p className={ classes.modalText }>Voulez vous vraiment supprimer { username } de votre liste amis?</p>
                        
                    <motion.button className={ classes.deleteFriendButton }
                            onClick={ removeFriendHandler }
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: .97,
                            }}
                        >
                            Supprimer
                    </motion.button>

                </motion.div>

            </motion.div>
}



export default RemoveFriendOverlay