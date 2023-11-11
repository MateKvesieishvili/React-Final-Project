import React from 'react';
import { useProduct } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct, setSelectedProduct } from '../redux';

export const HomePage = () => {
  const { homePageProducts } = useProduct();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {homePageProducts.map((item) => {
        return (
          <div key={item._id}>
            <h2>{item.name}</h2>
            <button
              onClick={() => {
                navigate(`/products/edit/${item._id}`);
                dispatch(setSelectedProduct(item));
              }}
            >
              Edit
            </button>
            <button onClick={()=>{
              dispatch(deleteProduct(item._id))
            }}>
              Delete Product
            </button>
          </div>
        );
      })}
    </div>
  );
};
