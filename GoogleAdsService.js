import axios from 'axios';

/**
 * Serviço para integração com a API do Google Ads
 */
class GoogleAdsService {
  constructor() {
    this.baseUrl = '/api/google-ads'; // Será substituído pela URL real da API
    this.token = localStorage.getItem('google_ads_token');
  }

  /**
   * Configura o token de autenticação
   * @param {string} token - Token de autenticação OAuth
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem('google_ads_token', token);
  }

  /**
   * Obtém o cabeçalho de autenticação
   * @returns {Object} Cabeçalho de autenticação
   */
  getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    };
  }

  /**
   * Autentica o usuário com o Google OAuth
   * @param {string} clientId - ID do cliente OAuth
   * @param {string} redirectUri - URI de redirecionamento após autenticação
   * @returns {string} URL de autenticação
   */
  getAuthUrl(clientId, redirectUri) {
    const scope = encodeURIComponent('https://www.googleapis.com/auth/adwords');
    return `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
  }

  /**
   * Troca o código de autorização por um token de acesso
   * @param {string} code - Código de autorização
   * @param {string} clientId - ID do cliente OAuth
   * @param {string} clientSecret - Segredo do cliente OAuth
   * @param {string} redirectUri - URI de redirecionamento
   * @returns {Promise<Object>} Token de acesso e refresh token
   */
  async exchangeCodeForToken(code, clientId, clientSecret, redirectUri) {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      });
      
      this.setToken(response.data.access_token);
      return response.data;
    } catch (error) {
      console.error('Erro ao trocar código por token:', error);
      throw error;
    }
  }

  /**
   * Obtém a lista de contas MCC
   * @param {string} customerId - ID do cliente MCC
   * @returns {Promise<Array>} Lista de contas gerenciadas
   */
  async getAccounts(customerId) {
    try {
      // Em um ambiente real, esta seria uma chamada à API do Google Ads
      // Simulação de dados para desenvolvimento
      return [
        { id: 1, name: 'Loja Virtual A', client: 'Cliente A', budget: 5000, status: 'active' },
        { id: 2, name: 'E-commerce B', client: 'Cliente B', budget: 7500, status: 'active' },
        { id: 3, name: 'Marketplace C', client: 'Cliente C', budget: 3000, status: 'paused' },
        { id: 4, name: 'Loja D', client: 'Cliente D', budget: 10000, status: 'active' },
        { id: 5, name: 'Serviços E', client: 'Cliente E', budget: 2500, status: 'active' },
        { id: 6, name: 'Plataforma F', client: 'Cliente F', budget: 6000, status: 'paused' },
      ];
    } catch (error) {
      console.error('Erro ao obter contas:', error);
      throw error;
    }
  }

  /**
   * Obtém métricas de desempenho para uma conta específica
   * @param {string} accountId - ID da conta
   * @param {string} startDate - Data inicial (YYYY-MM-DD)
   * @param {string} endDate - Data final (YYYY-MM-DD)
   * @returns {Promise<Object>} Métricas de desempenho
   */
  async getMetrics(accountId, startDate, endDate) {
    try {
      // Em um ambiente real, esta seria uma chamada à API do Google Ads
      // Simulação de dados para desenvolvimento
      return {
        orders: 156,
        investment: 4500.75,
        averageTicket: 320.45,
        cpa: 28.85,
        revenue: 49990.20,
        roas: 11.11,
        clicks: 12500,
        impressions: 250000,
        ctr: 0.05,
        conversions: 156,
        conversionRate: 0.0125
      };
    } catch (error) {
      console.error('Erro ao obter métricas:', error);
      throw error;
    }
  }

  /**
   * Obtém dados históricos para análise de tendências
   * @param {string} accountId - ID da conta
   * @param {string} startDate - Data inicial (YYYY-MM-DD)
   * @param {string} endDate - Data final (YYYY-MM-DD)
   * @param {string} metric - Métrica a ser analisada
   * @returns {Promise<Array>} Dados históricos para a métrica
   */
  async getTrendData(accountId, startDate, endDate, metric) {
    try {
      // Em um ambiente real, esta seria uma chamada à API do Google Ads
      // Simulação de dados para desenvolvimento
      const days = 30; // Simulando 30 dias de dados
      const data = [];
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        
        let value;
        switch (metric) {
          case 'orders':
            value = Math.floor(Math.random() * 10) + 3;
            break;
          case 'investment':
            value = Math.round((Math.random() * 200) + 100);
            break;
          case 'roas':
            value = (Math.random() * 3) + 2;
            break;
          case 'cpa':
            value = (Math.random() * 10) + 20;
            break;
          default:
            value = Math.random() * 100;
        }
        
        data.push({
          date: date.toISOString().split('T')[0],
          value: value
        });
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao obter dados de tendência:', error);
      throw error;
    }
  }

  /**
   * Obtém recomendações de otimização para uma conta
   * @param {string} accountId - ID da conta
   * @returns {Promise<Array>} Lista de recomendações
   */
  async getRecommendations(accountId) {
    try {
      // Em um ambiente real, esta seria uma chamada à API do Google Ads
      // Simulação de dados para desenvolvimento
      return [
        {
          type: 'bid_adjustment',
          title: 'Ajuste de Lance',
          description: 'Aumente os lances em 15% para palavras-chave com alta taxa de conversão',
          impact: 'Alto',
          metrics: {
            currentCpa: 28.85,
            estimatedCpa: 24.52,
            improvement: '15%'
          }
        },
        {
          type: 'budget_optimization',
          title: 'Otimização de Orçamento',
          description: 'Redistribua o orçamento das campanhas de baixo desempenho para campanhas com ROAS acima de 5x',
          impact: 'Médio',
          metrics: {
            currentRoas: 8.2,
            estimatedRoas: 9.5,
            improvement: '16%'
          }
        },
        {
          type: 'keyword_expansion',
          title: 'Expansão de Palavras-chave',
          description: 'Adicione 20 novas palavras-chave sugeridas com foco em intenção de compra',
          impact: 'Alto',
          metrics: {
            estimatedClicks: 1500,
            estimatedConversions: 25,
            estimatedCost: 1200
          }
        }
      ];
    } catch (error) {
      console.error('Erro ao obter recomendações:', error);
      throw error;
    }
  }

  /**
   * Obtém alertas de performance para uma conta
   * @param {string} accountId - ID da conta
   * @returns {Promise<Array>} Lista de alertas
   */
  async getAlerts(accountId) {
    try {
      // Em um ambiente real, esta seria uma chamada à API do Google Ads
      // Simulação de dados para desenvolvimento
      return [
        {
          type: 'roas_below_target',
          title: 'ROAS abaixo da meta',
          description: 'O ROAS da campanha "Produtos Eletrônicos" está abaixo da meta de 4x',
          severity: 'high',
          metrics: {
            current: 2.8,
            target: 4.0
          }
        },
        {
          type: 'cpa_above_target',
          title: 'CPA acima da meta',
          description: 'O CPA da campanha "Acessórios" está 25% acima da meta',
          severity: 'medium',
          metrics: {
            current: 35.75,
            target: 28.60
          }
        },
        {
          type: 'budget_depleted',
          title: 'Orçamento esgotado rapidamente',
          description: 'A campanha "Promoções" está gastando o orçamento diário antes das 14h',
          severity: 'low',
          metrics: {
            budgetUtilizationTime: '14:00',
            recommendedIncrease: '30%'
          }
        }
      ];
    } catch (error) {
      console.error('Erro ao obter alertas:', error);
      throw error;
    }
  }
}

export default new GoogleAdsService();
