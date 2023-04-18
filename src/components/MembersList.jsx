import React from "react"
import { makeStyles } from "tss-react/mui"
import { motion } from "framer-motion"
import { BsPersonAdd } from "react-icons/bs"
import { BsPersonFillCheck } from "react-icons/bs"



const useStyles = makeStyles()((theme) => {
	return {
        root: {

        },
    }
})



const MembersList = () => {
    const { classes } = useStyles()

    return  <div className={ classes.root }>
                test
            </div>
}



export default MembersList