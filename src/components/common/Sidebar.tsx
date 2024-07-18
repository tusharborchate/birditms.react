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
} from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6">Menu</Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <List>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={onClose}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
