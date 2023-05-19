import axios from "axios"
import { API_URL } from "./config"

const setPromotion = async (promotion) => {
    const response = await axios.post(API_URL + "promotions", promotion, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return response
}

const deletePromotion = async (promotionId) => {
    const response = await axios.delete(API_URL + "promotions/" + promotionId, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return response
}

const getPromotion = async (productId) => {

    const response = await axios.get(API_URL + "promotions?products.id=" + productId)
    return response
}

export default { setPromotion, getPromotion, deletePromotion }