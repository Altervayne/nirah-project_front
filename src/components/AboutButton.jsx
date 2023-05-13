import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			/* display: "flex",
			alignItems: "center",
			justifyContent: "center",

			position: "absolute",
			right: "0",

			width: "30px",
			height: "30px",
			margin: "15px",

			borderRadius: "15px",

			backgroundColor: "#121420", */
		},
		questionSymbol: {
			/* width: "20px",
			height: "20px",

			cursor: "pointer", */
		},
	}
})



const AboutButton = () => {
    const { classes } = useStyles()

    return 	<motion.div className={ classes.root }
                initial={{ scale: 1, color: "#F2F4F8" }}
                whileHover={{ scale: 1.1, color: "#ED872D" }}
                whileTap={{
                    color: "#ED872D",
                    scale: .97,
                }}>								
 
            </motion.div> 
}



export default AboutButton