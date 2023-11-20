import {MenuItem, Select } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Sort = ({value, changeSort}) => {

  const {t} = useTranslation()

  return (
    <Select value={value ?? "price,asc"} onChange={(e)=>{changeSort("sort", e.target.value)
    }}>
      <MenuItem value="price,asc">{t("from_low_to_high")}</MenuItem>
      <MenuItem value="price,desc">{t("from_high_to_low")}</MenuItem>
      <MenuItem value="name,asc">{t("from_z_to_a")}</MenuItem>
      <MenuItem value="name,desc">{t("from_a_to_z")}</MenuItem>
    </Select>
  )
}
