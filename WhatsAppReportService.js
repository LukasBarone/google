/**
 * Serviço para geração de relatórios para WhatsApp
 * Responsável por formatar e preparar os relatórios para envio
 */
class WhatsAppReportService {
  constructor() {
    this.googleAdsService = null; // Será injetado na inicialização
  }

  /**
   * Inicializa o serviço com dependências
   * @param {Object} googleAdsService - Serviço de integração com Google Ads
   */
  initialize(googleAdsService) {
    this.googleAdsService = googleAdsService;
  }

  /**
   * Formata valores monetários em reais
   * @param {number} value - Valor a ser formatado
   * @returns {string} Valor formatado em reais
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  /**
   * Gera o texto do relatório para WhatsApp
   * @param {Object} data - Dados do relatório
   * @returns {string} Texto formatado para WhatsApp
   */
  generateReportText(data) {
    const {
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
    } = data;

    return `📢 Relatório de Google Ads (${startDate} - ${endDate})

📌 ${accountName}
📦 Pedidos: ${orders}
💰 Valor Investido: ${this.formatCurrency(investment)}
🎟 Ticket Médio: ${this.formatCurrency(averageTicket)}
📉 CPA: ${this.formatCurrency(cpa)}
📊 Faturamento: ${this.formatCurrency(revenue)}
🔄 ROAS: ${roas.toFixed(2)}x

${customNote ? `Obs: ${customNote}` : ''}`;
  }

  /**
   * Obtém dados para o relatório de uma conta específica
   * @param {string} accountId - ID da conta
   * @param {string} startDate - Data inicial (formato DD/MM)
   * @param {string} endDate - Data final (formato DD/MM)
   * @returns {Promise<Object>} Dados do relatório
   */
  async getReportData(accountId, startDate, endDate) {
    try {
      // Converte datas para formato YYYY-MM-DD para API
      const currentYear = new Date().getFullYear();
      const [startDay, startMonth] = startDate.split('/');
      const [endDay, endMonth] = endDate.split('/');
      
      const formattedStartDate = `${currentYear}-${startMonth}-${startDay}`;
      const formattedEndDate = `${currentYear}-${endMonth}-${endDay}`;
      
      // Obtém métricas da API
      const metrics = await this.googleAdsService.getMetrics(accountId, formattedStartDate, formattedEndDate);
      
      // Obtém detalhes da conta
      const accounts = await this.googleAdsService.getAccounts();
      const account = accounts.find(acc => acc.id === parseInt(accountId)) || { name: 'Conta não encontrada' };
      
      return {
        accountName: account.name,
        startDate,
        endDate,
        orders: metrics.orders,
        investment: metrics.investment,
        averageTicket: metrics.averageTicket,
        cpa: metrics.cpa,
        revenue: metrics.revenue,
        roas: metrics.roas,
        customNote: ''
      };
    } catch (error) {
      console.error('Erro ao obter dados para relatório:', error);
      throw error;
    }
  }

  /**
   * Salva um modelo de relatório personalizado
   * @param {Object} template - Modelo de relatório
   * @returns {Promise<Object>} Modelo salvo
   */
  async saveReportTemplate(template) {
    try {
      // Em um ambiente real, isso salvaria no banco de dados
      // Simulação para desenvolvimento
      const savedTemplate = { ...template, id: Date.now() };
      
      // Salva no localStorage para persistência temporária
      const templates = JSON.parse(localStorage.getItem('report_templates') || '[]');
      templates.push(savedTemplate);
      localStorage.setItem('report_templates', JSON.stringify(templates));
      
      return savedTemplate;
    } catch (error) {
      console.error('Erro ao salvar modelo de relatório:', error);
      throw error;
    }
  }

  /**
   * Obtém modelos de relatório salvos
   * @returns {Promise<Array>} Lista de modelos de relatório
   */
  async getReportTemplates() {
    try {
      // Em um ambiente real, isso buscaria do banco de dados
      // Simulação para desenvolvimento
      const templates = JSON.parse(localStorage.getItem('report_templates') || '[]');
      
      if (templates.length === 0) {
        // Cria modelos padrão se não existirem
        const defaultTemplates = [
          {
            id: 1,
            name: 'Relatório Semanal Padrão',
            template: '📢 Relatório de Google Ads ({startDate} - {endDate})\n\n📌 {accountName}\n📦 Pedidos: {orders}\n💰 Valor Investido: {investment}\n🎟 Ticket Médio: {averageTicket}\n📉 CPA: {cpa}\n📊 Faturamento: {revenue}\n🔄 ROAS: {roas}\n\nObs: {customNote}'
          },
          {
            id: 2,
            name: 'Relatório Resumido',
            template: '📊 Resumo Google Ads ({startDate}-{endDate})\n{accountName}\nPedidos: {orders} | Investimento: {investment}\nROAS: {roas} | Faturamento: {revenue}'
          }
        ];
        
        localStorage.setItem('report_templates', JSON.stringify(defaultTemplates));
        return defaultTemplates;
      }
      
      return templates;
    } catch (error) {
      console.error('Erro ao obter modelos de relatório:', error);
      throw error;
    }
  }

  /**
   * Gera URL para compartilhamento direto no WhatsApp
   * @param {string} text - Texto do relatório
   * @returns {string} URL para WhatsApp Web
   */
  generateWhatsAppUrl(text) {
    return `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  }

  /**
   * Gera URL para compartilhamento direto no WhatsApp Mobile
   * @param {string} text - Texto do relatório
   * @param {string} phone - Número de telefone (opcional)
   * @returns {string} URL para WhatsApp Mobile
   */
  generateWhatsAppMobileUrl(text, phone = '') {
    if (phone) {
      return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
    }
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  }
}

export default new WhatsAppReportService();
