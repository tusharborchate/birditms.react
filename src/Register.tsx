// src/components/Login.tsx
import React from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
} from '@mui/material';

const Register: React.FC = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                <Box component="form" noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
