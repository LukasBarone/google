import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  TextField,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para simular o login com Google OAuth
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Simulação de autenticação (será substituída pela autenticação real)
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard Google Ads
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Faça login para acessar sua conta
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{ 
              py: 1.5,
              bgcolor: '#4285F4',
              '&:hover': {
                bgcolor: '#3367D6'
              }
            }}
          >
            {isLoading ? 'Autenticando...' : 'Entrar com Google'}
          </Button>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            Ao fazer login, você concorda com nossos Termos de Serviço e Política de Privacidade.
          </Typography>
        </CardContent>
      </Card>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        © {new Date().getFullYear()} Dashboard Google Ads | Todos os direitos reservados
      </Typography>
    </Box>
  );
};

export default Login;
