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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';

const AccountSelection = () => {
  // Estado para armazenar as contas selecionadas
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  
  // Dados simulados de contas MCC
  const accounts = [
    { id: 1, name: 'Loja Virtual A', client: 'Cliente A', budget: 5000, status: 'active' },
    { id: 2, name: 'E-commerce B', client: 'Cliente B', budget: 7500, status: 'active' },
    { id: 3, name: 'Marketplace C', client: 'Cliente C', budget: 3000, status: 'paused' },
    { id: 4, name: 'Loja D', client: 'Cliente D', budget: 10000, status: 'active' },
    { id: 5, name: 'Serviços E', client: 'Cliente E', budget: 2500, status: 'active' },
    { id: 6, name: 'Plataforma F', client: 'Cliente F', budget: 6000, status: 'paused' },
  ];

  // Função para alternar a seleção de uma conta
  const toggleAccountSelection = (accountId) => {
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter(id => id !== accountId));
    } else {
      setSelectedAccounts([...selectedAccounts, accountId]);
    }
  };

  // Função para selecionar todas as contas
  const selectAllAccounts = () => {
    setSelectedAccounts(accounts.map(account => account.id));
  };

  // Função para limpar a seleção
  const clearSelection = () => {
    setSelectedAccounts([]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Seleção de Contas
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Contas Gerenciadas
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small" 
              onClick={selectAllAccounts}
              sx={{ mr: 1 }}
            >
              Selecionar Todas
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="small" 
              onClick={clearSelection}
            >
              Limpar Seleção
            </Button>
          </Box>
        </Box>
        
        <TextField
          fullWidth
          label="Buscar contas"
          variant="outlined"
          margin="normal"
          sx={{ mb: 3 }}
        />
        
        <Grid container spacing={2}>
          {accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card 
                variant="outlined" 
                sx={{ 
                  cursor: 'pointer',
                  border: selectedAccounts.includes(account.id) ? '2px solid' : '1px solid',
                  borderColor: selectedAccounts.includes(account.id) ? 'primary.main' : 'divider',
                  bgcolor: selectedAccounts.includes(account.id) ? 'rgba(66, 133, 244, 0.08)' : 'background.paper',
                }}
                onClick={() => toggleAccountSelection(account.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: account.status === 'active' ? 'success.main' : 'warning.main',
                        width: 40,
                        height: 40,
                        mr: 2
                      }}
                    >
                      <BusinessIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {account.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {account.client}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">
                      Orçamento: R$ {account.budget.toLocaleString('pt-BR')}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: account.status === 'active' ? 'success.main' : 'warning.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {account.status === 'active' ? 'Ativo' : 'Pausado'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            disabled={selectedAccounts.length === 0}
          >
            Visualizar Relatórios ({selectedAccounts.length})
          </Button>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Períodos Salvos
        </Typography>
        
        <List>
          <ListItem button>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>S</Avatar>
            </ListItemIcon>
            <ListItemText 
              primary="Semana Atual" 
              secondary="Segunda a Domingo da semana corrente" 
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          
          <ListItem button>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>A</Avatar>
            </ListItemIcon>
            <ListItemText 
              primary="Semana Anterior" 
              secondary="Segunda a Domingo da semana passada" 
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          
          <ListItem button>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>M</Avatar>
            </ListItemIcon>
            <ListItemText 
              primary="Mês Atual" 
              secondary="Primeiro dia ao último dia do mês corrente" 
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          
          <ListItem button>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>P</Avatar>
            </ListItemIcon>
            <ListItemText 
              primary="Mês Passado" 
              secondary="Primeiro dia ao último dia do mês anterior" 
            />
          </ListItem>
        </List>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="outlined" 
            color="primary"
          >
            Adicionar Novo Período
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountSelection;
