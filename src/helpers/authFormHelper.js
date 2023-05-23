import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'



const logInHelper = (email, password) => {
    const userData = { email: email, password: password }

    return axios.post(`${apiUrl}/auth/login`, userData, { withCredentials: true })
            .then((response) => {
                return { success: true }
            })
            .catch((error) => {
                return { success: false, message: error.response.data.message }
            })  
}



const signUpHelper = (username, email, password) => {
    const userData = { username: username, email: email, password: password }

    return axios.post(`${apiUrl}/auth/signup`, userData, { withCredentials: true })
            .then((response) => {
                return { success: true, token: response.data.token }
            })
            .catch((error) => {
                return { success: false, message: error.response.data.message }
            })
}



const logOutHelper = async () => {
    try {
        await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true })

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    } catch (error) {
        console.error(error);
    }
}



const deleteAccountHelper = async (password) => {
    const userData = { password: password }

    return axios.delete(`${apiUrl}/auth/delete`, userData, { withCredentials: true })
            .then((response) => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                return { success: true }
            })
            .catch((error) => {
                console.log(error)

                return { success: false, message: error.response.data.error }
            })
}



export { logInHelper, signUpHelper, logOutHelper, deleteAccountHelper }