/* Libraries imports */
import React, { useState, useEffect } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
/* Components imports */
import CloseButton from "./CloseButton"
/* React Icons imports */
import { TiDelete } from "react-icons/ti"
/* Helper functions imports */
import { handleFriendRequest, handleFriendsUpdate } from "../helpers/friendRequestHelper"
import { socketFriendRequestHandler } from "../helpers/socketHandler"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
		},
	}
})



const RemoveFriendButton = ({ userId, username, usersArray, setUsersState }) => {
	const { classes } = useStyles()



	return  <>
                <TiDelete className={ classes.userStateIconActive } />
            </>
}



export default RemoveFriendButton