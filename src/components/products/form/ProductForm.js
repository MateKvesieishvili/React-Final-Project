import React, { useEffect, useState } from 'react';
import { Button, FormContainer, InputField, Alert } from '../../atoms';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveProductValidationSchema } from './ProductFormValidation';
import { useTranslation } from 'react-i18next';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { saveProduct, setSelectedProduct } from '../../../redux';
import { useNavigate } from 'react-router-dom';
import { useAlert, useProduct } from '../../../hooks';
import { Box, styled } from '@mui/material';

const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  backgroundColor: '#EFF2FF'
}));

const StyledImageContainer = styled(Box)(() => ({
  flex: '1',
  backgroundColor: '#EFF2FF',
  padding: '20px',
  borderRight: '1px solid #E0E0E0',
  textAlign: 'center',
}));

const StyledInfoContainer = styled(Box)(() => ({
  flex: '2',
  padding: '20px',
}));

const StyledInputField = styled(InputField)(()=>({
    backgroundColor: "#EFF2FF",
    marginTop: "20px"
}))
export const ProductForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(saveProductValidationSchema),
    mode: 'onChange',
  });

  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showAlert, alertState, handleClose } = useAlert();
  const { selectedProduct } = useProduct();

  useEffect(() => {
    if (selectedProduct) {
      setImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  const onSave = (data) => {
    dispatch(saveProduct({ product: { ...data, image }, productId: selectedProduct?._id }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        showAlert(error, 'error');
      });
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, []);

  return (
    <StyledContainer>
      <StyledImageContainer>
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => {
            setImage(base64);
          }}
        />
        {image && <img src={image} alt="Product" style={{ width: '100%', marginTop: '20px' }} />}
      </StyledImageContainer>

      <StyledInfoContainer>
        <FormContainer>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
            }}>

          <Controller
            name="name"
            defaultValue={selectedProduct?.name}
            control={control}
            render={({ field }) => {
              const { name, onChange, value } = field;
              return (
                <StyledInputField
                  name={name}
                  onChange={onChange}
                  value={value}
                  helperText={errors?.name?.message}
                  error={!!errors.name}
                  label={t('product_name')}
                />
              );
            }}
          />


          <Controller
            name="brand"
            defaultValue={selectedProduct?.brand}
            control={control}
            render={({ field }) => {
              const { name, onChange, value } = field;
              return (
                <StyledInputField
                  name={name}
                  onChange={onChange}
                  value={value}
                  helperText={errors?.brand?.message}
                  error={!!errors.brand}
                  label={t('product_brand')}
                />
                );
            }}
            />

          <Controller
            name="category"
            defaultValue={selectedProduct?.category}
            control={control}
            render={({ field }) => {
              const { name, onChange, value } = field;
              return (
                <StyledInputField
                  name={name}
                  onChange={onChange}
                  value={value}
                  helperText={errors?.category?.message}
                  error={!!errors.category}
                  label={t('product_category')}
                  />
                  );
                }}
                />
            </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end"
          }}>
            <Controller
                name="price"
                defaultValue={selectedProduct?.price}
                control={control}
                render={({ field }) => {
                const { name, onChange, value } = field;
                return (
                    <StyledInputField
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.price?.message}
                    error={!!errors.price}
                    label={t('product_price')}
                    type="number"
                    />
                );
                }}
            />
          </Box>
            <Box sx={{
                marginTop: "50px"
            }}>
            <Controller
            name="description"
            defaultValue={selectedProduct?.description}
            control={control}
            render={({ field }) => {
                const { name, onChange, value } = field;
                return (
                <StyledInputField sx={{
                    width: "600px",
                    height: "300px"

                }}
                    multiline
                    name={name}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.description?.message}
                    error={!!errors.description}
                    label={t('product_description')}
                />
                );
            }}
            />
            </Box>

          <Alert handleClose={handleClose} {...alertState} variant="filled" />
          <Button onClick={handleSubmit(onSave)}>{t('save_product')}</Button>
        </FormContainer>
      </StyledInfoContainer>
    </StyledContainer>
  );
};
