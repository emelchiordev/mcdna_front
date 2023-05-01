import axios from "axios"
import { API_URL } from "./config"

const setLogin = async (credentials) => {

    const response = await axios.post(API_URL + "login_check", credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8000',
            'Access-Control-Allow-Headers': 'Origin',
            'X-Requested-With': 'XMLHttpRequest',

        },
        withCredentials: true

    })
    return response

}

export default { setLogin }