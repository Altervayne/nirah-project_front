import React from "react"
import { makeStyles } from "tss-react/mui"
import FriendEntry from "./FriendEntry"
const friendsListDataTemplate = require('../data/friendsListPlaceholder.json')


const useStyles = makeStyles()((theme) => {
	return {
        root: {
            boxSizing: "border-box",

            backgroundColor: "rgba(27, 36, 50, .5)",

            borderRadius: "10px",

            width: "85%",
            height: "68%",
            maxHeight: "68%",
            paddingBottom: theme.spacing(2),
        },
        listTitle: {
            boxSizing: "border-box",

            color: "#F2F4F8",

            margin: "0",
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            minHeight: "12%",
        },
        listBody: {
            boxSizing: "border-box",

            backgroundColor: "#1B2432",

            padding: theme.spacing(3),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            width: "100%",
            height: "88%",
            maxHeight: "88%",

            overflowY: "scroll",
            scrollbarWidth: "thin",

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
    }
})



const FriendsList = () => {
    const { classes } = useStyles()

    return  <div className={ classes.root }>
                <h2 className={ classes.listTitle }>Liste d'amis</h2>

                <div className={ classes.listBody }>
                    { friendsListDataTemplate.map(friendData => <FriendEntry userName={ friendData.userName } isOnline={ friendData.isOnline } key={ friendData.userName } />) }
                    { friendsListDataTemplate.map(friendData => <FriendEntry userName={ friendData.userName } isOnline={ friendData.isOnline } key={ friendData.userName } />) }
                </div>
            </div>
}



export default FriendsList