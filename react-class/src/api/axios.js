
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://backend-web-batch-9.vercel.app/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export const getErrorMessage = (err) =>
    err.response?.data?.message || err.message || "Something went wrong, Try again."