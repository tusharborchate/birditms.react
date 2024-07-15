// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
const history=useNavigate();
const navigate=()=>{
    history('/login');
}
const[open,setOpen]=useState(false);
const toggleSidebar = ()=>{
    setOpen(!open)
}
    return (
        <AppBar position="static">
            <Toolbar>
            <Button  color="inherit" onClick={toggleSidebar}
                >Toggle</Button>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    BirdiTMS
                </Typography>
              
                <Sidebar open={open} onClose={toggleSidebar} />

                <Button color="inherit" component={Link} to="/login" >
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Sign Up
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
