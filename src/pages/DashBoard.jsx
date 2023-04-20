import React from "react"
import { makeStyles } from "tss-react/mui"
import NavMenu from "../components/NavMenu"



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
				width: "65%",
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

    return <div className={ classes.root }>
                <NavMenu isChatRoom={ false } chatRoomId={ null }/>
				<div className={ classes.mainContainer }>
                    <img src="/images/logos/nirah_logo.png" alt="Nirah, Serpent mascotte de l'application" className={ classes.largeLogo }/>
                    <h2 className={ classes.largeLogoTitle }>Rejoignez un salon pour parler avec vos amis !</h2>
				</div>
			</div>
}



export default DashBoard