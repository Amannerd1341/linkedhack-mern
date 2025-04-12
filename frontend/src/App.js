import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Box,
  Container
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import HackathonsPage from './pages/HackathonsPage';
import ProfilePage from './pages/ProfilePage';
import NetworkPage from './pages/NetworkPage';
import AuthPage from './pages/AuthPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Header />
            <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 3 } }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hackathons" element={<HackathonsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;