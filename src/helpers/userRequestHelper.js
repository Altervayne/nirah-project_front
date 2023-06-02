import axios from 'axios'
import { apiUrl } from '../data/variables'

const url = `${apiUrl}/api/auth`



const getCurrentUserInfo = () => {
    return axios.get(`${url}/user`, { withCredentials: true })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



export { getCurrentUserInfo }