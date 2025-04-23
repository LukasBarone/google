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
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';

const Settings = () => {
  // Estados para as configurações
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configurações
      </Typography>
      
      <Grid container spacing={4}>
        {/* Configurações de Conta */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Perfil e Conta
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  defaultValue="João Silva"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  defaultValue="joao.silva@exemplo.com"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Empresa"
                  defaultValue="Agência de Marketing Digital"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  defaultValue="+55 (11) 98765-4321"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Salvar Alterações
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Configurações de Notificações */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Notificações
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Notificações por E-mail" 
                  secondary="Receba alertas e relatórios por e-mail" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Notificações por WhatsApp" 
                  secondary="Receba alertas e relatórios por WhatsApp" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={whatsappNotifications}
                    onChange={() => setWhatsappNotifications(!whatsappNotifications)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Alertas de ROAS baixo" 
                  secondary="Notificação quando o ROAS estiver abaixo da meta" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    defaultChecked
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Alertas de CPA alto" 
                  secondary="Notificação quando o CPA estiver acima da meta" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    defaultChecked
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Relatórios Semanais" 
                  secondary="Receba um resumo semanal de performance" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    defaultChecked
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Configurações de Segurança */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Segurança
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha Atual"
                  type="password"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  type="password"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  type="password"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Alterar Senha
                </Button>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Autenticação em duas etapas"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Configurações de Preferências */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Preferências
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Modo Escuro" 
                  secondary="Alterar para tema escuro" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Atualização Automática" 
                  secondary="Atualizar dados automaticamente a cada 30 minutos" 
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={autoRefresh}
                    onChange={() => setAutoRefresh(!autoRefresh)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Idioma" 
                  secondary="Português (Brasil)" 
                />
                <ListItemSecondaryAction>
                  <Button size="small" variant="outlined">
                    Alterar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Formato de Moeda" 
                  secondary="R$ (Real Brasileiro)" 
                />
                <ListItemSecondaryAction>
                  <Button size="small" variant="outlined">
                    Alterar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Configurações da API do Google Ads */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configurações da API do Google Ads
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ID do Cliente"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ID do Desenvolvedor"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Token de Acesso"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Refresh Token"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ mt: 2, mr: 2 }}
                >
                  Salvar Credenciais
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Testar Conexão
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
