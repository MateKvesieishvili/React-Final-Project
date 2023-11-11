import React, { useEffect, useState } from 'react'
import { Button, FormContainer, Input } from '../../atoms'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { saveProductValidationSchema } from './ProductFormValidation'
import { useTranslation } from 'react-i18next'
import  FileBase64 from "react-file-base64"
import { useDispatch } from 'react-redux'
import { saveProduct, setSelectedProduct } from '../../../redux'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../../hooks'


export const ProductForm = () => {
    const {control, 
    formState:{errors},
    handleSubmit,
} = useForm({
    resolver: yupResolver(saveProductValidationSchema),
    mode: "onChange"
})

    const [image, setImage] = useState("")
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {selectedProduct} = useProduct()

    useEffect(()=>{
        if(selectedProduct) {
            setImage(selectedProduct.image)
        }
    },[selectedProduct])

    const onSave = (data)=>{
        console.log({...data, image})
        dispatch(saveProduct({product: {...data, image}, productId: selectedProduct?._id}))
        .unwrap()
        .then(()=>{
            navigate("/")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        return ()=>{
            dispatch(setSelectedProduct(null))
        }
    }, [])
  return (
    <FormContainer>
        <Controller name="name" defaultValue={selectedProduct?.name} control={control} render={({field})=>{
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
        <Controller name="description" defaultValue={selectedProduct?.description} control={control} render={({field})=>{
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
        <Controller name="brand" defaultValue={selectedProduct?.brand} control={control} render={({field})=>{
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
        <Controller name="category" defaultValue={selectedProduct?.category}control={control} render={({field})=>{
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
        <Controller name="price" defaultValue={selectedProduct?.price} control={control} render={({field})=>{
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

        <FileBase64 type="file" multiple={false} onDone={({base64})=>{
            setImage(base64)
        }}/>
        <Button onClick={handleSubmit(onSave)}>{t("save_product")}</Button>

    </FormContainer>
  )
}

