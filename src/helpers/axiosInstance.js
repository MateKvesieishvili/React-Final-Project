import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
})

axiosInstance.interceptors.request.use(async (req)=>{
    const token = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("refresh_token")
    console.log("token" + token, refreshToken)
    if (!token || !refreshToken) return req


    req.headers.Authorization = `Bearer ${token}`
    return req
})