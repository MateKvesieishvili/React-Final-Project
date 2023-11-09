import React from 'react'
import RoutesComponent from './Routes'
import { LanguageSelect } from './components/atoms'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { isUserAdmin } from './helpers'



const App = () => {
  const {t} = useTranslation()
  const user = useSelector((state)=>state.user.userData)
  console.log(isUserAdmin(user))
  return (
    <div>
      <LanguageSelect/>
      <RoutesComponent/>
    </div>
  )
}

export default App