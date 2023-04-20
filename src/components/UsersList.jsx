import React from "react"
import { makeStyles } from "tss-react/mui"
import MemberEntry from "./MemberEntry"
import FriendEntry from "./FriendEntry"

const membersListDataTemplate = require('../data/membersListPlaceholder.json')
const friendsListDataTemplate = require('../data/friendsListPlaceholder.json')



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



const UsersList = ({ listType }) => {
    const { classes } = useStyles()

    return  <div className={ classes.root }>
                <h2 className={ classes.listTitle }>
                    { listType === "members" ? "Membres" : null }
                    { listType === "friends" ? "Amis" : null}
                </h2>

                <div className={ classes.listBody }>
                    { listType === "members" ? 
                        <>
                            { membersListDataTemplate.map(memberData => <MemberEntry userName={ memberData.userName } friendState={ memberData.friendState } key={ memberData.userName } />) }
                            { membersListDataTemplate.map(memberData => <MemberEntry userName={ memberData.userName } friendState={ memberData.friendState } key={ memberData.userName } />) }
                        </>
                    : null }
                    { listType === "friends" ? 
                        <>
                            { friendsListDataTemplate.map(friendData => <FriendEntry userName={ friendData.userName } isOnline={ friendData.isOnline } key={ friendData.userName } />) }
                            { friendsListDataTemplate.map(friendData => <FriendEntry userName={ friendData.userName } isOnline={ friendData.isOnline } key={ friendData.userName } />) }
                        </>
                    : null }
                </div>
            </div>
}



export default UsersList