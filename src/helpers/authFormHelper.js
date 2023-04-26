import axios from 'axios'

const apiUrl = 'http://localhost:4200'

exports.logIn = (email, password) => {
    const userData = { email: email, password: password }

    axios.post(apiUrl, userData)
        .then((response) => {
            console.log(response.status)
            localStorage.setItem("token", JSON.stringify(response.data.token))
        })
        .catch((error) => console.log(error))
}