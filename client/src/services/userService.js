import api from './api.js'
import { apiEndpoints } from '../constants/apiEndpoints.js'

export const getUser = async (params) => {
    
    const response = await api.get(
        apiEndpoints.user.getUser
    )

    return response.data

}

export const getUserActivity = async (params) => {
    
    const response = await api.get(
        apiEndpoints.user.getActivity
    )

    return response.data

}

export const logoutUser = async () => {

    const response = await api.post(
        apiEndpoints.auth.logout
    )

    return response.data

}

export const UpdateProfilePic = async (formData) => {
    const response = await api.put(
        apiEndpoints.user.updateDp,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
    )
}

export const DeleteProfilePic = async (formData) => {
    const response = await api.delete(
        apiEndpoints.user.deleteDp,
        {
            withCredentials: true
        }
    )
}

export const UpdateProfileInfo = async (formData) => {
    const response = await api.put(
        apiEndpoints.user.updateUser,
        formData
    )
    return response.data
}

export const ChangePass = async (payload) => {
    const response = await api.put(
        apiEndpoints.user.changePassword,
        payload
    )
    return response.data
}