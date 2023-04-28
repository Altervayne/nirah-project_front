import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { AiOutlineLoading } from "react-icons/ai"



const useStyles = makeStyles()((theme) => {
    return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",

            backgroundColor: "rgba(0, 0, 0, .4)"
        },
        spinnerRoot: {
            width: "18vw",
            height: "18vw",
        },
        spinner: {
            color: "#C2D4EB",

            width: "18vw",
            height: "18vw",
        }
    }
})



const LoadingScreen = ( isLoaded ) => {
    const { classes } = useStyles()

    return  <motion.div className={ classes.root }
                initial={{ display: "block", visibility: "visible", opacity: 1 }}
                animate={{
                    display: isLoaded ? "none" : "block",
                    visibility: isLoaded ? "hidden" : "visible",
                    opacity: isLoaded ? 0 : 1,
                }}

                transition={{
                    ease: 'linear',
                    duration: .5, 
                    display: { delay: .5 },
                    visiblity: { delay: .5 }
                }}
            >
                <motion.div className={ classes.spinnerRoot }
                    initial={{ rotate: 0, display: "block", visibility: "visible", opacity: 1 }}
                    animate={{
                        rotate: [0, 360],
                        display: isLoaded ? "none" : "block",
                        visibility: isLoaded ? "hidden" : "visible",
                        opacity: isLoaded ? 0 : 1,
                    }}

                    transition={{
                        ease: 'linear',
                        repeat: Infinity,
                        duration: .5, 
                        display: { delay: .5 },
                        visiblity: { delay: .5 }
                    }}
                >
                    <AiOutlineLoading className={ classes.spinner }/>
                </motion.div>
            </motion.div>
}



export default LoadingScreen