import './App.css';
import { Container, LinearProgress } from '@mui/material';
import Login from './components/Login';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { Home } from './components/protectedRoute/dashboard/Home';
import { HomePath, LoginPath, RegisterPath } from './routes';
import { IRootReducerShape } from './types';

const App = () => {
  const { Loading } = useSelector((state: IRootReducerShape) => state.Common);

  return (
    <Router>
      <Header />
      {Loading && <LinearProgress color="info" />}

      <Container sx={{ marginTop: 4 }} maxWidth={false} disableGutters>
        <Routes>
          <Route path={LoginPath} element={<Login />} />
          <Route path={RegisterPath} element={<Register />} />

          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path={HomePath} element={<Home />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
