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
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ReportGenerator = () => {
  // Estados para os dados do relatório
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
  
  // Estado para notificação de cópia
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Gera o texto do relatório para WhatsApp
  const generateReportText = () => {
    return `📢 Relatório de Google Ads (${startDate} - ${endDate})

📌 ${accountName}
📦 Pedidos: ${orders}
💰 Valor Investido: ${formatCurrency(investment)}
🎟 Ticket Médio: ${formatCurrency(averageTicket)}
📉 CPA: ${formatCurrency(cpa)}
📊 Faturamento: ${formatCurrency(revenue)}
🔄 ROAS: ${roas.toFixed(2)}x

${customNote ? `Obs: ${customNote}` : ''}`;
  };

  // Função para copiar o relatório para a área de transferência
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateReportText())
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
  };

  // Função para abrir o WhatsApp Web com o relatório
  const openWhatsApp = () => {
    const encodedText = encodeURIComponent(generateReportText());
    window.open(`https://web.whatsapp.com/send?text=${encodedText}`, '_blank');
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
                <TextField
                  fullWidth
                  label="Nome da Conta"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  margin="normal"
                />
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
            <Button 
              variant="outlined" 
              color="primary"
              sx={{ mt: 2 }}
            >
              Salvar Comentários
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Notificação de cópia */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Relatório copiado para a área de transferência!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReportGenerator;
