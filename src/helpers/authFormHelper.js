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
    console.log("Log out helper is working...")

    try {
        console.log("Log out helper is sending a get request...")
        await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true })

        console.log("Log out helper has sent a get request...")

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log("Log out helper has finished with the request and has removed the cookie.")

    } catch (error) {
        console.error(error);
    }
}



export { logInHelper, signUpHelper, logOutHelper }