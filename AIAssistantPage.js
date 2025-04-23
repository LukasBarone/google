import React, { useState, useEffect } from 'react';
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AIAssistantService from '../services/AIAssistantService';
import GoogleAdsService from '../services/GoogleAdsService';

// Inicializa o serviço de IA com o serviço do Google Ads
AIAssistantService.initialize(GoogleAdsService);

const AIAssistantPage = () => {
  // Estado para armazenar a pergunta do usuário
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accountId, setAccountId] = useState('1');
  const [startDate, setStartDate] = useState('11/04');
  const [endDate, setEndDate] = useState('22/04');
  
  // Estados para dados da IA
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [aiResponse, setAiResponse] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  
  // Estados para diálogos e notificações
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Carrega dados iniciais
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Converte datas para formato YYYY-MM-DD para API
        const currentYear = new Date().getFullYear();
        const [startDay, startMonth] = startDate.split('/');
        const [endDay, endMonth] = endDate.split('/');
        
        const formattedStartDate = `${currentYear}-${startMonth}-${startDay}`;
        const formattedEndDate = `${currentYear}-${endMonth}-${endDay}`;
        
        // Carrega insights
        const insightsData = await AIAssistantService.generateInsights(accountId, formattedStartDate, formattedEndDate);
        setInsights(insightsData);
        
        // Carrega recomendações
        const recommendationsData = await AIAssistantService.generateStrategicRecommendations(accountId);
        setRecommendations(recommendationsData);
        
        // Carrega anomalias
        const anomaliesData = await AIAssistantService.detectAnomalies(accountId, formattedStartDate, formattedEndDate);
        setAnomalies(anomaliesData);
        
        setSnackbarMessage('Dados carregados com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setSnackbarMessage('Erro ao carregar dados. Tente novamente.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [accountId, startDate, endDate]);

  // Função para lidar com a submissão da pergunta
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userQuery.trim()) {
      setSnackbarMessage('Por favor, digite uma pergunta.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await AIAssistantService.answerQuestion(userQuery);
      setAiResponse(response);
      setResponseDialogOpen(true);
      setUserQuery('');
    } catch (error) {
      console.error('Erro ao processar pergunta:', error);
      setSnackbarMessage('Erro ao processar sua pergunta. Tente novamente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função para aplicar uma recomendação
  const applyRecommendation = (recommendationId) => {
    // Em um ambiente real, isso enviaria a ação para a API
    setSnackbarMessage('Recomendação aplicada com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };
  
  // Função para fechar a notificação
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  // Função para renderizar o ícone correto para cada insight
  const renderInsightIcon = (type) => {
    switch (type) {
      case 'insight':
        return <LightbulbIcon color="primary" />;
      case 'trend':
        return type.includes('Crescimento') ? 
          <TrendingUpIcon sx={{ color: 'success.main' }} /> : 
          <TrendingDownIcon sx={{ color: 'error.main' }} />;
      case 'alert':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'opportunity':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      default:
        return <LightbulbIcon color="primary" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Assistente IA de Tráfego Pago
      </Typography>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      <Grid container spacing={4}>
        {/* Seção de perguntas ao assistente */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SmartToyIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Pergunte ao Especialista em Google Ads
              </Typography>
            </Box>
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Faça uma pergunta sobre suas campanhas, estratégias ou otimizações..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : 'Enviar Pergunta'}
              </Button>
            </form>
          </Paper>
        </Grid>
        
        {/* Seção de insights e sugestões */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Insights e Sugestões
            </Typography>
            
            {insights.length > 0 ? (
              <List>
                {insights.map((insight, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        {renderInsightIcon(insight.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                              {insight.title}
                            </Typography>
                            <Chip 
                              label={insight.type} 
                              size="small" 
                              color={
                                insight.type === 'alert' ? 'warning' : 
                                insight.type === 'trend' ? 'info' : 
                                insight.type === 'insight' ? 'primary' : 'success'
                              }
                              sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={insight.description}
                      />
                    </ListItem>
                    {index < insights.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  Nenhum insight disponível no momento.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Seção de recomendações estratégicas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recomendações Estratégicas
            </Typography>
            
            {recommendations.length > 0 ? (
              <Grid container spacing={2}>
                {recommendations.map((strategy, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {strategy.title}
                          </Typography>
                          <Chip 
                            label={`Impacto: ${strategy.impact}`} 
                            size="small" 
                            color={strategy.impact === 'Alto' ? 'success' : 'primary'}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {strategy.description}
                        </Typography>
                        <Button 
                          size="small" 
                          sx={{ mt: 1 }}
                          onClick={() => applyRecommendation(index)}
                        >
                          Aplicar Recomendação
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  Nenhuma recomendação disponível no momento.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Seção de alertas de anomalias */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Alertas de Performance
            </Typography>
            
            {anomalies.length > 0 ? (
              <List>
                {anomalies.map((anomaly, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <WarningIcon sx={{ 
                          color: anomaly.severity === 'high' ? 'error.main' : 
                                 anomaly.severity === 'medium' ? 'warning.main' : 'info.main' 
                        }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                              {anomaly.title}
                            </Typography>
                            <Chip 
                              label={
                                anomaly.severity === 'high' ? 'Alta Prioridade' : 
                                anomaly.severity === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'
                              } 
                              size="small" 
                              color={
                                anomaly.severity === 'high' ? 'error' : 
                                anomaly.severity === 'medium' ? 'warning' : 'info'
                              }
                              sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={anomaly.description}
                      />
                    </ListItem>
                    {index < anomalies.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  Nenhum alerta de performance no momento. Suas campanhas estão funcionando bem!
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Diálogo de resposta da IA */}
      <Dialog
        open={responseDialogOpen}
        onClose={() => setResponseDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SmartToyIcon sx={{ mr: 1, color: 'primary.main' }} />
            Resposta do Assistente IA
          </Box>
        </DialogTitle>
        <DialogContent>
          {aiResponse && (
            <>
              <DialogContentText sx={{ fontWeight: 'bold', mb: 2 }}>
                Pergunta: {aiResponse.question}
              </DialogContentText>
              <DialogContentText sx={{ mb: 3, whiteSpace: 'pre-line' }}>
                {aiResponse.answer}
              </DialogContentText>
              {aiResponse.references && aiResponse.references.length > 0 && (
                <>
                  <DialogContentText sx={{ fontWeight: 'bold', mt: 2 }}>
                    Referências:
                  </DialogContentText>
                  <List dense>
                    {aiResponse.references.map((ref, index) => (
                      <ListItem key={index}>
                        <ListItemText>
                          <a href={ref} target="_blank" rel="noopener noreferrer">
                            {ref}
                          </a>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialogOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notificação */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AIAssistantPage;
