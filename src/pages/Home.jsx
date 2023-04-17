import React from "react"
import { makeStyles } from "tss-react/mui"

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
			
			[theme.breakpoints.down('sm')]: {
				justifyContent: "space-evenly",
			},
            [theme.breakpoints.up('sm')]: {
				justifyContent: "space-evenly",
			},
			[theme.breakpoints.up('md')]: {
				justifyContent: "space-between",
			},
			[theme.breakpoints.up('lg')]: {
				justifyContent: "space-evenly",
			},
			"&::before": {
                content: "''",
                position: "absolute",
                left: 0,
                top: 0,
				zIndex: 1,
                width: "100%",
				height: "100%",
                display: "inline-block",
                background: "linear-gradient(180deg, rgba(27, 36, 50, 1) 0%, rgba(27, 36, 50, .5) 65%, rgba(0, 0, 0, 0) 100%)",
            },
		},
		catchPhrase: {
			position: "relative",
			zIndex: 2,

			color: "#ED872D",
			fontFamily: "Helvetica",

			[theme.breakpoints.down('sm')]: {
				
			},
            [theme.breakpoints.up('sm')]: {
				
			},
			[theme.breakpoints.up('md')]: {
				height: theme.spacing(24),
				fontSize: theme.typography.pxToRem(46),
			},
			[theme.breakpoints.up('lg')]: {
				
			},
		},
	}
})

const Home = () => {
    const { classes } = useStyles()

    return <div
				className={ classes.root }
			>
				<div
					className={ classes.catchPhraseContainer }
				>
					<h1 className={ classes.catchPhrase }>
							Nirah, votre messager personnel
					</h1>
				</div>
			</div>
}

export default Home