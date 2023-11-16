import styled from '@emotion/styled'
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { getUserRole, getUserInitials, getUserFullName, isUserAdmin } from '../../helpers'
import { useUser } from '../../hooks'
import { Button, LanguageSelect, Text } from '../atoms'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { clearCart, logout } from '../../redux'
import { useDispatch } from 'react-redux'
import AddCardIcon from '@mui/icons-material/AddCard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const StyledBox = styled(Box)(()=>({
    display: "flex",
    flexDirection: "column",

}))

export const UserBox = () => {
    const {user} = useUser()
    const [anchor, setAnchor] = useState(null)
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <Box>
        <IconButton onClick={(e)=>setAnchor(e.currentTarget)}>

            <StyledBox>
                <Text sx={{
                    fontWeight: "bold",
                }}>{getUserFullName(user)}</Text>
                <Text>{getUserRole(user)}</Text>
            </StyledBox> 

            <Avatar>
                {getUserInitials(user)}
            </Avatar>

        </IconButton>
        <Menu 
            anchorEl={anchor} 
            keepMounted
            open={Boolean(anchor)}
            onClose={()=>{
                setAnchor(null)
            }}
        >
            <StyledBox>
                {!user && (<>
                    <MenuItem>
                        <Button onClick={()=> navigate("/login")}>{t("sign_in")} <LoginIcon/></Button>
                        <Button onClick={()=> navigate("/register")}>{t("sign_up")} <AppRegistrationIcon/></Button>
                    </MenuItem>
                </>)}
                {user && (
                    <MenuItem>
                        <Button onClick={()=>{
                            dispatch(logout())
                            dispatch(clearCart())
                            localStorage.setItem("cartItems", JSON.stringify([]))
                    }
                        } >{t("logout")} <LogoutIcon/>
                        </Button>

                    </MenuItem>
                )}
                {
                    isUserAdmin(user) && (
                        <MenuItem>
                            <Button onClick={()=>navigate("/product/new")}>
                                {t("add_product")} <AddCardIcon/>
                            </Button>
                        </MenuItem>
                    )
                }
                        <LanguageSelect/>
            </StyledBox>
        </Menu>
    </Box>
  )
}