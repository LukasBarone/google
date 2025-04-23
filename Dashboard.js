import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';
import { 
  ShoppingBag, 
  AttachMoney, 
  Receipt, 
  TrendingDown, 
  Storefront, 
  Autorenew 
} from '@mui/icons-material';

// Componentes de gráficos serão importados de react-chartjs-2
// import { Line, Bar } from 'react-chartjs-2';

const Dashboard = () => {
  // Estado para filtros de data
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('custom');

  // Dados simulados para contas
  const accounts = [
    { id: 1, name: 'Loja Virtual A' },
    { id: 2, name: 'E-commerce B' },
    { id: 3, name: 'Marketplace C' },
    { id: 4, name: 'Loja D' },
  ];

  // Dados simulados para métricas
  const metrics = {
    orders: 156,
    investment: 4500.75,
    averageTicket: 320.45,
    cpa: 28.85,
    revenue: 49990.20,
    roas: 11.11
  };

  // Períodos predefinidos
  const periods = [
    { value: 'today', label: 'Hoje' },
    { value: 'yesterday', label: 'Ontem' },
    { value: 'last7days', label: 'Últimos 7 dias' },
    { value: 'last30days', label: 'Últimos 30 dias' },
    { value: 'thisMonth', label: 'Este mês' },
    { value: 'lastMonth', label: 'Mês passado' },
    { value: 'custom', label: 'Personalizado' }
  ];

  // Função para lidar com a mudança de período
  const handlePeriodChange = (event) => {
    const value = event.target.value;
    setSelectedPeriod(value);
    
    const today = new Date();
    let start = new Date();
    let end = new Date();
    
    switch(value) {
      case 'today':
        // Mantém a data atual
        break;
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        end = new Date(start);
        break;
      case 'last7days':
        start.setDate(start.getDate() - 7);
        break;
      case 'last30days':
        start.setDate(start.getDate() - 30);
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        // Mantém as datas personalizadas
        return;
    }
    
    setStartDate(start);
    setEndDate(end);
  };

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard de Performance
        </Typography>
        
        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="account-select-label">Conta</InputLabel>
                <Select
                  labelId="account-select-label"
                  id="account-select"
                  value={selectedAccount}
                  label="Conta"
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Todas as contas</em>
                  </MenuItem>
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="period-select-label">Período</InputLabel>
                <Select
                  labelId="period-select-label"
                  id="period-select"
                  value={selectedPeriod}
                  label="Período"
                  onChange={handlePeriodChange}
                >
                  {periods.map((period) => (
                    <MenuItem key={period.value} value={period.value}>
                      {period.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {selectedPeriod === 'custom' && (
              <>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    label="Data inicial"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    label="Data final"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
        
        {/* Cards de métricas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Pedidos (Conversões)
                    </Typography>
                    <Typography variant="h4" component="div">
                      {metrics.orders}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'primary.light',
                    borderRadius: '50%',
                    width: 56,
                    height: 56
                  }}>
                    <ShoppingBag sx={{ color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Valor Investido
                    </Typography>
                    <Typography variant="h4" component="div">
                      {formatCurrency(metrics.investment)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'error.light',
                    borderRadius: '50%',
                    width: 56,
                    height: 56
                  }}>
                    <AttachMoney sx={{ color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Ticket Médio
                    </Typography>
                    <Typography variant="h4" component="div">
                      {formatCurrency(metrics.averageTicket)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'warning.light',
                    borderRadius: '50%',
                    width: 56,
                    height: 56
                  }}>
                    <Receipt sx={{ color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      CPA
                    </Typography>
                    <Typography variant="h4" component="div">
                      {formatCurrency(metrics.cpa)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'info.light',
                    borderRadius: '50%',
                    width: 56,
                    height: 56
                  }}>
                    <TrendingDown sx={{ color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Faturamento
                    </Typography>
                    <Typography variant="h4" component="div">
                      {formatCurrency(metrics.revenue)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'success.light',
                    borderRadius: '50%',
                    width: 56,
                    height: 56
                  }}>
                    <Storefront sx={{ color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      ROAS
                    </Typography>
                    <Typography variant="h4" component="div">
                      {metrics.roas.toFixed(2)}x
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'secondary.light',
                    borderRadius: '50%',
                    width: 56,
                    height: 56
                  }}>
                    <Autorenew sx={{ color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Área para gráficos */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Desempenho ao longo do tempo
          </Typography>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="textSecondary">
              Gráficos de desempenho serão exibidos aqui
            </Typography>
          </Box>
        </Paper>
        
        {/* Botão para gerar relatório */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 4 }}
          >
            Gerar Relatório para WhatsApp
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;
