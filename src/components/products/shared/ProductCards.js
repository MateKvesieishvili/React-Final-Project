import { Box, Card, CardActions, Grid, styled } from '@mui/material'
import React from 'react'
import { Link, Text } from '../../atoms'
import { ProductCardActions } from './ProductCardActions'
import { useUser } from '../../../hooks'

const StyledImage = styled("img")(()=>({
    objectFit: "cover",
    width: "100%",
    height: "100%"

}))

const StyledInfoContainer = styled(Box)(()=>({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 20px"
}))

export const ProductCards = ({product}) => {
    const {_id, name, price, image, brand, description, category} = product
    const {user} = useUser()
  return (
    <Grid item xs={12} sm={12} md={4} lg={3}>
        <Card sx={{borderRadius: 10}}>
            <Link to={`/products/categories/${category}/${_id}`}>
                <StyledImage src={image} alt={`${brand}-${name}`}/>
                <StyledInfoContainer>
                    <Text sx={{fontWeight: "bold"}}>{name}</Text>
                    <Text sx={{fontWeight: "bold"}}>${price}</Text>
                </StyledInfoContainer>
            </Link>
            <CardActions
                sx={{
                    display:"flex",
                    justifyContent:"center",
                }}
            >
                <ProductCardActions user={user} product={product}/>
            </CardActions>
        </Card>
    </Grid>
  )
}
