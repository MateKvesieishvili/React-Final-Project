import React, { useEffect } from 'react'
import RoutesComponent from './Routes'
import { LanguageSelect } from './components/atoms'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { fetchHomePageProducts } from './redux'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import byteMarketSVG from "./assets/icons/BYTEMARKET LOGO 2 1.svg"



const App = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
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
        <Grid item sx={{
          width: '100%',
          padding: '34px 76px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#EFF2FF',
        }}>
          <Link to="/">
            <img src={byteMarketSVG} alt='logo' sx={{
              width: "195px",
              height: "64px",
            }}></img>
          </Link>
          <LanguageSelect/>
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