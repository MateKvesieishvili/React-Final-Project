import React, { useEffect } from 'react';
import { useProduct } from '../../../hooks';
import {fetchHomePageProducts} from '../../../redux/slices'
import { LoadingWrapper } from '../../atoms';
import { GridContainer } from '../shared/GridContainer';
import { ProductCards } from '../shared';
import { useDispatch } from 'react-redux';

export const HomePageProducts = () => {
  const { homePageProducts, isLoading} = useProduct();

const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHomePageProducts());
  }, [dispatch]);

  return (
    <GridContainer>
      <LoadingWrapper isLoading={isLoading}>
        {homePageProducts.map((product) => (
          <ProductCards key={product._id} product={product} />
        ))}
      </LoadingWrapper>
    </GridContainer>
  );
};
