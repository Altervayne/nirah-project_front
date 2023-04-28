import React, { useState } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import NavMenu from "../components/NavMenu"
import LoadingScreen from "../components/LoadingScreen"



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

	const [isLoaded, setIsLoaded] = useState(false)




    return 	<>
				<motion.div className={ classes.root }
					initial={{ display: "none", visibility: "hidden", opacity: 0 }}
					animate={{
						display: !isLoaded ? "none" : "block",
						visibility: !isLoaded ? "hidden" : "visible",
						opacity: !isLoaded ? 0 : 1,
					}}

					transition={{
						ease: 'linear',
						repeat: Infinity,
						duration: .5, 
						display: { delay: .5 },
						visiblity: { delay: .5 }
					}}
				
				>
					<NavMenu isChatRoom={ false } chatRoomId={ null }/>
					<div className={ classes.mainContainer }>
						<img src="/images/logos/nirah_logo.png" alt="Nirah, Serpent mascotte de l'application" className={ classes.largeLogo }/>
						<h2 className={ classes.largeLogoTitle }>Rejoignez un salon pour parler avec vos amis !</h2>
					</div>									
				</motion.div>

				<LoadingScreen isLoaded={ isLoaded } />
			</>
			
}



export default DashBoard