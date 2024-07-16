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
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


interface ILogin {

    Email: string,
    Password: string,
    Username: string

}
const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
    const dispatch = useDispatch();
    const { users, loading, error,token } = useSelector((state: any) => state.user);
    const [showSnack,setShowSnack]= useState(false);
    const vertical='bottom';
    const horizontal='center';
    const navigate=useNavigate();

    useEffect(()=>{
        if(sessionStorage.getItem('jwt')!=null)
        {
                    navigate('/');
        }


    },[token])

    const onHandleSubmit = (data: ILogin) => {
        setShowSnack(false)

        console.log(data);
        data.Username = data.Email;
        dispatch({ type: 'LOGIN_USER', data: data });
      
        return;
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnack(true)
        dispatch({ type: 'REGISTER_USER_DONE' });

    };


    return (

        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onHandleSubmit)}>
                    <TextField
                        margin="normal"
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
                            }
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
                                message: 'Password must be at least 8 characters, include uppercase letters, numbers, and symbols.',
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
                        disabled={loading}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
          

                <Snackbar sx={{textAlign:'center'}}
                    anchorOrigin={{ vertical, horizontal }}
                    open={!!error && !showSnack}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={error}
                />

            

        </Container >


    );
};

export default Login;

