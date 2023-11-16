import React, { useState } from 'react'
import { Button, FormContainer, InputField } from '../../components/atoms'
import { Controller, useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { registerValidationSchema } from './RegisterFormValidation'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import { useAlert } from '../../hooks'
import {Alert} from "../atoms"
import { Box, styled } from '@mui/material'
import LeftPanel from "../../assets/images/left panel.png"

export const RegisterForm = () => {

const [showPassword, setShowPassword] = useState(false)

const handleClickShowPassword = () => setShowPassword((show) => !show)
  
const handleMouseDownPassword = (event) => {
      event.preventDefault()
}

const StyledContainer = styled(Box)(()=>({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }))
  const StyledFormContainer = styled(Box)(()=>({
    display: "flex",
    margin: "0 auto"
  }))

const {
    handleSubmit,
    control, 
    formState: {errors},
} = useForm ({
    resolver: yupResolver(registerValidationSchema),
    mode: "onChange"
})

const {t} = useTranslation()
const {showAlert, alertState, handleClose} = useAlert()
const dispatch = useDispatch()
const navigate = useNavigate()

const onSubmit = (data)=>{
    dispatch(authenticateUser({formValues: data})).unwrap()
    .then(
        navigate("/")
    ) .catch((error)=>{
        showAlert(error, "error")
    })
}


  return (
    <StyledContainer>

    <img src={LeftPanel} alt="left-panel"></img>

    <StyledFormContainer>

    <FormContainer>
        <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <InputField name={name} onChange={onChange}
                error={!!errors.firstName}
                helperText = {errors.firstName?.message}
                label={t("first_name")}

                />
            }}
        />

         <Controller
        control={control}
            name="lastName"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <InputField name={name} onChange={onChange}
                error={!!errors.lastName}
                helperText = {errors.lastName?.message}
                label={t("last_name")}
                />
            }}
        />
         <Controller
        control={control}
            name="email"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <InputField name={name} onChange={onChange}
                error={!!errors.email}
                helperText = {errors.email?.message}
                label={t("email")}
                />
            }}
        />
         <Controller
        control={control}
            name="password"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <InputField name={name} onChange={onChange}
                error={!!errors.password}
                helperText = {errors.password?.message}
                label={t("password")}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>}
                />
            }}
        
            />
            <Alert handleClose={handleClose} {...alertState} variant="filled"/>
            <Button onClick={handleSubmit(onSubmit)}>{t("register")}</Button> 
    </FormContainer>
    </StyledFormContainer>
 </StyledContainer>
  )
}
