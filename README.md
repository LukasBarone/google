# README - Dashboard Google Ads com Agente IA

## Visão Geral

O Dashboard Google Ads é uma plataforma completa para gerenciamento e análise de campanhas do Google Ads, com foco na geração de relatórios para WhatsApp e análises estratégicas através de um assistente de IA especializado em tráfego pago.

Esta plataforma foi desenvolvida para facilitar o gerenciamento de múltiplas contas de Google Ads através de uma interface MCC (My Client Center), permitindo a geração rápida de relatórios formatados para envio via WhatsApp e fornecendo insights estratégicos para otimização de campanhas.

## Principais Funcionalidades

### 1. Dashboard Principal
- Visualização de métricas-chave (pedidos, valor investido, ticket médio, CPA, faturamento, ROAS)
- Filtros por data customizáveis
- Interface responsiva e intuitiva

### 2. Seleção de Contas MCC
- Listagem de todas as contas gerenciadas
- Filtros e busca de contas
- Seleção múltipla para análise em lote

### 3. Gerador de Relatórios para WhatsApp
- Criação automática de mensagens formatadas com emojis
- Personalização de observações
- Botão para copiar mensagem ou enviar diretamente para WhatsApp
- Templates salvos para uso recorrente

### 4. Assistente IA de Tráfego Pago
- Insights automáticos baseados nos dados das campanhas
- Recomendações estratégicas para otimização
- Sistema de perguntas e respostas sobre tráfego pago
- Detecção de anomalias e alertas de performance

### 5. Análises Comparativas
- Comparação de métricas entre diferentes períodos
- Visualizações em gráficos e tabelas
- Cálculo automático de variações percentuais
- Identificação de tendências

### 6. Configurações Avançadas
- Personalização da plataforma
- Configuração de alertas e notificações
- Gerenciamento de credenciais da API

## Tecnologias Utilizadas

- **Frontend**: React.js, Material-UI, Chart.js
- **Integração**: API do Google Ads
- **Autenticação**: OAuth 2.0 com Google
- **Análise de Dados**: Algoritmos de IA para insights e recomendações

## Documentação

A documentação completa está disponível nos seguintes arquivos:

- [Manual do Usuário](./docs/manual_usuario.md) - Instruções detalhadas sobre como utilizar a plataforma
- [Guia de Instalação](./docs/guia_instalacao.md) - Instruções para instalação e configuração
- [Requisitos do Projeto](./docs/requisitos_projeto.md) - Especificações e requisitos detalhados
- [Arquitetura da Plataforma](./docs/arquitetura_plataforma.md) - Detalhes técnicos sobre a arquitetura

## Instalação Rápida

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/dashboard-google-ads.git
cd dashboard-google-ads
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (crie um arquivo .env):
```
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_do_google
REACT_APP_GOOGLE_CLIENT_SECRET=seu_client_secret_do_google
REACT_APP_REDIRECT_URI=http://localhost:3000/auth/callback
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

Para instruções mais detalhadas, consulte o [Guia de Instalação](./docs/guia_instalacao.md).

## Estrutura do Projeto

```
dashboard-google-ads/
├── docs/                   # Documentação
│   ├── manual_usuario.md
│   ├── guia_instalacao.md
│   ├── requisitos_projeto.md
│   └── arquitetura_plataforma.md
├── public/                 # Arquivos públicos
│   └── index.html
├── src/                    # Código-fonte
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas da aplicação
│   ├── services/           # Serviços de integração
│   ├── utils/              # Utilitários
│   ├── styles/             # Estilos CSS
│   ├── assets/             # Imagens e recursos
│   ├── App.js              # Componente principal
│   └── index.js            # Ponto de entrada
├── package.json            # Dependências e scripts
└── README.md               # Este arquivo
```

## Requisitos do Sistema

- Node.js 16.x ou superior
- NPM 7.x ou superior
- Navegador web moderno (Chrome, Firefox, Safari ou Edge)
- Conta Google com acesso ao Google Ads

## Suporte

Para obter suporte ou reportar problemas:
- Envie um e-mail para suporte@dashboardgoogleads.com
- Acesse nossa documentação online em docs.dashboardgoogleads.com

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ para otimizar suas campanhas de Google Ads
