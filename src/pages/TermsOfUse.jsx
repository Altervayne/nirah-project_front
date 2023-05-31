import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { makeStyles } from "tss-react/mui"



const useStyles = makeStyles()((theme) => {
	return {
		root: {
			width: "100%",
			height: "100%",
		},
	}
})



const TermsOfUse = () => {
    const { classes } = useStyles()
	const navigate = useNavigate()



    return <div className={ classes.root }>
				
			</div>
}



export default TermsOfUse