// src/components/Login.tsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  SnackbarContent,
  Snackbar,
} from '@mui/material';
import { Form, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HomePath } from '../routes';
import { LOGIN_USER_STARTED } from '../actions';
import { ICommonState, IRootReducerShape, IUserState } from '../types';
import { isatty } from 'tty';

interface ILogin {
  Email: string;
  Password: string;
  Username: string;
}
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const dispatch = useDispatch();
  const state = useSelector((state: IRootReducerShape) => state);
  console.log(state);
  const Loading = state.Common.Loading;
  const [showSnack, setShowSnack] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      navigate(HomePath);
    }
  }, [state]);

  const onHandleSubmit = (data: ILogin) => {
    setShowSnack(false);

    console.log(data);
    data.Username = data.Email;
    dispatch({ type: LOGIN_USER_STARTED, data: data });

    return;
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnack(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email Address"
            autoComplete="Email"
            autoFocus
            {...register('Email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid Email address',
              },
            })}
            error={!!errors.Email}
            helperText={errors.Email ? errors.Email.message : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="Password"
            autoComplete="current-Password"
            {...register('Password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  'Password must be at least 8 characters, include uppercase letters, numbers, and symbols.',
              },
            })}
            error={!!errors.Password}
            helperText={errors.Password ? errors.Password.message : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={Loading}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
