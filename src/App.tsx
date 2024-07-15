import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import Login from './Login'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import { Home } from './Components/Dashboard/Home';

function App() {
  return (
    
    <Router>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
       
      </Container>
     
    </Router>
 /* <AppBar position="absolute" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Footer Menu
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>
            </> */
  );
}

export default App;
