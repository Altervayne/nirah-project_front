/* Libraries imports */
import React, { useState, useEffect } from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"
/* Components imports */

/* React Icons imports */

/* Helper functions imports */




const useStyles = makeStyles()((theme) => {
	return {
		root: {
			zIndex: 6,
		},
	}
})



const AppSettingsMenu = () => {
	const { classes } = useStyles()
	const navigate = useNavigate()


	return  <div className={ classes.root }>
				
			</div>
}



export default AppSettingsMenu