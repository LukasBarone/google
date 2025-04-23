# Requisitos do Projeto: Dashboard de Relatórios de Google Ads (MCC)

## Objetivo Principal
Criar uma plataforma centralizada e automatizada para extrair relatórios prontos em formato de mensagem semanal para cada cliente, com base nos dados reais do Google Ads, e ao mesmo tempo realizar análises estratégicas internas.

## Funcionalidades Necessárias

### 1. Conexão com a MCC do Google Ads
- Permitir login seguro e seleção das contas vinculadas
- Autenticação via API do Google Ads
- Gerenciamento de múltiplas contas de clientes

### 2. Visualização por Cliente/Conta
- Listagem de todas as contas gerenciadas
- Filtros por data customizável (ex: 11/04 a 22/04)
- Possibilidade de salvar períodos de relatório recorrentes (ex: semana atual, semana passada)
- Interface para seleção rápida de contas e períodos

### 3. Métricas Obrigatórias por Período
- 📦 Pedidos (conversões)
- 💰 Valor Investido
- 🎟 Ticket Médio
- 📉 CPA (Custo por Aquisição)
- 📊 Faturamento (conversão * ticket médio, se necessário)
- 🔄 ROAS (Return on Ad Spend - faturamento ÷ valor investido)

### 4. Geração de Mensagem Pronta para WhatsApp
- Geração automática de texto pronto no seguinte modelo:
  ```
  📢 Relatório de Google Ads (11/04 - 22/04)

  📌 [NOME DA CONTA]
  📦 Pedidos: XX
  💰 Valor Investido: R$ XXXX,XX
  🎟 Ticket Médio: R$ XXX,XX
  📉 CPA: R$ XX,XX
  📊 Faturamento: R$ XXXX,XX
  🔄 ROAS: X,XXx

  Obs: [CAMPO PARA TEXTO PERSONALIZADO]
  ```
- Botão "Copiar Mensagem" para envio direto no WhatsApp
- Formatação adequada com emojis e valores formatados em reais

### 5. Área para Comentários Estratégicos
- Campo editável para anotações manuais sobre performance
- Espaço para registrar insights e próximas ações
- Possibilidade de salvar histórico de comentários

### 6. Funcionalidades Avançadas (Desejáveis)
- Comparativo com semanas anteriores
- Alertas automáticos de performance fora do padrão (ex: ROAS abaixo de 2, CPA acima da média)
- Tags para destacar tendências de produtos, campanhas em alta ou queda
- Visualizações gráficas de tendências

### 7. Interface e Usabilidade
- Interface limpa, responsiva e mobile-friendly
- Design intuitivo e fácil de usar
- Acesso rápido às funcionalidades principais

### 8. Agente IA Especialista em Tráfego Pago
- Sugestões de otimização de campanhas
- Análise de tendências e padrões
- Recomendações estratégicas baseadas nos dados
- Identificação de oportunidades de melhoria
- Sugestões de ajustes de orçamento e lances

## Requisitos Técnicos
- Integração com API do Google Ads
- Armazenamento seguro de credenciais
- Processamento e cálculo de métricas em tempo real
- Sistema de autenticação e autorização
- Banco de dados para armazenar configurações e histórico
