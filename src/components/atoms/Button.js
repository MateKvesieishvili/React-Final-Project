import React from 'react'
import { Button as MUIButton } from '@mui/material'

export const Button = ({children, onClick, ...rest}) => {
  return (
    <MUIButton onClick={onClick} {...rest} sx={{color: "#F77F00"}}>
        {children}
    </MUIButton>
  )
}

