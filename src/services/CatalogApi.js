import axios from "axios"
import { API_URL } from "./config"

const setProduct = async (product) => {
    const response = await axios.post(API_URL + "products", product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    return response
}

const getProduct = async () => {
    const response = await axios.get(API_URL + "products")
    return response
}

export default { setProduct, getProduct }