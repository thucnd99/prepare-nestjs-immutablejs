import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/actions/auth.actions";
import { redirect } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  config.headers.Authorization = "Bearer " + token;
  config.params = config.params || [];
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout);
      window.location.href = "/login";
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
