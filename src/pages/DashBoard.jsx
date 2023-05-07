/* Libraries imports */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
/* Components imports */
import NavMenu from "../components/NavMenu"
import LoadingScreen from "../components/LoadingScreen"
/* Helper functions imports */
import { getFriendsInfo } from "../helpers/friendRequestHelper"
import { getCurrentUserInfo } from "../helpers/userRequestHelper"
import { socket } from "../helpers/socketHandler"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			width: "100%",
			height: "100%",
		},
		mainContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
            justifyContent: "center",

			height: "100vh",
			maxHeight: "100vh",

			position: "absolute",
			top: "0",
            right: "0",
			zIndex: "0",

			[theme.breakpoints.down('sm')]: {
					
			},
			[theme.breakpoints.up('sm')]: {
					
			},
			[theme.breakpoints.up('md')]: {
				width: "70%",
			},
			[theme.breakpoints.up('lg')]: {
				width: "80%",
			}
		},
        largeLogo: {
			[theme.breakpoints.down('sm')]: {
				width: "50%",
			},
			[theme.breakpoints.up('sm')]: {
				width: "40%",
			},
			[theme.breakpoints.up('md')]: {
				width: "35%",
			},
			[theme.breakpoints.up('lg')]: {
				width: "20%",
			}
        },
        largeLogoTitle: {
			boxSizing: "border-box",
            marginTop: "70px",

            

            color: "#F2F4F8",

			[theme.breakpoints.down('sm')]: {
				textAlign: "center",

				paddingLeft: theme.spacing(10),
				paddingRight: theme.spacing(10),
				fontSize: theme.typography.pxToRem(30),	
			},
			[theme.breakpoints.up('sm')]: {
				textAlign: "center",

				paddingLeft: theme.spacing(10),
				paddingRight: theme.spacing(10),
				fontSize: theme.typography.pxToRem(36),	
			},
			[theme.breakpoints.up('md')]: {
				paddingLeft: theme.spacing(4),
				paddingRight: theme.spacing(4),
				fontSize: theme.typography.pxToRem(30),
			},
			[theme.breakpoints.up('lg')]: {
				fontSize: theme.typography.pxToRem(36),
			}
        },
	}
})



const DashBoard = () => {
    const { classes } = useStyles()
	const navigate = useNavigate()


	const [friends, setFriends] = useState({
        friends: [],
        requestsReceived: [],
        requestsSent: [],
		normalUsers: []
    })	
	const [isLoading, setIsLoading] = useState(true)
	const [currentUser, setCurrentUser] = useState({
		username: '',
		friendsList: [],
		requestsReceived: [],
		requestsSent: []
	})



	useEffect(() => {
		const verifyCurrentUser = async () => {
			const receivedUser = await getCurrentUserInfo()

			if(receivedUser.currentRoom !== 0){
				navigate(`/room/${receivedUser.currentRoom}`)
			}

			const friendsInfo = await getFriendsInfo('')

			console.log("friendsInfo is:")
			console.log(friendsInfo)
	
			if(!receivedUser) {
				navigate('/')	
			} else {
				setCurrentUser(receivedUser)
				setFriends({
					friends: friendsInfo,
					requestsReceived: receivedUser.requestsReceived,
					requestsSent: receivedUser.requestsSent,
					normalUsers: [],
				})
				socket.connect()

				setIsLoading(false)
			}
		}
	  
		verifyCurrentUser()
	}, [ navigate ])


    return 	<>
				<motion.div className={ classes.root }
					initial={{ display: "none", visibility: "hidden", opacity: 0 }}
					animate={{
						display: !isLoading ? "block" : "none",
						visibility: !isLoading ? "visible" : "hidden",
						opacity: !isLoading ? 1 : 0,
					}}
					transition={{
						ease: 'linear',
						duration: .5,
					}}				
				>
					<NavMenu 	setUsersState={ setFriends }
								isChatRoom={ false }
								chatRoomId={ null }
								usersArray={ friends }
								currentUserInfo={ currentUser } />

					<div className={ classes.mainContainer }>
						<img src="/images/logos/nirah_logo.png" alt="Nirah, Serpent mascotte de l'application" className={ classes.largeLogo }/>
						<h2 className={ classes.largeLogoTitle }>Rejoignez un salon pour parler avec vos amis !</h2>
					</div>									
				</motion.div>

				<LoadingScreen isActive={ isLoading } startsActivated={ true } />				
			</>
			
}



export default DashBoard