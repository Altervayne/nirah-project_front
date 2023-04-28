import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'



const logInHelper = (email, password) => {
    const userData = { email: email, password: password }

    return axios.post(`${apiUrl}/auth/login`, userData)
            .then((response) => {
                console.log(response.status)
                localStorage.removeItem('token')
                localStorage.setItem('token', JSON.stringify(response.data.token))

                return { success: true }
            })
            .catch((error) => {
                console.log(error)
                return { success: false, message: error.response.data.message }
            })
        
}


const signUpHelper = (username, email, password) => {
    const userData = { username: username, email: email, password: password }

    return axios.post(`${apiUrl}/auth/signup`, userData)
            .then((response) => {
                console.log(response.status)
                localStorage.removeItem('token')
                localStorage.setItem('token', JSON.stringify(response.data.token))

                return { success: true }
            })
            .catch((error) => {
                console.log(error)
                return { success: false, message: error.response.data.message }
            })
}



export { logInHelper, signUpHelper }