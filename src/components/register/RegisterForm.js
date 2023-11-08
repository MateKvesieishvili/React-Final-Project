import React from 'react'
import { Button, FormContainer, Input } from '../../components/atoms'
import { Controller, useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { registerValidationSchema } from './RegisterFormValidation'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices'
import { useNavigate } from 'react-router-dom'


export const RegisterForm = () => {

const {
    handleSubmit,
    control, 
    formState: {errors},
} = useForm ({
    resolver: yupResolver(registerValidationSchema),
    mode: "onChange"
})

const dispatch = useDispatch()
const navigate = useNavigate()

const onSubmit = (data)=>{
    console.log("Data", data)
    dispatch(authenticateUser({formValues: data})).unwrap()
    .then(
        navigate("/")
    ) .catch((err)=>{
        console.log("Catch Block:", err)
    })
}


  return (
    <FormContainer>
        <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <Input name={name} onChange={onChange}
                error={!!errors.firstName}
                helperText = {errors.firstName?.message}
                label="First Name"

                />
            }}
        />

         <Controller
        control={control}
            name="lastName"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <Input name={name} onChange={onChange}
                error={!!errors.lastName}
                helperText = {errors.lastName?.message}
                label="Last Name"
                />
            }}
        />
         <Controller
        control={control}
            name="email"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <Input name={name} onChange={onChange}
                error={!!errors.email}
                helperText = {errors.email?.message}
                label="E-Mail"
                />
            }}
        />
         <Controller
        control={control}
            name="password"
            defaultValue=""
            render={({field}) => {
                const { name, onChange} = field
                return <Input name={name} onChange={onChange}type='password'
                error={!!errors.password}
                helperText = {errors.password?.message}
                label="Password"
                />
            }}
        
        />
            <Button onClick={handleSubmit(onSubmit)}>Register</Button> 
    </FormContainer>
  )
}
