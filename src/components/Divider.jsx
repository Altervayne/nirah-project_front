import React from "react"
import { makeStyles } from "tss-react/mui"



const useStyles = makeStyles()((theme) => {
	return {
        root: {
            fontWeight: 600,

            color: "#C2D4EB",

            boxSizing: "border-box",
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(1),

            [theme.breakpoints.down('sm')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),       
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
            },

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