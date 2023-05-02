import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",

            marginBottom: theme.spacing(2),
        },
        messageInfo: {
            display: "flex",

            marginLeft: theme.spacing(2),
        },
        messageUser: {
            fontWeight: 600,
            color: "#F2F4F8",

            marginRight: theme.spacing(2),
            marginBottom: 0,
        },
        messageTime: {
            color: "#C2D4EB",
            opacity: .8,

            marginBottom: 0,
        },
        messageBody: {
            boxSizing: "border-box",

            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            marginTop: theme.spacing(1),

            minHeight: theme.spacing(6),
            borderRadius: theme.spacing(3),

            backgroundColor: "#F2F4F8",
            color: "#121420",
        },
    }
})



const Message = ({ body, senderUsername, createdAt }) => {
    const { classes } = useStyles()

    return  <motion.div className={ classes.root }
                initial={{ opacity: 0, translateY: "10px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{
                    duration: .3,
                }}
            >
                <div className={ classes.messageInfo }>
                    <p className={ classes.messageUser }>{ senderUsername }</p>
                    <p className={ classes.messageTime }>{ createdAt }</p>
                </div>
                <div className={ classes.messageBody }>
                    <p className={ classes.messageBodyText }>{ body }</p>
                </div>
            </motion.div>
}



export default Message