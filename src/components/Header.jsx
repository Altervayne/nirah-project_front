import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { useTheme } from "@mui/material"
import { useMediaQuery } from "@mui/material"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			display: "flex",
			justifyContent: "center",
			alignContent: "center",

			width: "100%",
			padding: "5px 0",
            zIndex: 4,

			backgroundColor: "#121420",
			boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",

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

			width: "auto",

			[theme.breakpoints.down('sm')]: {
				height: theme.spacing(6),	
			},
			[theme.breakpoints.up('sm')]: {
				height: theme.spacing(4.5),	
			},
			[theme.breakpoints.up('md')]: {
				height: theme.spacing(6),	
			}
		},
		title: {
			display: "flex",
			color: "#ED872D",

			margin: "0",
            marginLeft: "-4px",
			width: "auto",

            fontFamily: "Helvetica",
			fontWeight: 600,

			overflow: "hidden",
			whiteSpace: "nowrap",

			[theme.breakpoints.down('sm')]: {
				marginLeft: "-4px",
				fontSize: theme.typography.pxToRem(34),
			},
			[theme.breakpoints.up('sm')]: {
				marginLeft: "0",
				fontSize: theme.typography.pxToRem(30),	
			},
			[theme.breakpoints.up('md')]: {
				marginLeft: "
				<AppSettingsMenu />-4px",
				fontSize: theme.typography.pxToRem(34),
			}
		},
		titleAndLogoContainer: {
			display: "flex",
			justifyContent: "center",
			alignContent: "center",
            alignItems: "flex-end",

			textDecoration: "none",
			cursor: "pointer",
		},
	}
})



const logoRotation = {
	rest: {
		rotate: "31deg",
	},
	hover: {
		rotate: "0deg",
	}
}

const titleAnimation = {
	rest: {
		width: "0px",
	},
	hover: {
		width: "auto",
	}
}



const Header = () => {
	const { classes } = useStyles()

	const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

	return (
		<header className={ classes.root }>
			<motion.a className={ classes.titleAndLogoContainer } href="/"
				initial="rest"
				animate={ isSmallScreen ? "hover" : "rest" }
				whileHover={ isSmallScreen ? null : "hover" }
			>
				<motion.img
					src='/images/logos/nirah_logo.png'
					alt='Logo de Nirah'
					className={ classes.logo }
					variants={ logoRotation }
					transition={{
						duration: .3,
						delay: isSmallScreen ? .5 : 0,
					}}
				/>
                <motion.p
					className={ classes.title }
					variants={ titleAnimation }
					transition={{
						duration: .3,
						delay: isSmallScreen ? .5 : 0,
					}}
				>
					I R A H
				</motion.p>
			</motion.a>
		</header>
	)
}



export default Header