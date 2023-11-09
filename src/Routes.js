import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, RegisterPage } from './pages'
import { ProductFormPage } from './pages/ProductFormPage'
import { ProtectedRoute, isUserAdmin } from './helpers'
import { useUser } from './hooks'

const RoutesComponent = () => {
  const {user} = useUser()
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route 
          path="/product/new"
          element={
            <ProtectedRoute hasAccess={isUserAdmin(user)}>
              <ProductFormPage/>
            </ProtectedRoute>
          }
        />
    </Routes>
  )
}

export default RoutesComponent