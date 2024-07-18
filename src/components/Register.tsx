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
import { CREATE_USER_STARTED } from '../actions';

interface IRegister {
  Email: string;
  Password: string;
  Username: string;
  ConfirmPassword: string;
}
const Register: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: any) => state.user);
  const [showSnack, setShowSnack] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';
  const navigate = useNavigate();

  const onHandleSubmit = (data: IRegister) => {
    setShowSnack(false);

    console.log(data);
    data.Username = data.Email;
    dispatch({ type: CREATE_USER_STARTED, data: data });

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
          Register
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register('ConfirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) =>
                value == watch('Password') || 'Passwords do not match',
            })}
            error={!!errors.ConfirmPassword}
            helperText={
              errors.ConfirmPassword ? errors.ConfirmPassword.message : ''
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
