import { User } from '../models/user.interface'
import axiosInstance from './axiosInstance'

export const login = (email: string, password: string) => {
    return axiosInstance.post(process.env.REACT_APP_BASE_URL+"auth/login" ,{email: email, password: password})
}

export const viewProfile = () => {
    return axiosInstance.get("auth/profile")
}

export const updateProfile = (user: User) => {
    console.log(user)
    return axiosInstance.post("auth/update", {...user})
}

export const register = (user: User) => {
    return axiosInstance.post(process.env.REACT_APP_BASE_URL+"auth/register", {...user})
}