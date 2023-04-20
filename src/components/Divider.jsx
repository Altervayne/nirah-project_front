import React from "react"
import { makeStyles } from "tss-react/mui"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            fontWeight: 600,

            color: "#C2D4EB",

            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(1),

            "&::after": {
                content: "''",
                display: "block",

                height: "1px",
                width: "100%",

                marginTop: theme.spacing(1),

                backgroundColor: "#C2D4EB",
            }
        },
    }
})



const Divider = ({ title }) => {
    const { classes } = useStyles()

    return  <p className={ classes.root }>
                { title }
            </p>
}



export default Divider