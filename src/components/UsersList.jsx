import React from "react"
import { makeStyles } from "tss-react/mui"
import UserEntry from "./UserEntry"
import Divider from "./Divider"

const friendsListDataTemplate = require('../data/friendsListPlaceholder.json')

const onlineFriends = friendsListDataTemplate.filter(user => user.isOnline)
const offlineFriends = friendsListDataTemplate.filter(user => !user.isOnline)



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            boxSizing: "border-box",

            backgroundColor: "rgba(27, 36, 50, .5)",

            borderRadius: theme.spacing(2),

            width: "85%",
            minHeight: "350px",
            height: "68%",
            maxHeight: "68%",
            paddingBottom: theme.spacing(2),
        },
        listTitle: {
            display: "flex",
            alignItems: "center",

            boxSizing: "border-box",

            color: "#F2F4F8",

            margin: "0",
            padding: theme.spacing(2),
            paddingLeft: theme.spacing(3),
            height: "12%",

            [theme.breakpoints.down('sm')]: {
    	
            },
            [theme.breakpoints.up('sm')]: {
                    
            },
            [theme.breakpoints.up('md')]: {
                fontSize: theme.typography.pxToRem(18),  
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.pxToRem(24),
            }
        },
        listBody: {
            boxSizing: "border-box",

            backgroundColor: "#1B2432",

            width: "100%",
            height: "88%",
            maxHeight: "88%",

            overflowY: "scroll",
            overflowX: "hidden",
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
            },

            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(2),
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1), 
            },
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(2),
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),        
            },
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(2),
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
            },
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(3),
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
            }
        },
    }
})



const UsersList = ({ listType, usersArray }) => {
    const { classes } = useStyles()

    console.log("usersArray object is:")
    console.log(usersArray)
    console.log(`You have received ${usersArray["requestsReceived"].length} friend requests`)
    console.log(`You have sent ${usersArray["requestsSent"].length} friend requests`)

    return  <div className={ classes.root }>
                <h2 className={ classes.listTitle }>
                    { listType === "members" && "Membres" }
                    { listType === "friends" && "Amis" }
                </h2>

                <div className={ classes.listBody }>
                    { listType === "members" ? 
                        <>
                            { usersArray["requestsReceived"].length !== 0 && <Divider title="Demandes reçues" /> }
                            { usersArray["requestsReceived"].map(memberData => <UserEntry userName={ memberData.username } friendState="requestReceived" isFriendsList={ false } isOnline={ true } key={ memberData.username } />) }
                            { usersArray["requestsReceived"].length !== 0 && <Divider title="Membres en ligne" /> }
                            { usersArray["friends"].map(memberData => <UserEntry userName={ memberData.username } friendState="isFriend" isFriendsList={ false } isOnline={ true } key={ memberData.username } />) }
                            { usersArray["normalUsers"].map(memberData => <UserEntry userName={ memberData.username } friendState="notFriend" isFriendsList={ false } isOnline={ true } key={ memberData.username } />) }
                            { usersArray["requestsSent"].length !== 0 && <Divider title="Demande envoyée" /> }
                            { usersArray["requestsSent"].map(memberData => <UserEntry userName={ memberData.username } friendState="requestSent" isFriendsList={ false } isOnline={ true } key={ memberData.username } />) }
                        </>
                    : null }
                    { listType === "friends" ? 
                        <>
                           { onlineFriends.map(memberData => <UserEntry userName={ memberData.userName } friendState={ "isFriend" } isFriendsList={ true } isOnline={ memberData.isOnline } key={ memberData.userName } />) }
                           { offlineFriends.length >= 0 && <Divider title="Hors-ligne" /> }
                           { offlineFriends.map(memberData => <UserEntry userName={ memberData.userName } friendState={ "isFriend" } isFriendsList={ true } isOnline={ memberData.isOnline } key={ memberData.userName } />) } 
                        </>
                    : null }
                </div>
            </div>
}



export default UsersList