import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			display: "flex",
			justifyContent: "center",
			alignContent: "center",

			width: "100%",
			padding: "5px 0",
            zIndex: "3",

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
			width: "auto",

            fontFamily: "Helvetica",
			fontWeight: 600,

			overflow: "hidden",
			whiteSpace: "nowrap",

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

	return (
		<header className={ classes.root }>
			<motion.div
				className={ classes.titleAndLogoContainer }
				onClick={() => ( window.location.href="/" )}
				initial="rest"
				animate="rest"
				whileHover="hover"
				transition={{
					duration: 0.2,
				}}
			>
				<motion.img
					src='/images/logos/nirah_logo.png'
					alt='Logo de Nirah'
					className={ classes.logo }
					variants={ logoRotation }
				/>
                <motion.p
					className={ classes.title }
					variants={ titleAnimation }
				>
					I R A H
				</motion.p>
			</motion.div>
		</header>
	)
}



export default Header