import styled from '@emotion/styled'
import { FormControl } from '@mui/material'
import React from 'react'


const StyledFormContainer = styled(FormControl)(()=>({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}))


export const FormContainer = ({children}) => {
  return (
    <StyledFormContainer>{children}</StyledFormContainer>
  )
}