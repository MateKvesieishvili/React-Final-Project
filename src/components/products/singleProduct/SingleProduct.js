import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchData, useUser } from '../../../hooks'
import { LoadingWrapper, Text } from '../../atoms'
import { Box, styled } from '@mui/material'
import { ProductCardActions } from '../shared/ProductCardActions'

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "#EFF2FF",
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  }));
  
  const StyledImage = styled('img')(() => ({
    width: '350px',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '10px',
  }));
  
  const Description = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '15px',
  });
  
  const StyledDeviceName = styled(Text)(({ theme }) => ({
    fontFamily: "'Roboto Slab', serif",
    fontSize: '24px',
    color: "#003049",
    fontWeight: 600,
  }));
  
  const StyledPriceTag = styled(Text)(({ theme }) => ({
    fontFamily: "'Roboto Slab', serif",
    fontSize: '24px',
    color:  "#003049",
    fontWeight: 500,
  }));
  
  const StyledDesc = styled(Text)(({ theme }) => ({
    fontFamily: "'Roboto Slab', serif",
    fontSize: '16px',
    color: "#6C6C6C",
    fontWeight: 300,
    textAlign: 'center',
  }));
  
  export const SingleProduct = () => {
    const { id, categoryName } = useParams();
    const { getData, data, loading, error } = useFetchData();
    const {user} = useUser()
    useEffect(() => {
      getData(`/products/category/${categoryName}/${id}`);
    }, [id, categoryName, getData]);
  
    const { image, name, brand, description, price } = data?.product || {};
  
    return (
      <LoadingWrapper isLoading={loading}>
        <Container>
          <StyledImage src={image} alt={`${name}-${brand}`} />
          <Box>
            <Description>
              <StyledDeviceName>{name}</StyledDeviceName>
            </Description>
            <Description>
              <StyledDesc sx={{maxWidth: "600px", textAlign:"justify"}}>{description}</StyledDesc>
            </Description>
            <Description>
              <StyledPriceTag>${price}</StyledPriceTag>
            </Description>
            <ProductCardActions user={user} product={data?.product}/>
          </Box>
        </Container>
      </LoadingWrapper>
    );
  }