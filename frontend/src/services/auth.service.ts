import axios from 'axios'
import { User } from '../models/user.interface'
import axiosInstance from './axiosInstance'

export const login = (email: string, password: string) => {
    return axios.post(process.env.BASE_URL+"auth/login" ,{email: email, password: password})
}

export const viewProfile = () => {
    return axiosInstance.get(process.env.BASE_URL+"auth/profile")
}

export const logout = () => {}

export const updateProfile = (user: User) => {
    return axiosInstance.post(process.env.BASE_URL+"auth/update", {...user})
}

export const register = (user: User) => {
    return axios.post(process.env.BASE_URL+"auth/register", {...user})
}