import { AppBar, Badge, Box, Button, Toolbar, styled } from '@mui/material'
import byteMarketSVG from "../../assets/icons/BYTEMARKET LOGO 2 1.svg"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Searchbar } from './Searchbar'
import { LanguageSelect } from '../atoms'
import {UserBox} from "./UserBox"
import { useTranslation } from 'react-i18next'
import { CartDrawer } from './CartDrawer'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { useCart } from '../../hooks'
import { ProductCategories } from './ProductCategories'


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
    const [isCartOpen, setIsCartOpen] = useState(false)
    const {cartItems} =  useCart()
  return (
    <Box>
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
                }}>
                    <Button onClick={()=>setIsCartOpen(true)}>
                        <Badge badgeContent={cartItems.length} color="primary">
                            <AiOutlineShoppingCart size={30} color="#003049"/>
                        </Badge>
                    </Button>
                     <UserBox/>
                </Box>
            </StyledToolBar>
                <ProductCategories/>
        </StyledAppBar>
        <CartDrawer 
            isCartOpen={isCartOpen} 
            setIsCartOpen={setIsCartOpen}
            cartItems={cartItems}/>
    </Box>
  )
}

