/**
 * Utilitários para testes da plataforma Dashboard Google Ads
 */

/**
 * Testa a conexão com a API do Google Ads
 * @param {Object} credentials - Credenciais de autenticação
 * @returns {Promise<Object>} Resultado do teste
 */
export const testGoogleAdsConnection = async (credentials) => {
  try {
    // Em um ambiente real, isso testaria a conexão com a API do Google Ads
    // Simulação para desenvolvimento
    console.log('Testando conexão com a API do Google Ads...');
    
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Verifica se as credenciais estão presentes
    if (!credentials || !credentials.clientId || !credentials.clientSecret) {
      return {
        success: false,
        message: 'Credenciais incompletas. Verifique o ID do cliente e o segredo do cliente.',
        details: 'Erro de autenticação: Credenciais inválidas'
      };
    }
    
    return {
      success: true,
      message: 'Conexão estabelecida com sucesso!',
      details: {
        accountsFound: 6,
        accessLevel: 'MCC',
        apiVersion: 'v13'
      }
    };
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    return {
      success: false,
      message: 'Falha ao conectar com a API do Google Ads.',
      details: error.message
    };
  }
};

/**
 * Valida os dados do relatório para WhatsApp
 * @param {Object} reportData - Dados do relatório
 * @returns {Object} Resultado da validação
 */
export const validateWhatsAppReport = (reportData) => {
  const errors = [];
  
  // Verifica campos obrigatórios
  if (!reportData.accountName) errors.push('Nome da conta é obrigatório');
  if (!reportData.startDate) errors.push('Data inicial é obrigatória');
  if (!reportData.endDate) errors.push('Data final é obrigatória');
  
  // Verifica formato das datas (DD/MM)
  const dateRegex = /^\d{2}\/\d{2}$/;
  if (reportData.startDate && !dateRegex.test(reportData.startDate)) {
    errors.push('Data inicial deve estar no formato DD/MM');
  }
  if (reportData.endDate && !dateRegex.test(reportData.endDate)) {
    errors.push('Data final deve estar no formato DD/MM');
  }
  
  // Verifica se os valores numéricos são válidos
  if (isNaN(reportData.orders) || reportData.orders < 0) {
    errors.push('Número de pedidos deve ser um valor numérico positivo');
  }
  if (isNaN(reportData.investment) || reportData.investment < 0) {
    errors.push('Valor investido deve ser um valor numérico positivo');
  }
  if (isNaN(reportData.averageTicket) || reportData.averageTicket < 0) {
    errors.push('Ticket médio deve ser um valor numérico positivo');
  }
  if (isNaN(reportData.cpa) || reportData.cpa < 0) {
    errors.push('CPA deve ser um valor numérico positivo');
  }
  if (isNaN(reportData.revenue) || reportData.revenue < 0) {
    errors.push('Faturamento deve ser um valor numérico positivo');
  }
  if (isNaN(reportData.roas) || reportData.roas < 0) {
    errors.push('ROAS deve ser um valor numérico positivo');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Testa a performance da aplicação
 * @returns {Promise<Object>} Resultado do teste de performance
 */
export const testAppPerformance = async () => {
  try {
    console.log('Testando performance da aplicação...');
    
    // Simula um teste de performance
    const startTime = performance.now();
    
    // Simula operações de carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    return {
      success: true,
      loadTime: loadTime,
      metrics: {
        renderTime: loadTime * 0.7,
        dataFetchTime: loadTime * 0.3,
        memoryUsage: '45MB'
      },
      recommendations: loadTime > 2000 ? [
        'Considere implementar lazy loading para componentes pesados',
        'Otimize as chamadas de API para reduzir o tempo de carregamento'
      ] : []
    };
  } catch (error) {
    console.error('Erro ao testar performance:', error);
    return {
      success: false,
      message: 'Falha ao testar performance da aplicação.',
      details: error.message
    };
  }
};

/**
 * Verifica a compatibilidade do navegador
 * @returns {Object} Resultado da verificação de compatibilidade
 */
export const checkBrowserCompatibility = () => {
  // Detecta o navegador
  const userAgent = navigator.userAgent;
  let browserName = 'Desconhecido';
  let isCompatible = true;
  let issues = [];
  
  // Detecta o navegador
  if (userAgent.indexOf('Chrome') > -1) {
    browserName = 'Google Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    browserName = 'Internet Explorer';
    isCompatible = false;
    issues.push('Internet Explorer não é suportado. Recomendamos usar Chrome, Firefox ou Safari.');
  } else if (userAgent.indexOf('Edge') > -1) {
    browserName = 'Microsoft Edge';
  }
  
  // Verifica recursos necessários
  if (!window.localStorage) {
    isCompatible = false;
    issues.push('Seu navegador não suporta localStorage, necessário para salvar configurações.');
  }
  
  if (!window.fetch) {
    isCompatible = false;
    issues.push('Seu navegador não suporta a API Fetch, necessária para comunicação com o servidor.');
  }
  
  return {
    browser: browserName,
    isCompatible,
    issues
  };
};

/**
 * Testa a responsividade da interface
 * @returns {Object} Resultado do teste de responsividade
 */
export const testResponsiveness = () => {
  const width = window.innerWidth;
  let deviceType = 'desktop';
  let issues = [];
  
  // Determina o tipo de dispositivo com base na largura
  if (width < 576) {
    deviceType = 'mobile';
  } else if (width < 992) {
    deviceType = 'tablet';
  }
  
  // Verifica possíveis problemas de responsividade
  if (deviceType === 'mobile' && width < 320) {
    issues.push('A tela é muito estreita, alguns elementos podem não ser exibidos corretamente.');
  }
  
  return {
    deviceType,
    screenWidth: width,
    screenHeight: window.innerHeight,
    issues
  };
};
