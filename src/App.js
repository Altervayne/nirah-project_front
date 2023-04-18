import React from "react"
import { makeStyles } from "tss-react/mui"
import Header from "./components/Header"
import ReactRoutes from "./Routes.jsx"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

			width: "100%",
			height: "100vh",

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
		</div>
	)
}



export default App