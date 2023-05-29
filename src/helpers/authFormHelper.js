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



const changePasswordHelper = async (formData) => {
    const requestData = {
        oldPassword: formData.oldPassword.value,
        newPassword: formData.newPassword.value
    }

    const formIsValid = (formData.newPassword.valid && formData.newPasswordVerification.valid)

    if(!formIsValid) {
        return 'Les données rentrées sont invalides'
    } else {
        return axios.post(`${apiUrl}/auth/changePassword`, requestData, { withCredentials: true })
                    .then((response) => {
                        return { success: true, message: 'Le mot de passe a été changé.' }
                    })
                    .catch((error) => {
                        console.log(error)

                        return { success: false, message: error.response.data.error }
                    })
    }
}



export { logInHelper, signUpHelper, logOutHelper, deleteAccountHelper, changePasswordHelper }