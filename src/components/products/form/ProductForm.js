import React from 'react'
import { FormContainer, Input } from '../../atoms'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { saveProductValidationSchema } from './ProductFormValidation'
import { useTranslation } from 'react-i18next'


export const ProductForm = () => {
    const {control, formState:{errors}
} = useForm({
    resolver: yupResolver(saveProductValidationSchema),
    mode: "onChange"
})
    const {t} = useTranslation()
  return (
    <FormContainer>
        <Controller name="name" defaultValue="" control={control} render={({field})=>{
            const{name, onChange, value} = field
            return (
                <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.name?.message}
                    error={!!errors.name}
                    label={t("product_name")}
                    />
            )
        }}/>
        <Controller name="description" defaultValue="" control={control} render={({field})=>{
            const{name, onChange, value} = field
            return (
                <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.description?.message}
                    error={!!errors.description}
                    label={t("product_description")}
                    />
            )
        }}/>
        <Controller name="brand" defaultValue="" control={control} render={({field})=>{
            const{name, onChange, value} = field
            return (
                <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.brand?.message}
                    error={!!errors.brand}
                    label={t("product_brand")}
                    />
            )
        }}/>
        <Controller name="category" defaultValue="" control={control} render={({field})=>{
            const{name, onChange, value} = field
            return (
                <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.category?.message}
                    error={!!errors.category}
                    label={t("product_category")}
                    />
            )
        }}/>
        <Controller name="price" defaultValue="" control={control} render={({field})=>{
            const{name, onChange, value} = field
            return (
                <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.price?.message}
                    error={!!errors.price}
                    label={t("product_price")}
                    type="number"
                    />
            )
        }}/>
    </FormContainer>
  )
}

