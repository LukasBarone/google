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
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import WhatsAppReportService from '../services/WhatsAppReportService';
import GoogleAdsService from '../services/GoogleAdsService';

// Inicializa o serviço de relatórios com o serviço do Google Ads
WhatsAppReportService.initialize(GoogleAdsService);

const WhatsAppReportGenerator = () => {
  // Estados para os dados do relatório
  const [accountId, setAccountId] = useState('1');
  const [accountName, setAccountName] = useState('Loja Virtual A');
  const [startDate, setStartDate] = useState('11/04');
  const [endDate, setEndDate] = useState('22/04');
  const [orders, setOrders] = useState(156);
  const [investment, setInvestment] = useState(4500.75);
  const [averageTicket, setAverageTicket] = useState(320.45);
  const [cpa, setCpa] = useState(28.85);
  const [revenue, setRevenue] = useState(49990.20);
  const [roas, setRoas] = useState(11.11);
  const [customNote, setCustomNote] = useState('');
  
  // Estados para contas e templates
  const [accounts, setAccounts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  
  // Estados para diálogos e notificações
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [saveTemplateDialogOpen, setSaveTemplateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  
  // Carrega contas e templates ao iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carrega contas
        const accountsData = await GoogleAdsService.getAccounts();
        setAccounts(accountsData);
        
        // Carrega templates
        const templatesData = await WhatsAppReportService.getReportTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        setSnackbarMessage('Erro ao carregar dados. Tente novamente.');
        setSnackbarOpen(true);
      }
    };
    
    loadData();
  }, []);
  
  // Carrega dados do relatório quando a conta é alterada
  useEffect(() => {
    const loadReportData = async () => {
      if (accountId) {
        try {
          const reportData = await WhatsAppReportService.getReportData(accountId, startDate, endDate);
          
          setAccountName(reportData.accountName);
          setOrders(reportData.orders);
          setInvestment(reportData.investment);
          setAverageTicket(reportData.averageTicket);
          setCpa(reportData.cpa);
          setRevenue(reportData.revenue);
          setRoas(reportData.roas);
        } catch (error) {
          console.error('Erro ao carregar dados do relatório:', error);
          setSnackbarMessage('Erro ao carregar dados do relatório. Tente novamente.');
          setSnackbarOpen(true);
        }
      }
    };
    
    loadReportData();
  }, [accountId, startDate, endDate]);

  // Gera o texto do relatório para WhatsApp
  const generateReportText = () => {
    const reportData = {
      accountName,
      startDate,
      endDate,
      orders,
      investment,
      averageTicket,
      cpa,
      revenue,
      roas,
      customNote
    };
    
    return WhatsAppReportService.generateReportText(reportData);
  };

  // Função para copiar o relatório para a área de transferência
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateReportText())
      .then(() => {
        setSnackbarMessage('Relatório copiado para a área de transferência!');
        setSnackbarOpen(true);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
        setSnackbarMessage('Erro ao copiar texto. Tente novamente.');
        setSnackbarOpen(true);
      });
  };

  // Função para abrir o WhatsApp Web com o relatório
  const openWhatsApp = () => {
    const url = WhatsAppReportService.generateWhatsAppUrl(generateReportText());
    window.open(url, '_blank');
  };
  
  // Função para abrir o diálogo de salvar template
  const openSaveTemplateDialog = () => {
    setNewTemplateName('');
    setSaveTemplateDialogOpen(true);
  };
  
  // Função para salvar um novo template
  const saveTemplate = async () => {
    if (!newTemplateName.trim()) {
      setSnackbarMessage('Por favor, insira um nome para o template.');
      setSnackbarOpen(true);
      return;
    }
    
    try {
      const template = {
        name: newTemplateName,
        template: generateReportText()
      };
      
      const savedTemplate = await WhatsAppReportService.saveReportTemplate(template);
      setTemplates([...templates, savedTemplate]);
      setSaveTemplateDialogOpen(false);
      
      setSnackbarMessage('Template salvo com sucesso!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao salvar template:', error);
      setSnackbarMessage('Erro ao salvar template. Tente novamente.');
      setSnackbarOpen(true);
    }
  };
  
  // Função para carregar um template
  const loadTemplate = (templateId) => {
    if (templateId === 'default') {
      return;
    }
    
    const template = templates.find(t => t.id === parseInt(templateId));
    if (template) {
      // Aqui você poderia implementar a lógica para extrair os valores do template
      // e preencher os campos do formulário
      setSnackbarMessage('Template carregado com sucesso!');
      setSnackbarOpen(true);
    }
  };

  // Função para fechar a notificação
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerador de Relatórios para WhatsApp
      </Typography>
      
      <Grid container spacing={4}>
        {/* Formulário de configuração do relatório */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Configurações do Relatório
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
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
              
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="template-select-label">Template</InputLabel>
                  <Select
                    labelId="template-select-label"
                    id="template-select"
                    value={selectedTemplate}
                    label="Template"
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      loadTemplate(e.target.value);
                    }}
                  >
                    <MenuItem value="default">Template Padrão</MenuItem>
                    {templates.map((template) => (
                      <MenuItem key={template.id} value={template.id.toString()}>
                        {template.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Data Inicial"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  margin="normal"
                  placeholder="DD/MM"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Data Final"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  margin="normal"
                  placeholder="DD/MM"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pedidos"
                  type="number"
                  value={orders}
                  onChange={(e) => setOrders(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Valor Investido (R$)"
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ticket Médio (R$)"
                  type="number"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CPA (R$)"
                  type="number"
                  value={cpa}
                  onChange={(e) => setCpa(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Faturamento (R$)"
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ROAS"
                  type="number"
                  value={roas}
                  onChange={(e) => setRoas(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observações Personalizadas"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Visualização do relatório */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Prévia do Relatório
              </Typography>
              <Box>
                <Tooltip title="Salvar como template">
                  <IconButton onClick={openSaveTemplateDialog} color="primary">
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copiar para área de transferência">
                  <IconButton onClick={copyToClipboard} color="primary">
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Abrir no WhatsApp Web">
                  <IconButton onClick={openWhatsApp} color="secondary">
                    <WhatsAppIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
              <CardContent>
                <Box sx={{ whiteSpace: 'pre-line', fontFamily: 'monospace' }}>
                  {generateReportText()}
                </Box>
              </CardContent>
            </Card>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<ContentCopyIcon />}
                onClick={copyToClipboard}
                sx={{ mr: 2 }}
              >
                Copiar Mensagem
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                startIcon={<WhatsAppIcon />}
                onClick={openWhatsApp}
              >
                Enviar no WhatsApp
              </Button>
            </Box>
          </Paper>
          
          {/* Área para comentários estratégicos */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Comentários Estratégicos
            </Typography>
            <TextField
              fullWidth
              label="Anotações sobre performance, insights e próximas ações"
              multiline
              rows={6}
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                variant="outlined" 
                color="primary"
                startIcon={<HistoryIcon />}
              >
                Ver Histórico
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<SaveIcon />}
              >
                Salvar Comentários
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Diálogo para salvar template */}
      <Dialog open={saveTemplateDialogOpen} onClose={() => setSaveTemplateDialogOpen(false)}>
        <DialogTitle>Salvar como Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Template"
            type="text"
            fullWidth
            variant="outlined"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveTemplateDialogOpen(false)}>Cancelar</Button>
          <Button onClick={saveTemplate} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notificação de cópia */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      <
(Content truncated due to size limit. Use line ranges to read in chunks)