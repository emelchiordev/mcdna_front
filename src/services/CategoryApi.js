import axios from "axios"
import { API_URL } from "./config"

const setCategory = async (category) => {
    const response = await axios.post(API_URL + "categories", category, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return response
}

const deleteCategory = async (categoryId) => {
    const response = await axios.delete(API_URL + "categories/" + categoryId, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return response
}

const updateCategory = async (categoryId, category) => {
    const response = await axios.put(API_URL + "categories/" + categoryId, category, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return response.data
}

const getCategories = async () => {
    const response = await axios.get(API_URL + "categories")
    return response
}

export default { setCategory, getCategories, deleteCategory, updateCategory }