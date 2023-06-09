import React from "react"
import { makeStyles } from "tss-react/mui"
import Header from "./components/Header"
import ReactRoutes from "./Routes.jsx"
import CookiePrompt from "./components/CookiePrompt"
import Disclaimer from "./components/Disclaimer"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			width: "100%",
			height: "100vh",
			maxHeight: "100dvh",

			backgroundColor: "#1B2432",
		},
	}
})



const App = () => {
	const { classes } = useStyles()

	return (
		<div className={classes.root}>
			<Header />
			<ReactRoutes />
			<Disclaimer />
			<CookiePrompt />
		</div>
	)
}



export default App