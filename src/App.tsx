import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Button, Container, LinearProgress, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Login from './Login'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import { Home } from './Components/Dashboard/Home';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { useSelector } from 'react-redux';



const App = () => {
  const { users, loading, error, token } = useSelector((state: any) => state.user);

  return (

    <Router>
      <Header />
      {loading && <LinearProgress color="info"/>}
      <Container sx={{ marginTop: 4 }}  maxWidth={false} disableGutters>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* {sessionStorage.getItem('jwt') && (  )} */}
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
