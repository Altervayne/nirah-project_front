import React from "react"
import { makeStyles } from "tss-react/mui"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			display: "flex",
			justifyContent: "center",
			alignContent: "center",

			width: "100%",
			padding: "5px 0",
            zIndex: "1",

			backgroundColor: "#121420",
			boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.07)",

			[theme.breakpoints.down('sm')]: {
				height: theme.spacing(8),	
			},
			[theme.breakpoints.up('sm')]: {
				height: theme.spacing(6),	
			},
			[theme.breakpoints.up('md')]: {
				height: theme.spacing(8),	
			}
		},
		logo: {
			display: "flex",
			alignSelf: "center",
			zIndex: 3,

			[theme.breakpoints.down('sm')]: {
				width: theme.spacing(6),
				height: theme.spacing(6),	
			},
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(4),
				height: theme.spacing(4),	
			},
			[theme.breakpoints.up('md')]: {
				width: theme.spacing(6),
				height: theme.spacing(6),	
			}
		},
		title: {
			display: "flex",
			color: "#ED872D",
			margin: "0",
            marginLeft: "-4px",

            fontFamily: "Helvetica",
			fontWeight: 600,

			[theme.breakpoints.down('sm')]: {
				fontSize: theme.typography.pxToRem(34),
			},
			[theme.breakpoints.up('sm')]: {
				fontSize: theme.typography.pxToRem(30),	
			},
			[theme.breakpoints.up('md')]: {
				fontSize: theme.typography.pxToRem(34),
			}
		},
		titleAndLogoContainer: {
			display: "flex",
			justifyContent: "center",
			alignContent: "center",
            alignItems: "flex-end",

			cursor: "pointer",
		},
	}
})



const Header = () => {
	const { classes } = useStyles()

	return (
		<header className={ classes.root }>
			<div
				className={ classes.titleAndLogoContainer }
				onClick={() => ( window.location.href="/" )}
			>
				<img
					src='/images/logos/nirah_logo.png'
					alt='Logo de Nirah'
					className={ classes.logo }
				/>
                <p className={ classes.title }>I R A H</p>
			</div>
		</header>
	)
}



export default Header