import React from 'react'
import { Button, FormContainer, InputField } from '../atoms'
import { Controller, useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { registerValidationSchema } from './RegisterFormValidation'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../hooks'
import LeftPanel from "../../assets/images/left panel.png"
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next';

export const RegisterForm = () => {
    const {
        handleSubmit,
        control, 
        formState: {errors},
    } = useForm ({
        resolver: yupResolver(registerValidationSchema),
        mode: "onChange"
    })
    
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {showAlert, alertState, handleClose} = useAlert()
    
    const onSubmit = (data) => {
        console.log("Data", data)
        dispatch(authenticateUser({formValues: data}))
          .unwrap()
          .then(() => navigate("/"))
          .catch((error) => {
            showAlert(error, "error");
          });
    };

    return (
        <Box sx={{
            display:"flex",
          alignItems: "center"
        }}>
            <img src={LeftPanel} alt="left-panel"></img>
            <Box sx={{
                margin: "0 auto"
            }}>
                <FormContainer>
                    <Controller
                        control={control}
                        name="firstName"
                        defaultValue=""
                        render={({field}) => {
                            const { name, onChange} = field
                            return <InputField
                                name={name}
                                onChange={onChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                label={t("first_name")}
                            />;
                        }}
                    />
    
                    <Controller
                        control={control}
                        name="lastName"
                        defaultValue=""
                        render={({field}) => {
                            const { name, onChange} = field
                            return <InputField
                                name={name}
                                onChange={onChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                label={t("last_name")}
                            />;
                        }}
                    />
    
                    <Controller
                        control={control}
                        name="email"
                        defaultValue=""
                        render={({field}) => {
                            const { name, onChange} = field
                            return <InputField
                                name={name}
                                onChange={onChange}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                label={t("email")}
                            />;
                        }}
                    />
    
                    <Controller
                        control={control}
                        name="password"
                        defaultValue=""
                        render={({field}) => {
                            const { name, onChange} = field
                            return <InputField
                                name={name}
                                onChange={onChange}
                                type='password'
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                label={t("password")}
                            />;
                        }}
                    />
    
                    <Button onClick={handleSubmit(onSubmit)}>{t("sign_up")}</Button> 
                </FormContainer>
            </Box>
        </Box>
    )
}
