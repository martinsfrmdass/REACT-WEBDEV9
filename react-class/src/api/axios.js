
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://56d45766-013d-48e4-aa35-8aef7e06a88f-00-3ctmccbbw7dbi.picard.replit.dev/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export const getErrorMessage = (err) =>
    err.response?.data?.message || err.message || "Something went wrong, Try again."