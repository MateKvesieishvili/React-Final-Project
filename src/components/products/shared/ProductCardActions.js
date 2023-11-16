import React from 'react';
import { isUserAdmin } from '../../../helpers';
import { Box } from '@mui/material';
import { Button, Text } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, deleteProduct, removeFromCart, setSelectedProduct } from '../../../redux';
import { useCart } from '../../../hooks';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTranslation } from 'react-i18next';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductCardActions = ({ user, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useCart();
  const { t } = useTranslation();

  if(!product){
    return null
  }

  if (isUserAdmin(user)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center"}}>
        <Button
          onClick={() => {
            navigate(`/products/edit/${product._id}`);
            dispatch(setSelectedProduct(product));
          }}
        >
          <EditIcon sx={{
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
            }}/>
        </Button>

        <Button
          onClick={() => {
            dispatch(deleteProduct(product._id));
          }}
        >
         <DeleteIcon sx={{
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
            }}/>
        </Button>
      </Box>
    );
  }

  const isProductInCart = cartItems.find((item) => item.product._id === product._id);

  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
      {!isProductInCart ? (
        <Button onClick={() => dispatch(addToCart(product))}>
          <AddShoppingCartIcon
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
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={() => dispatch(removeFromCart(product._id))}>
            <RemoveCircleIcon sx={{
              color: "#F77F00", 
              fontSize: "24px", 
              borderRadius: "50%",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", 
              transition: "background-color 0.3s ease", 
              "&:hover": {
                color: "#FFA726",
              },
            }}/>
          </Button>
          <Text sx={{color: '#003049'}}>{isProductInCart.quantity}</Text>
          <Button onClick={() => dispatch(addToCart(product))}>
            <AddCircleIcon sx={{
              color: "#F77F00", 
              fontSize: "24px", 
              borderRadius: "50%",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", 
              transition: "background-color 0.3s ease", 
              "&:hover": {
                color: "#FFA726",
              },
            }}/>
          </Button>
        </Box>
      )}
    </Box>
  );
};
