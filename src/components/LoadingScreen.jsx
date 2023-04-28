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

            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "999",
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



const LoadingScreen = ({ isActive, startsActivated }) => {
    const { classes } = useStyles()

    return  <motion.div className={ classes.root }
                initial={{
                    display: startsActivated ? "flex" : "none",
                    visibility: startsActivated ? "visible" : "hidden",
                    opacity: startsActivated ? 1 : 0
                }}
                animate={{
                    display: isActive ? "flex" : "none",
                    visibility: isActive ? "visible" : "hidden",
                    opacity: isActive ? 1 : 0,
                }}
                transition={{
                    ease: 'linear',
                    duration: .2, 
                    display: { delay: !isActive ? .2 : 0 },
                    visiblity: { delay: !isActive ? .2 : 0 }
                }}
            >
                <motion.div className={ classes.spinnerRoot }
                    initial={{
                        rotate: 0,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        ease: 'linear',
                        repeat: Infinity,
                        duration: .5, 
                    }}
                >
                    <AiOutlineLoading className={ classes.spinner }/>
                </motion.div>
            </motion.div>
}



export default LoadingScreen