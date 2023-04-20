import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { BsPersonFillUp } from "react-icons/bs"
import { BsPersonFillAdd } from "react-icons/bs"
import { BsPersonFillCheck } from "react-icons/bs"
import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        memberUsername: {
            margin: "10px 0",
            
            textOverflow: "ellipsis",
            overflow: "hidden",

            color: "#F2F4F8",

            [theme.breakpoints.down('sm')]: {
    	
            },
            [theme.breakpoints.up('sm')]: {
                    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(16),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(18),
            }
        },
        friendStateContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            height: "100%",
            width: "auto",
        },
        friendStateIconContainerButton: {
            cursor: "pointer",

            [theme.breakpoints.down('sm')]: {
    	
            },
            [theme.breakpoints.up('sm')]: {
                    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(18),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(20),
            }
        },
        friendStateIconContainerPassive: {
            [theme.breakpoints.down('sm')]: {
    	
            },
            [theme.breakpoints.up('sm')]: {
                    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(18),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(20),
            }
        },
        addFriendIcon: {
            
        },
        alreadyFriendIcon: {
            color: "#C2D4EB",
            opacity: .5,
        },
        requestSentIcon: {
            color: "#C2D4EB",
            opacity: .5,
        },
        requestReceivedIcons: {
            marginLeft: theme.spacing(1),
        },
    }
})



const MemberEntry = ({ userName, friendState }) => {
    const { classes } = useStyles()

    return  <div className={ classes.root }>
                <p className={ classes.memberUsername }>{ userName }</p>
                <div className={ classes.friendStateContainer }>
                    { friendState === "notFriend" ? 
                            <motion.div className={ classes.friendStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <BsPersonFillAdd className={ classes.addFriendIcon } onClick={() => window.location.href = "/room/ID_HERE"} />
                            </motion.div> 
                    : null }
                    { friendState === "isFriend" ? 
                            <div className={ classes.friendStateIconContainerPassive }>
                                <BsPersonFillCheck className={ classes.alreadyFriendIcon } onClick={() => window.location.href = "/room/ID_HERE"} />
                            </div> 
                    : null }
                    { friendState === "requestSent" ? 
                            <div className={ classes.friendStateIconContainerPassive }>
                                <BsPersonFillUp className={ classes.requestSentIcon } onClick={() => window.location.href = "/room/ID_HERE"} />
                            </div> 
                    : null }
                    { friendState === "requestReceived" ? 
                            <>
                            <motion.div className={ classes.friendStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <FaCheck className={ classes.requestReceivedIcons } onClick={() => window.location.href = "/room/ID_HERE"} />
                            </motion.div>
                            <motion.div className={ classes.friendStateIconContainerButton }
                                initial={{ color: "#F2F4F8", scale: 1 }}
                                whileHover={{ color: "#ED872D", scale: 1.15 }}
                            >
                                <FaTimes className={ classes.requestReceivedIcons } onClick={() => window.location.href = "/room/ID_HERE"} />
                            </motion.div> 
                            </>                            
                    : null }
                </div>
            </div>
}



export default MemberEntry