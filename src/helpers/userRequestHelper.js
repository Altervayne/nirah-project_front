import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'
let token = localStorage.getItem('token')

const isLoggedIn = () => {
    return !!token
}

if(isLoggedIn()) {
    token = token.replace(/"/g, '')
}

const requestConfig = {
    headers: { 'Authorization': `Bearer ${token}` }
}



const getCurrentUserInfo = () => {
    return isLoggedIn() ?   axios.get(`${apiUrl}/auth/user`, requestConfig)
                                .then((response) => {
                                    return response.data
                                })
                                .catch((error) => {
                                    localStorage.removeItem('token')

                                    return false
                                })
                        :   false
}



export { getCurrentUserInfo }