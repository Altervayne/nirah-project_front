import dayjs from "dayjs"



const convertDate = (date) => {
    const now = dayjs()
    const sentDate = dayjs(date)

    if(sentDate.isSame(now, "day")) {
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