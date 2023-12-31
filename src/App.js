import React, { useEffect } from 'react'
import RoutesComponent from './Routes'
import { LanguageSelect } from './components/atoms'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { fetchCart, fetchHomePageProducts } from './redux'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { Header } from './components/header'
import { useUser } from './hooks'



const App = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {user} = useUser()

 useEffect(()=>{
  if (user?._id){
    dispatch(fetchCart(user._id))
  }
 }, [dispatch, user])

  useEffect(()=>{
    dispatch(fetchHomePageProducts())
  }, [dispatch])

  return (
    <div>
      <Grid sx={{
        maxWidth: '1920px',
        width: '100%',
        marginInline: 'auto',
        backgroundColor: '#FDFCFF',
        overflowX: 'hidden',
      }}>
        <Grid item>
          <Header/>
        </Grid>
        <Grid sx={{
          paddingTop: 5,
          minHeight: "100vh",
          width: "100%",
          pb: 10,
        }}>
          
          <RoutesComponent/>
        </Grid>
        
      </Grid>
    </div>
  )
}

export default App