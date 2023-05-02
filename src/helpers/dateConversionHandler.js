import { moment } from "moment"



const convertDate = (date) => {
    const now = moment()
    const sentDate = moment(date)

    if(date.isSame(now, "day")) {
        return sentDate.format("HH:mm")
    } else {
        const daysAgo = now.diff(sentDate, "days")

        if(daysAgo === 1) {
            return "Hier"
        } else {
            return `Il y a ${daysAgo} jours`
        }
    }
}



export { convertDate }