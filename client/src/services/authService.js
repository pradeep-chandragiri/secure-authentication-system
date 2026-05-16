import api from "./api.js"
import { apiEndpoints } from "../constants/apiEndpoints.js"

export const registerUser = async (data) => {
    
    const response = await api.post(
        apiEndpoints.auth.register,
        data
    )

    return response.data

}

export const verifyEmail = async (token) => {
    const response = await api.get(
        apiEndpoints.auth.verifyEmail,
        { 
            params: { token }
        }
    )

    return response.data
}

export const loginUser = async (data) => {
    
    const response = await api.post(
        apiEndpoints.auth.login,
        data
    )

    return response.data

}

export const forgotPassword = async (identifier) => {

    const response = await api.post(
        apiEndpoints.auth.forgotPassword,
        { identifier }
    );

    return response.data;

}

export const resetPassword = async (password) => {

    const response = await api.put(
        apiEndpoints.auth.resetPassword,
        password,
        {
            withCredentials: true
        }
    );

    return response.data;

};