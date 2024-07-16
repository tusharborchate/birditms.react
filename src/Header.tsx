// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, CircularProgress, Box, LinearProgress } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { users, loading, error, token } = useSelector((state: any) => state.user);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open)
    }
    const logOut = () => {

        sessionStorage.removeItem('jwt');
        navigate('/login')
    }
    const isLoggedIn = !!sessionStorage.getItem('jwt') ? true : false;
    return (
        <AppBar position="static" >
            <Toolbar>

                <Button color="inherit" onClick={toggleSidebar}
                >Toggle</Button>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    BirdiTMS
                </Typography>

                <Sidebar open={open} onClose={toggleSidebar} />
                {location.pathname == '/register' &&
                    <Button color="inherit" component={Link} to="/login" >
                        Login
                    </Button>
                }
                {!isLoggedIn && location.pathname != '/register' &&
                    <Button color="inherit" component={Link} to="/register">
                        Sign Up
                    </Button>
                }


                {isLoggedIn &&
                    <Button color="inherit" onClick={logOut}>
                        Log Out
                    </Button>
                }
                
            
            </Toolbar>
        </AppBar>
    );
};

export default Header;
