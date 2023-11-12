import { AppBar, Box, Toolbar, styled } from '@mui/material'
import byteMarketSVG from "../../assets/icons/BYTEMARKET LOGO 2 1.svg"
import React from 'react'
import { Link } from 'react-router-dom'
import { Searchbar } from './Searchbar'
import { LanguageSelect } from '../atoms'
import {UserBox} from "./UserBox"
import { useTranslation } from 'react-i18next'


const StyledAppBar = styled(AppBar)(()=>(
   {
        
        padding: '20px 76px',
        backgroundColor: '#EFF2FF',
        position: "relative"
        
   }
))
const StyledToolBar = styled(Toolbar)(()=>(
    {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
))
export const Header = () => {
    const {t} = useTranslation()
  return (
    <div>
        <StyledAppBar>
            <StyledToolBar>
                <Link to="/">
                    <img src={byteMarketSVG} alt="icon_logo"></img>
                </Link>
                <Searchbar/>
                <Box 
                sx={{
                display: "flex",
                alignItems: "center",
                }}><button>{t("shopping_cart")}</button></Box>
                <UserBox></UserBox>
                <LanguageSelect/>
            </StyledToolBar>
        </StyledAppBar>
    </div>
  )
}

