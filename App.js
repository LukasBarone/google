import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';

// Importação de componentes (serão criados em seguida)
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AccountSelection from './pages/AccountSelection';
import ReportGenerator from './pages/ReportGenerator';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Função para simular login (será substituída pela autenticação real com Google OAuth)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Função para alternar a visibilidade da barra lateral
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {isAuthenticated ? (
          <>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar open={sidebarOpen} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: 8,
                ml: sidebarOpen ? '240px' : 0,
                transition: 'margin 0.2s',
                backgroundColor: 'background.default',
                minHeight: 'calc(100vh - 64px)',
                overflow: 'auto'
              }}
            >
              <Container maxWidth="xl">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/accounts" element={<AccountSelection />} />
                  <Route path="/reports" element={<ReportGenerator />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Container>
            </Box>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Box>
    </Router>
  );
}

export default App;
