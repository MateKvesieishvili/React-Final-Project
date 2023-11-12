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

export const getUserInitials = (user)=>{
    if(!user) return ""

    return `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
}

export const getUserFullName = (user) => {
    if (!user) return "";
  
    const capitalizeFirstLetter = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };
  
    const capitalizedFirstName = capitalizeFirstLetter(user.firstName);
    const capitalizedLastName = capitalizeFirstLetter(user.lastName);
  
    return `${capitalizedFirstName} ${capitalizedLastName}`;
  };

export const getUserRole = (user)=>{
    if (!user) return ""

    if (user.role.includes("admin")) {
        return "Admin"
    } else {
        return "User"
    }
}