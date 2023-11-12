import React from 'react';
import { isUserAdmin } from '../../../helpers';
import { Box } from '@mui/material';
import { Button, Text } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, deleteProduct, removeFromCart, setSelectedProduct } from '../../../redux';
import { useCart } from '../../../hooks';

export const ProductCardActions = ({ user, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useCart();

  if (isUserAdmin(user)) {
    return (
      <Box>
        <Button
          onClick={() => {
            navigate(`/products/edit/${product._id}`);
            dispatch(setSelectedProduct(product));
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteProduct(product._id));
          }}
        >
          Delete
        </Button>
      </Box>
    );
  }

  const isProductInCart = cartItems.find((item) => item.product._id === product._id);

  return (
    <Box>
      {!isProductInCart ? (
        <Button onClick={() => dispatch(addToCart(product))}>Add To Cart</Button>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={() => dispatch(removeFromCart(product._id))}>-</Button>
          <Text>{isProductInCart.quantity}</Text>
          <Button onClick={() => dispatch(addToCart(product))}>+</Button>
        </Box>
      )}
    </Box>
  );
};
