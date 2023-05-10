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

const updateProduct = async (productId, product) => {
    const response = await axios.post(API_URL + "products/" + productId, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    return response.data
}

const getProducts = async () => {
    const response = await axios.get(API_URL + "products")
    return response
}

const getProductsWitchActivePromotion = async () => {
    const response = await axios.get(API_URL + "products/withActivePromotion")
    return response
}

const getProductsWithPaginatedActivePromotion = async () => {
    const response = await axios.get(API_URL + "products/withPaginatedPromotion")
    return response
}

const getProduct = async (productId) => {
    const response = await axios.get(API_URL + "products/" + productId)
    return response
}

const getPaginatedProduct = async (productId) => {
    const response = await axios.get(API_URL + "products?pagination=true")
    return response
}

const deleteProduct = async (productId) => {
    const response = await axios.delete(API_URL + "products/" + productId, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return response
}

export default { setProduct, getProducts, deleteProduct, getProduct, updateProduct, getProductsWithPaginatedActivePromotion, getProductsWitchActivePromotion, getPaginatedProduct }