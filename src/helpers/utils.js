import { jwtDecode as decode } from "jwt-decode";

export const isUserAdmin = (user)=>{
    if(!user) return;

    return user?.role?.includes("admin")
}

export const checkTokenValidity = (token) =>{
    const expirationDate = decode(token).exp
    const isExpired = expirationDate * 1000 < new Date().getTime()
    return isExpired
}