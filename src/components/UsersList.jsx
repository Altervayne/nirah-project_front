/* Libraries imports */
import React, { useEffect } from "react"
import { makeStyles } from "tss-react/mui"
/* Component imports */
import UserEntry from "./UserEntry"
import Divider from "./Divider"
/* Helper functions imports */
import { handleUsersUpdate } from "../helpers/friendRequestHelper"
import { socket } from "../helpers/socketHandler"



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



const UsersList = ({ setUsersState, listType, usersArray }) => {
    const { classes } = useStyles()


    useEffect(() => {
        const handleSendRequest = (data) => {
            handleUsersUpdate(data.userId, data.username, "normalUsers", "requestsReceived", usersArray, setUsersState)
        }
        
        const handleAcceptRequest = (data) => {
            handleUsersUpdate(data.userId, data.username, "requestsSent", "friends", usersArray, setUsersState)
        }
        
        const handleRejectRequest = (data) => {
            handleUsersUpdate(data.userId, data.username, "requestsSent", "normalUsers", usersArray, setUsersState)
        }
    
        socket.on("sendRequest", handleSendRequest)
        socket.on("acceptRequest", handleAcceptRequest)
        socket.on("rejectRequest", handleRejectRequest)
    
        return () => {
            socket.off("sendRequest", handleSendRequest)
            socket.off("acceptRequest", handleAcceptRequest)
            socket.off("rejectRequest", handleRejectRequest)
        }
    }, [usersArray, setUsersState])


    const onlineFriends = usersArray.friends.filter((user) => user.isOnline)
    const offlineFriends = usersArray.friends.filter((user) => !user.isOnline)


    return  <div className={ classes.root }>
                <h2 className={ classes.listTitle }>
                    { listType === "members" && "Membres" }
                    { listType === "friends" && "Amis" }
                </h2>

                <div className={ classes.listBody }>
                    {/* This part is rendered if the list is supposed to be a chatroom members list */}
                    { listType === "members" && 
                        <>
                            {/* This part of the list displays the received friends requests */}
                            { usersArray["requestsReceived"].length !== 0 && <Divider title="Demandes reçues" /> }
                            { usersArray["requestsReceived"].map(memberData => <UserEntry   setUsersState={ setUsersState }
                                                                                            usersArray={ usersArray }
                                                                                            username={ memberData.username }
                                                                                            userId={ memberData.userId }
                                                                                            friendState="requestReceived"
                                                                                            isFriendsList={ false }
                                                                                            isOnline={ true }
                                                                                            key={ memberData.username } />) }

                            {/* This part of the list displays the online friends */}
                            { usersArray["requestsReceived"].length !== 0 && 
                              usersArray["friends"].length !== 0 && 
                              usersArray["normalUsers"].length !== 0 && <Divider title="Membres en ligne" /> }
                            { usersArray["friends"].map(memberData => <UserEntry    setUsersState={ setUsersState }
                                                                                    usersArray={ usersArray }
                                                                                    username={ memberData.username }
                                                                                    userId={ memberData.userId }
                                                                                    friendState="isFriend"
                                                                                    isFriendsList={ false }
                                                                                    isOnline={ true }
                                                                                    key={ memberData.username } />) }

                            {/* And then displays the online non-friend users */}
                            { usersArray["normalUsers"].map(memberData => <UserEntry    setUsersState={ setUsersState }
                                                                                        usersArray={ usersArray }
                                                                                        username={ memberData.username }
                                                                                        userId={ memberData.userId }
                                                                                        friendState="notFriend"
                                                                                        isFriendsList={ false }
                                                                                        isOnline={ true }
                                                                                        key={ memberData.username } />) }

                            {/* This part of the list displays the users to whom our current user has sent requests */}
                            { usersArray["requestsSent"].length !== 0 && <Divider title="Demandes envoyées" /> }
                            { usersArray["requestsSent"].map(memberData => <UserEntry   setUsersState={ setUsersState }
                                                                                        usersArray={ usersArray }
                                                                                        username={ memberData.username }
                                                                                        userId={ memberData.userId }
                                                                                        friendState="requestSent"
                                                                                        isFriendsList={ false }
                                                                                        isOnline={ true }
                                                                                        key={ memberData.username } />) }
                        </> }

                    {/* This part is rendered if the list is meant to be a friends list */}
                    { listType === "friends" && 
                        <>
                            {/* This part of the list displays the received friends requests */}
                            { usersArray["requestsReceived"].length !== 0 && <Divider title="Demandes reçues" /> }
                            { usersArray["requestsReceived"].map(memberData => <UserEntry   setUsersState={ setUsersState }
                                                                                            usersArray={ usersArray }
                                                                                            username={ memberData.username }
                                                                                            userId={ memberData.userId }
                                                                                            friendState="requestReceived"
                                                                                            isFriendsList={ true }
                                                                                            isOnline={ true }
                                                                                            key={ memberData.username } />) }

                            {/* This part of the friends list displays the online friends */}
                            { usersArray["requestsReceived"].length !== 0 && 
                              onlineFriends.length !== 0 && <Divider title="Amis en ligne" /> }
                            { onlineFriends.map(memberData => <UserEntry    setUsersState={ setUsersState }
                                                                            usersArray={ usersArray }
                                                                            username={ memberData.username }
                                                                            userId={ memberData.userId }
                                                                            friendState="isFriend"
                                                                            isFriendsList={ true }
                                                                            isOnline={ memberData.isOnline }
                                                                            key={ memberData.username } />) }

                            {/* This part of the friends list displays the offline friends */}
                            { usersArray["requestsReceived"].length !== 0 && 
                              onlineFriends.length !== 0 &&
                              offlineFriends.length !== 0 && <Divider title="Amis hors-ligne" /> }
                            { offlineFriends.map(memberData => <UserEntry   setUsersState={ setUsersState }
                                                                            usersArray={ usersArray }
                                                                            username={ memberData.username }
                                                                            userId={ memberData.userId }
                                                                            friendState="isFriend"
                                                                            isFriendsList={ true }
                                                                            isOnline={ memberData.isOnline }
                                                                            key={ memberData.username } />) }

                            {/* This part of the friends list displays the users to whom our current user has sent a request */}
                            { usersArray["requestsSent"].length !== 0 && <Divider title="Demandes envoyées" /> }
                            { usersArray["requestsSent"].map(memberData => <UserEntry   setUsersState={ setUsersState }
                                                                                        usersArray={ usersArray }
                                                                                        username={ memberData.username }
                                                                                        userId={ memberData.userId }
                                                                                        friendState="requestSent"
                                                                                        isFriendsList={ true }
                                                                                        isOnline={ true }
                                                                                        key={ memberData.username } />) } 
                        </> }
                </div>
            </div>
}



export default UsersList