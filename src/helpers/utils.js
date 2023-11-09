export const isUserAdmin = (user)=>{
    if(!user) return;

    return user?.role?.includes("admin")
}