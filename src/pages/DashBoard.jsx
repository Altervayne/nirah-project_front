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

			width: "80%",
			height: "100vh",
			maxHeight: "100vh",

			position: "absolute",
			top: "0",
            right: "0",
			zIndex: "0",
		},
        largeLogo: {
            width: "20%",
        },
        largeLogoTitle: {
            marginTop: "70px",

            fontSize: theme.typography.pxToRem(36),

            color: "#F2F4F8",
        },
	}
})



const DashBoard = () => {
    const { classes } = useStyles()

    return <div className={ classes.root }>
                <NavMenu />
				<div className={ classes.mainContainer }>
                    <img src="/images/logos/nirah_logo.png" alt="Nirah, Serpent mascotte de l'application" className={ classes.largeLogo }/>
                    <h2 className={ classes.largeLogoTitle }>Rejoignez un salon pour parler avec vos amis !</h2>
				</div>
			</div>
}



export default DashBoard