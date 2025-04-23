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
  Chip
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const AIAssistant = () => {
  // Estado para armazenar a pergunta do usuário
  const [userQuery, setUserQuery] = useState('');
  
  // Dados simulados de sugestões do assistente IA
  const suggestions = [
    {
      type: 'insight',
      title: 'Otimização de CPA',
      description: 'Suas campanhas de pesquisa têm um CPA 15% mais alto que a média do setor. Considere ajustar os lances para palavras-chave de baixa conversão.',
      icon: <LightbulbIcon color="primary" />
    },
    {
      type: 'trend',
      title: 'Tendência de Crescimento',
      description: 'O ROAS aumentou 23% nas últimas duas semanas para produtos da categoria "Eletrônicos". Considere aumentar o orçamento para essas campanhas.',
      icon: <TrendingUpIcon sx={{ color: 'success.main' }} />
    },
    {
      type: 'alert',
      title: 'Alerta de Performance',
      description: 'O CTR das campanhas de display caiu significativamente nos últimos 3 dias. Recomendamos revisar os criativos e segmentação.',
      icon: <WarningIcon sx={{ color: 'warning.main' }} />
    },
    {
      type: 'opportunity',
      title: 'Oportunidade de Expansão',
      description: 'Identificamos 45 novas palavras-chave relevantes com alto volume de pesquisa e baixa concorrência para seus produtos.',
      icon: <CheckCircleIcon sx={{ color: 'success.main' }} />
    },
    {
      type: 'trend',
      title: 'Tendência de Queda',
      description: 'As conversões para dispositivos móveis diminuíram 12% esta semana. Verifique a experiência de checkout mobile.',
      icon: <TrendingDownIcon sx={{ color: 'error.main' }} />
    }
  ];

  // Dados simulados de recomendações estratégicas
  const strategies = [
    {
      title: 'Otimização de Orçamento',
      description: 'Redistribua 30% do orçamento das campanhas de baixo desempenho para as campanhas com ROAS acima de 5x.',
      impact: 'Alto'
    },
    {
      title: 'Ajuste de Lances',
      description: 'Aumente os lances em 15% para palavras-chave com taxa de conversão acima de 3% e reduza em 10% para aquelas abaixo de 1%.',
      impact: 'Médio'
    },
    {
      title: 'Expansão de Palavras-chave',
      description: 'Adicione as 20 novas palavras-chave sugeridas com foco em intenção de compra para aumentar conversões qualificadas.',
      impact: 'Alto'
    },
    {
      title: 'Otimização de Anúncios',
      description: 'Substitua os 5 anúncios de menor desempenho por novos criativos focados em benefícios específicos do produto.',
      impact: 'Médio'
    }
  ];

  // Função para lidar com a submissão da pergunta
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para processar a pergunta
    // e obter uma resposta do assistente IA
    console.log('Pergunta enviada:', userQuery);
    // Limpa o campo após envio
    setUserQuery('');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Assistente IA de Tráfego Pago
      </Typography>
      
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
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
              >
                Enviar Pergunta
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
            
            <List>
              {suggestions.map((suggestion, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      {suggestion.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                            {suggestion.title}
                          </Typography>
                          <Chip 
                            label={suggestion.type} 
                            size="small" 
                            color={
                              suggestion.type === 'alert' ? 'warning' : 
                              suggestion.type === 'trend' ? 'info' : 
                              suggestion.type === 'insight' ? 'primary' : 'success'
                            }
                            sx={{ height: 20 }}
                          />
                        </Box>
                      }
                      secondary={suggestion.description}
                    />
                  </ListItem>
                  {index < suggestions.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Seção de recomendações estratégicas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 4, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recomendações Estratégicas
            </Typography>
            
            <Grid container spacing={2}>
              {strategies.map((strategy, index) => (
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
                      >
                        Aplicar Recomendação
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        {/* Seção de análise de tendências */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Análise de Tendências
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="textSecondary">
                Gráficos de análise de tendências serão exibidos aqui
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIAssistant;
