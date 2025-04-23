import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import GoogleAdsService from '../services/GoogleAdsService';

const ComparativeAnalysis = () => {
  // Estados para controle da interface
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [accountId, setAccountId] = useState('1');
  const [metric, setMetric] = useState('roas');
  const [period, setPeriod] = useState('week');
  const [compareWith, setCompareWith] = useState('previous');
  
  // Estados para dados
  const [accounts, setAccounts] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [comparisonSummary, setComparisonSummary] = useState({});
  
  // Estado para notificações
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Métricas disponíveis para análise
  const metrics = [
    { value: 'roas', label: 'ROAS', format: 'decimal', color: '#4285F4' },
    { value: 'cpa', label: 'CPA', format: 'currency', color: '#EA4335' },
    { value: 'orders', label: 'Pedidos', format: 'number', color: '#34A853' },
    { value: 'investment', label: 'Investimento', format: 'currency', color: '#FBBC05' },
    { value: 'revenue', label: 'Faturamento', format: 'currency', color: '#5F6368' },
    { value: 'ctr', label: 'CTR', format: 'percentage', color: '#46BDC6' }
  ];
  
  // Períodos disponíveis para análise
  const periods = [
    { value: 'week', label: 'Semanal' },
    { value: 'month', label: 'Mensal' },
    { value: 'quarter', label: 'Trimestral' },
    { value: 'year', label: 'Anual' }
  ];
  
  // Opções de comparação
  const compareOptions = [
    { value: 'previous', label: 'Período Anterior' },
    { value: 'year', label: 'Mesmo Período Ano Anterior' }
  ];
  
  // Carrega contas ao iniciar
  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accountsData = await GoogleAdsService.getAccounts();
        setAccounts(accountsData);
      } catch (error) {
        console.error('Erro ao carregar contas:', error);
        showSnackbar('Erro ao carregar contas. Tente novamente.', 'error');
      }
    };
    
    loadAccounts();
  }, []);
  
  // Carrega dados quando os filtros mudam
  useEffect(() => {
    const loadData = async () => {
      if (!accountId) return;
      
      setLoading(true);
      try {
        // Determina as datas com base no período selecionado
        const today = new Date();
        let startDate, endDate, prevStartDate, prevEndDate;
        
        switch (period) {
          case 'week':
            // Última semana
            endDate = new Date();
            startDate = new Date();
            startDate.setDate(today.getDate() - 7);
            
            // Semana anterior
            prevEndDate = new Date(startDate);
            prevEndDate.setDate(prevEndDate.getDate() - 1);
            prevStartDate = new Date(prevEndDate);
            prevStartDate.setDate(prevStartDate.getDate() - 7);
            break;
            
          case 'month':
            // Último mês
            endDate = new Date();
            startDate = new Date();
            startDate.setMonth(today.getMonth() - 1);
            
            // Mês anterior
            prevEndDate = new Date(startDate);
            prevEndDate.setDate(prevEndDate.getDate() - 1);
            prevStartDate = new Date(prevEndDate);
            prevStartDate.setMonth(prevStartDate.getMonth() - 1);
            break;
            
          case 'quarter':
            // Último trimestre
            endDate = new Date();
            startDate = new Date();
            startDate.setMonth(today.getMonth() - 3);
            
            // Trimestre anterior
            prevEndDate = new Date(startDate);
            prevEndDate.setDate(prevEndDate.getDate() - 1);
            prevStartDate = new Date(prevEndDate);
            prevStartDate.setMonth(prevStartDate.getMonth() - 3);
            break;
            
          case 'year':
            // Último ano
            endDate = new Date();
            startDate = new Date();
            startDate.setFullYear(today.getFullYear() - 1);
            
            // Ano anterior
            prevEndDate = new Date(startDate);
            prevEndDate.setDate(prevEndDate.getDate() - 1);
            prevStartDate = new Date(prevEndDate);
            prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
            break;
            
          default:
            // Padrão: última semana
            endDate = new Date();
            startDate = new Date();
            startDate.setDate(today.getDate() - 7);
            
            prevEndDate = new Date(startDate);
            prevEndDate.setDate(prevEndDate.getDate() - 1);
            prevStartDate = new Date(prevEndDate);
            prevStartDate.setDate(prevStartDate.getDate() - 7);
        }
        
        // Formata as datas para YYYY-MM-DD
        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };
        
        // Obtém dados do período atual
        const currentTrendData = await GoogleAdsService.getTrendData(
          accountId,
          formatDate(startDate),
          formatDate(endDate),
          metric
        );
        setCurrentData(currentTrendData);
        
        // Obtém dados do período anterior para comparação
        const previousTrendData = await GoogleAdsService.getTrendData(
          accountId,
          formatDate(prevStartDate),
          formatDate(prevEndDate),
          metric
        );
        setPreviousData(previousTrendData);
        
        // Calcula o resumo da comparação
        calculateComparisonSummary(currentTrendData, previousTrendData, metric);
        
        showSnackbar('Dados carregados com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showSnackbar('Erro ao carregar dados. Tente novamente.', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [accountId, metric, period, compareWith]);
  
  // Calcula o resumo da comparação entre períodos
  const calculateComparisonSummary = (currentData, previousData, metric) => {
    if (!currentData.length || !previousData.length) {
      setComparisonSummary({});
      return;
    }
    
    // Calcula médias
    const currentAvg = currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length;
    const previousAvg = previousData.reduce((sum, item) => sum + item.value, 0) / previousData.length;
    
    // Calcula valores máximos
    const currentMax = Math.max(...currentData.map(item => item.value));
    const previousMax = Math.max(...previousData.map(item => item.value));
    
    // Calcula valores mínimos
    const currentMin = Math.min(...currentData.map(item => item.value));
    const previousMin = Math.min(...previousData.map(item => item.value));
    
    // Calcula variação percentual
    const percentChange = ((currentAvg - previousAvg) / previousAvg) * 100;
    
    // Determina se a variação é positiva ou negativa (dependendo da métrica)
    let isPositive;
    switch (metric) {
      case 'cpa': // Menor é melhor
        isPositive = percentChange < 0;
        break;
      default: // Maior é melhor para as outras métricas
        isPositive = percentChange > 0;
    }
    
    setComparisonSummary({
      currentAvg,
      previousAvg,
      currentMax,
      previousMax,
      currentMin,
      previousMin,
      percentChange,
      isPositive
    });
  };
  
  // Função para mostrar notificações
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  // Função para fechar notificações
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  // Função para mudar a aba
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Função para formatar valores com base no tipo de métrica
  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);
      case 'percentage':
        return `${(value * 100).toFixed(2)}%`;
      case 'decimal':
        return value.toFixed(2);
      default:
        return value.toString();
    }
  };
  
  // Encontra o formato da métrica atual
  const getCurrentMetricFormat = () => {
    const metricObj = metrics.find(m => m.value === metric);
    return metricObj ? metricObj.format : 'number';
  };
  
  // Encontra a cor da métrica atual
  const getCurrentMetricColor = () => {
    const metricObj = metrics.find(m => m.value === metric);
    return metricObj ? metricObj.color : '#4285F4';
  };
  
  // Encontra o label da métrica atual
  const getCurrentMetricLabel = () => {
    const metricObj = metrics.find(m => m.value === metric);
    return metricObj ? metricObj.label : '';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Análises Comparativas
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
                value={accountId}
                label="Conta"
                onChange={(e) => setAccountId(e.target.value)}
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id.toString()}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="metric-select-label">Métrica</InputLabel>
              <Select
                labelId="metric-select-label"
                id="metric-select"
                value={metric}
                label="Métrica"
                onChange={(e) => setMetric(e.target.value)}
              >
                {metrics.map((m) => (
                  <MenuItem key={m.value} value={m.value}>
                    {m.label}
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
                value={period}
                label="Período"
                onChange={(e) => setPeriod(e.target.value)}
              >
                {periods.map((p) => (
                  <MenuItem key={p.value} value={p.value}>
                    {p.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="compare-select-label">Comparar com</InputLabel>
              <Select
                labelId="compare-select-label"
                id="compare-select"
                value={compareWith}
                label="Comparar com"
                onChange={(e) => setCompareWith(e.target.value)}
              >
                {compareOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Resumo da comparação */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumo da Comparação - {getCurrentMetricLabel()}
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : Object.keys(comparisonSummary).length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Variação
                  </Typography>
                  <Typography 
                    variant="h4" 
                    component="div"
                    sx={{ 
                      color: comparisonSummary.isPositive ? 'success.main' : 'error.main',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {comparisonSummary.percentChange >= 0 ? '+' : ''}
                    {comparisonSummary.percentChange.toFixed(2)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    em relação ao período anterior
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Média Atual
                  </Typography>
                  <Typography variant="h4" component="div">
                    {formatValue(comparisonSummary.currentAvg, getCurrentMetricFormat())}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Período anterior: {formatValue(comparisonSummary.previousAvg, getCurrentMetricFormat())}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Valor Máximo
                  </Typography>
                  <Typography variant="h4" component="div">
                    {formatValue(comparisonSummary.currentMax, getCurrentMetricFormat())}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Período anterior: {formatValue(comparisonSummary.previousMax, getCurrentMetricFormat())}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              Selecione uma conta e uma métrica para visualizar a comparação.
            </Typography>
          </Box>
        )}
      </Paper>
      
      {/* Visualizações */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabV
(Content truncated due to size limit. Use line ranges to read in chunks)