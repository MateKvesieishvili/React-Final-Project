import React from 'react';
import { useProduct } from '../../hooks';
import { List, ListItem } from '@mui/material';
import { Link, Text } from '../atoms';
import styled from '@emotion/styled';

const StyledListItem = styled(ListItem)(() => ({
  padding: '5px 0px 3px 15px',
  margin: '0px',
}));

export const ProductCategories = () => {
  const { productCategories } = useProduct();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <List sx={{ display: 'flex' }}>
      {productCategories.map((category) => {
        const { _id, name } = category;
        const capitalizedCategory = capitalizeFirstLetter(name);

        return (
          <Link key={_id} to={`/products/categories/${name}?page=1&sort=price,asc`}>
            <StyledListItem>
              <Text color="#F77F00">{capitalizedCategory}s</Text>
            </StyledListItem>
          </Link>
        );
      })}
    </List>
  );
};
