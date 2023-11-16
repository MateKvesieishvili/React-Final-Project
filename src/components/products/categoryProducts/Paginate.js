import { Pagination, Stack } from '@mui/material'
import React from 'react';

export const Paginate = ({ totalPages, currentPage, changePage }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      marginTop={2}
    >
      <Pagination
        count={totalPages}
        page={Number(currentPage)}
        showFirstButton
        showLastButton
        onChange={(_, value) => {
          changePage("page", value);
        }}
        sx={{
          '.Mui-selected': {
            backgroundColor: '#003049',
            color: '#FFFFFF',
          },
          '.MuiPaginationItem-root:hover': {
            backgroundColor: '#F77F00', 
          },
        }}
      />
    </Stack>
  );
};
