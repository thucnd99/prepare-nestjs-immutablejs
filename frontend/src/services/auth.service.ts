import { NewUser } from '../models/user/register.user.interface'
import { UpdateUser } from '../models/user/update.user.interface'
import axiosInstance from './axiosInstance'

export const login = (email: string, password: string) => {
    return axiosInstance.post(process.env.REACT_APP_BASE_URL+"auth/login" ,{email: email, password: password})
}

export const viewProfile = () => {
    return axiosInstance.get("auth/profile")
}

export const updateProfile = (user: UpdateUser) => {
    return axiosInstance.post("auth/update", {...user})
}

export const register = (user: NewUser) => {
    return axiosInstance.post(process.env.REACT_APP_BASE_URL+"auth/register", {...user})
}