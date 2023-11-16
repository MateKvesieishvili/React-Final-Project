import { Box, Card, CardActions, Grid, styled } from '@mui/material';
import React from 'react';
import { Button, Text } from '../../atoms';
import { Link } from '../../atoms';
import { ProductCardActions } from './ProductCardActions';
import { useUser } from '../../../hooks';
import { useTranslation } from 'react-i18next';

const StyledImage = styled('img')(() => ({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  borderRadius: '20px',
}));

const StyledInfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
}));

const StyledCard = styled(Card)(() => ({
  width: '300px',
  height: '450px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundColor: '#EFF2FF',
  transition: 'all 0.5s',
  borderRadius: '15px',
}));

const StyledDeviceName = styled(Text)(({ theme }) => ({
  fontFamily: "'Roboto Slab', serif",
  fontSize: '12px',
  color: '#003049',
  fontWeight: 600,
}));

const StyledCardDesc = styled(Text)(({ theme }) => ({
  fontFamily: "'Roboto Slab', serif",
  fontSize: '10px',
  color: '#6C6C6C',
  fontWeight: 300,
}));

const StyledPriceTag = styled(Text)(({ theme }) => ({
  fontFamily: "'Roboto Slab', serif",
  fontSize: '12px',
  color: '#003049',
  fontWeight: 500,
}));

const CenteredGridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
});

export const ProductCards = ({ product }) => {
  const { _id, name, price, image, brand, description, category } = product;
  const { user } = useUser();
  const {t} = useTranslation()

  return (
    <CenteredGridItem item xs={12} sm={12} md={4} lg={3}>
      <StyledCard>
          <StyledImage src={image} alt={`${brand}-${name}`} />
          <StyledInfoContainer>
            <StyledDeviceName>{name}</StyledDeviceName>
            {/* <StyledCardDesc>{description}</StyledCardDesc> */}
            <StyledPriceTag>${price}</StyledPriceTag>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ProductCardActions user={user} product={product} />
              </CardActions>
            </Box>
        <Link to={`/products/categories/${category}/${_id}`} style={{ textDecoration: 'none' }}>
          <Button>{t("more_info")}</Button> 
          {/* აქ გავაკეთე ასე, რადგან ასეთი ბაგი მქონდა: როდესაც დავაჭერდი ნებისმიერი სახის ღილაკს გადავყავდი Single Product გვერდზე */}
        </Link>
          </StyledInfoContainer>
      </StyledCard>
    </CenteredGridItem>
  );
};
