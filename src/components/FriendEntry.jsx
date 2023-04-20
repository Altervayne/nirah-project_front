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
        friendUsernameOffline: {
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
        friendActiveStateContainer: {
            cursor: "pointer",
        },
        friendJoinIcon: {
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
        friendOfflineIcon: {
            color: "#C2D4EB",
            opacity: .5,

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
    }
})



const FriendEntry = ({ userName, isOnline }) => {
    const { classes } = useStyles()

    return  <div className={ classes.root }>
                <p className={ isOnline ? classes.friendUsername : classes.friendUsernameOffline }>{ userName }</p>
                { isOnline ? 
                                <motion.div className={ classes.friendActiveStateContainer }
                                    initial={{ color: "#F2F4F8", scale: 1 }}
                                    whileHover={{ color: "#ED872D", scale: 1.15 }}
                                >
                                    <RxEnter className={ classes.friendJoinIcon } onClick={() => window.location.href = "/room/ID_HERE"} />
                                </motion.div> 
                            :
                                <div className={ classes.friendPassiveStateContainer }>
                                    <RiChatOffLine className={ classes.friendOfflineIcon }/>
                                </div>
                }
            </div>
}



export default FriendEntry