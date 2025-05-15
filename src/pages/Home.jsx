import React, { useEffect } from "react"
import { makeStyles } from "tss-react/mui"
import LogInButton from "../components/LogInButton"
import { useNavigate } from "react-router"
import { getCurrentUserInfo } from "../helpers/userRequestHelper"

const isShowcase = process.env.REACT_APP_SHOWCASE_STATUS



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			width: "100%",
			height: "100%",
		},
		catchPhraseContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			minWidth: "100%",
			height: "100vh",
			maxHeight: "100vh",

			position: "absolute",
			top: "0",
			zIndex: "0",

			backgroundImage: "url(/images/backgrounds/sumerian_cuneiform_background.jpg)",
			backgroundSize: "cover",
			

			"&::before": {
                content: "''",
                position: "absolute",
                left: 0,
                top: 0,
				zIndex: 1,
                width: "100%",
				height: "100%",
                display: "inline-block",
                background: "linear-gradient(180deg, rgba(27, 36, 50, 1) 10%, rgba(27, 36, 50, .6) 60%, rgba(27, 36, 50, 1) 100%)",
            },
		},
		catchPhrase: {
			position: "relative",
			zIndex: 2,

			color: "#F2F4F8",
			textShadow: "2px 2px 10px rgba(0, 0, 0, .2)",
			fontFamily: "Helvetica",

			[theme.breakpoints.down('sm')]: {
				marginTop: "35vh",
				marginBottom: "15vh",
				paddingLeft: theme.spacing(6),
				paddingRight: theme.spacing(6),

				fontSize: theme.typography.pxToRem(30),
				textAlign: "center",
			},
            [theme.breakpoints.up('sm')]: {
				marginTop: "35vh",
				marginBottom: "15vh",
				fontSize: theme.typography.pxToRem(30),
			},
			[theme.breakpoints.up('md')]: {
				marginTop: "35vh",
				marginBottom: "15vh",
				fontSize: theme.typography.pxToRem(40),
			},
			[theme.breakpoints.up('lg')]: {
				
			},
		},
	}
})



const Home = () => {
    const { classes } = useStyles()
	const navigate = useNavigate()



	useEffect(() => {
		const verifyCurrentUser = async () => {
			const receivedUser = await getCurrentUserInfo()
	
			if(receivedUser) {
				navigate('/dashboard')	
			}
		}
	  
		!isShowcase && verifyCurrentUser() 
	}, [ navigate ])



    return <div className={ classes.root }>
				<div className={ classes.catchPhraseContainer }>

					<h1 className={ classes.catchPhrase }>
							Nirah, votre messager personnel
					</h1>
					<LogInButton />

				</div>
			</div>
}



export default Home