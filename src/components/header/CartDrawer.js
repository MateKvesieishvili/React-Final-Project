import React from 'react'
import { useDispatch } from 'react-redux'
import { useCart, useUser } from '../../hooks'
import { Box, Drawer, styled } from '@mui/material'
import { clearCart, saveCart } from '../../redux'
import { Button, Loading, LoadingWrapper, Text } from '../atoms'
import { useTranslation } from 'react-i18next';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const StyledCartItem = styled(Box)(()=>({
    width: 400,
    display: "flex",
    alignItems: "center",
    padding: "7px 20px",
    marginBottom: 20,
}))

const StyledImage = styled("img")(()=>({
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: 10,
}))

const StyledButtonContainer = styled(Box)(()=>({
    display: "flex",
    justifyContent: "center"
}))


export const CartDrawer = ({isCartOpen, setIsCartOpen, cartItems}) => {
    const dispatch = useDispatch()
    const {user} = useUser()
    const {loading} = useCart()
    const {t} = useTranslation()
  return (

    <Drawer open={isCartOpen} 
            onClose={()=>(setIsCartOpen(false))} 
            anchor="right">
        <LoadingWrapper isLoading={loading}>
                {cartItems.map((cartItem)=>{
                    const {product, quantity} = cartItem;
                    const {price, name, _id, image} = product
                    return <StyledCartItem key ={_id}>
                        <StyledImage src={image} alt={`${name}-img`}/>
                        <Box sx={{paddingLeft: 7}}>
                            <Text>{name}</Text>
                            <Text>{t("quantity")}: {quantity}</Text>
                            <Text>{t("total")}: ${quantity * price}</Text>
                        </Box>
                    </StyledCartItem>
                })}
                </LoadingWrapper>
                <StyledButtonContainer>
                    <Button onClick={()=>{
                        dispatch(clearCart())
                        setIsCartOpen(false)
                    }}>
                        <DeleteForeverIcon
                            sx={{
                                color: "white",
                                backgroundColor: "#F77F00",
                                borderRadius: "50%",
                                padding: "8px", 
                                fontSize: "24px", 
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", 
                                transition: "background-color 0.3s ease", 
                                "&:hover": {
                                  backgroundColor: "#FFA726",
                                },
                              }}
                        />
                    </Button>
                    {!!user && (
                        <Button onClick={()=>{
                            dispatch(saveCart({userId: user._id, cartItems}))
                        }}>
                            <SaveIcon
                               sx={{
                                color: "white",
                                backgroundColor: "#F77F00",
                                borderRadius: "50%",
                                padding: "8px", 
                                fontSize: "24px", 
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", 
                                transition: "background-color 0.3s ease", 
                                "&:hover": {
                                  backgroundColor: "#FFA726",
                                },
                              }}
                            />
                            
                        </Button>
                    )}
                </StyledButtonContainer>
    </Drawer>
  )
}
