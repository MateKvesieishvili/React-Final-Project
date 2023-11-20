import React from 'react';
import { Alert, Button, FormContainer, InputField } from '../atoms';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from './LoginFormValidation';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../hooks';
import LeftPanel from "../../assets/images/left panel.png"
import { Box } from '@mui/material';

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onChange'
  });

  const {t} = useTranslation()
  const {showAlert, alertState, handleClose} = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(authenticateUser({ formValues: data, isLogin: true }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        showAlert(error, "error")
      });
  };

  console.log('errors:', errors);

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
      <Controller name="email" control={control} defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <InputField
              name={name}
              onChange={onChange}
              label={t("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          );
        }}
      />
      <Controller name="password" control={control} defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <InputField
              name={name}
              onChange={onChange}
              type="password"
              label={t("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              />
          );
        }}
      />
      <Alert handleClose={handleClose} {...alertState} variant="filled"/>
      <Button onClick={handleSubmit(onSubmit)}>{t("sign_in")}</Button>
    </FormContainer>
    </Box>
  </Box>
  );
};