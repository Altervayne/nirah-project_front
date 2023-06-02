import axios from 'axios'
import { apiUrl } from '../data/variables'

const url = `${apiUrl}/api`



const logInHelper = (email, password) => {
    const userData = { email: email, password: password }

    return axios.post(`${url}/auth/login`, userData, { withCredentials: true })
            .then((response) => {
                return { success: true }
            })
            .catch((error) => {
                return { success: false, message: error.response.data.message }
            })  
}



const signUpHelper = (username, email, password) => {
    const userData = { username: username, email: email, password: password }

    return axios.post(`${url}/auth/signup`, userData, { withCredentials: true })
            .then((response) => {
                return { success: true, token: response.data.token }
            })
            .catch((error) => {
                return { success: false, message: error.response.data.message }
            })
}



const logOutHelper = async () => {
    try {
        await axios.get(`${url}/auth/logout`, { withCredentials: true })

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    } catch (error) {
        console.error(error);
    }
}



const deleteAccountHelper = async (password) => {
    const userData = { password: password }

    return axios.delete(`${url}/auth/delete`, { withCredentials: true, data: userData })
            .then((response) => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                return { success: true }
            })
            .catch((error) => {
                return { success: false, message: error.response.data.error }
            })
}



const changePasswordHelper = async (formData) => {
    const requestData = {
        oldPassword: formData.oldPassword.value,
        newPassword: formData.newPassword.value
    }

    const formIsValid = (formData.newPassword.valid && formData.newPasswordVerification.valid)

    if(!formIsValid) {
        return { success: false, message: 'Les données rentrées sont invalides' }
    } else {
        return axios.post(`${url}/auth/changePassword`, requestData, { withCredentials: true })
                    .then((response) => {
                        return { success: true, message: 'Le mot de passe a été changé.' }
                    })
                    .catch((error) => {
                        return { success: false, message: error.response.data.message }
                    })
    }
}



export { logInHelper, signUpHelper, logOutHelper, deleteAccountHelper, changePasswordHelper }