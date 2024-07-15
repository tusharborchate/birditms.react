// src/components/Sidebar.tsx
import React from 'react';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Typography,
    Box,
    Button,
    Container,
    Paper,
    TextField,
} from '@mui/material';
import App from './App';

interface sidebarprops {
    open: boolean;
    onClose: () => void;
}
const CreateTaskSidebar: React.FC<sidebarprops> = ({ open, onClose }) => {
    return (
      <Drawer anchor='right' open={open} onClose={onClose}>
        <AppBar position='static' color='transparent'>
        <Toolbar>
                    <Typography variant="h6">Create Task</Typography>  
                                  <Button onClick={onClose}>Close</Button>

                </Toolbar>
        </AppBar>
       
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
            
      </Drawer>

    );


};


export default CreateTaskSidebar;