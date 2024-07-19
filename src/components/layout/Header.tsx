// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Box,
  LinearProgress,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import Sidebar from '../common/Sidebar';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const settings = ['Logout'];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   if (user == null) {
  //     //get user
  //   }
  // }, [user]);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  const logOut = () => {
    sessionStorage.removeItem('jwt');
    window.location.href = '/';
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElUser(null);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    logOut();
  };

  const isLoggedIn = sessionStorage.getItem('jwt') ? true : false;
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <Button color="inherit" onClick={toggleSidebar}
                >Toggle</Button> */}
        <AcUnitOutlinedIcon></AcUnitOutlinedIcon>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BirdiTMS
        </Typography>

        <Sidebar open={open} onClose={toggleSidebar} />
        {location.pathname == '/register' && (
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
        )}
        {!isLoggedIn && location.pathname != '/register' && (
          <Button color="inherit" component={Link} to="/register">
            Sign Up
          </Button>
        )}

        {isLoggedIn && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleOutlinedIcon fontSize="large"></AccountCircleOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseNavMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
