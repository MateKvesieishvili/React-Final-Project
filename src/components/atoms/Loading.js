import styled from '@emotion/styled';
import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const StyledLoadingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const Loading = ({ size = 100, color = '#F77F00' }) => {
  return (
    <StyledLoadingContainer>
      <CircularProgress size={size} style={{ color: color }} />
    </StyledLoadingContainer>
  );
};

export const LoadingWrapper = ({ children, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  return children;
};
