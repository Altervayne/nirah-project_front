import React from "react"
import { makeStyles } from "tss-react/mui"



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

			minWidth: "100%",
			height: "100vh",
			maxHeight: "100vh",

			position: "absolute",
			top: "0",
			zIndex: "0",

            backgroundColor: "#1B2432",
		},
	}
})



const DashBoard = () => {
    const { classes } = useStyles()

    return <div className={ classes.root }>
				<div className={ classes.mainContainer }>
                    Test
				</div>
			</div>
}



export default DashBoard