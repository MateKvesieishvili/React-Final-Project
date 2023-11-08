import React from 'react';
import { Button, FormContainer, Input } from '../atoms';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from './LoginFormValidation';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onChange'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(authenticateUser({ formValues: data, isLogin: true }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log('errors:', errors);

  return (
    <FormContainer>
      <Controller name="email" control={control} defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label="Email"
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
            <Input
              name={name}
              onChange={onChange}
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          );
        }}
      />

      <Button onClick={handleSubmit(onSubmit)}>Log In</Button>
    </FormContainer>
  );
};
