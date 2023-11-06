import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const Link = ({children, to, ...rest}) => {
  return (
    <RouterLink to={to} style={{ textDecoration: "none", color: "#F77F00"}} {...rest}>
        {children}
    </RouterLink>
  )
}

