import React from 'react'
import RoutesComponent from './Routes'
import { LanguageSelect } from './components/atoms'
import { useTranslation } from 'react-i18next'

const App = () => {
  const {t} = useTranslation()
  return (
    <div>
      <h1>{t("home")}</h1>
      <LanguageSelect/>
      <RoutesComponent/>
    </div>
  )
}

export default App