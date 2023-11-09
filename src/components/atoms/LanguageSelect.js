import { FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languageCodes } from '../../helpers'


export const LanguageSelect = () => {
    
    const [langCode, setLangCode] = useState(()=>{
       return localStorage.getItem("langCode") || "en"
    }) 

    const {i18n} = useTranslation()

    useEffect(()=>{
        i18n.changeLanguage(langCode)
        localStorage.setItem("langCode", langCode)
    }, [langCode, i18n])

    return (
        <FormControl sx={{minWidth: 120, m: 1, backgroundColor: "#EFF2FF"}}>
            <Select 
                sx={{color: "#F77F00",}} 
                value={langCode}
                onChange={(e)=>{
                    setLangCode(e.target.value)
                }}
                defaultValue={langCode}
            >
                {Object.entries(languageCodes).map((item)=>{
                    const [languageKey, languageValue] = item
                    return <MenuItem key={languageKey} value={languageKey}>{languageValue}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
