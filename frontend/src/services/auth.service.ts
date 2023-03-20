import axios from 'axios'
import { User } from '../models/user.interface'
import axiosInstance from './axiosInstance'

export const userData = {
    token: "",
    isLoggedIn: false,
}

export const login = (email: string, password: string) => {
    return axios.post(process.env.REACT_APP_BASE_URL+"auth/login" ,{email: email, password: password})
}

export const viewProfile = () => {
    return axiosInstance.get("auth/profile")
}

export const logout = () => {
    userData.isLoggedIn = false;
    userData.token = '';
}

export const updateProfile = (user: User) => {
    console.log(user)
    return axiosInstance.post("auth/update", {...user})
}

export const register = (user: User) => {
    return axios.post(process.env.REACT_APP_BASE_URL+"auth/register", {...user})
}

export const setToken = (token:string) => {
    userData.isLoggedIn = true;
    userData.token = token;
}

export const getToken = () => {
    return userData.token;
}

export const getCurrentUserStatus = () => {
    return userData.isLoggedIn;
}