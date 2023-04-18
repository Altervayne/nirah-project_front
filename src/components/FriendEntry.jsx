import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { RxEnter } from "react-icons/rx"
import { RiChatOffLine } from "react-icons/ri"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        friendUsername: {
            margin: "10px 0",

            fontSize: theme.typography.pxToRem(18),
            color: "#F2F4F8",
        },
        friendUsernameOffline: {
            margin: "10px 0",

            fontSize: theme.typography.pxToRem(18),
            color: "#C2D4EB",
            opacity: .5,
        },
        friendStateContainer: {
            cursor: "pointer",
        },
        friendJoinIcon: {
            fontSize: theme.typography.pxToRem(22),
        },
        friendOfflineIcon: {
            fontSize: theme.typography.pxToRem(22),
            color: "#C2D4EB",
            opacity: .5,
        },
    }
})



const FriendEntry = ({ userName, isOnline }) => {
    const { classes } = useStyles()

    return  <div className={ classes.root }>
                <p className={ isOnline ? classes.friendUsername : classes.friendUsernameOffline }>{ userName }</p>
                { isOnline ? 
                                <motion.div className={ classes.friendStateContainer }
                                    initial={{ color: "#F2F4F8", scale: 1 }}
                                    whileHover={{ color: "#ED872D", scale: 1.15 }}
                                >
                                    <RxEnter className={ classes.friendJoinIcon } onClick={() => window.location.href = "/room/ID_HERE"} />
                                </motion.div> 
                            :
                                <RiChatOffLine className={ classes.friendOfflineIcon }/>
                }
            </div>
}



export default FriendEntry