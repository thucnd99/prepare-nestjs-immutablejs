import axios from 'axios'
import { store } from '../redux/store'
import { getToken } from './auth.service'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-type": "application/json", 
      }    
})

axiosInstance.interceptors.request.use((config) =>{
    // const state = store.getState()
    // const token = state.auth.token;
    const token = getToken()
    config.headers.Authorization = "Bearer " + token;
    config.params = config.params || []
    return config
})

export default axiosInstance