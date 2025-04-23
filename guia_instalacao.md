# Guia de Instalação - Dashboard Google Ads

Este guia fornece instruções detalhadas para instalar e configurar o Dashboard Google Ads em seu ambiente.

## Requisitos do Sistema

### Requisitos de Hardware
- Processador: 2 GHz ou superior
- Memória RAM: 4 GB ou superior
- Espaço em disco: 1 GB disponível

### Requisitos de Software
- Node.js 16.x ou superior
- NPM 7.x ou superior
- Navegador web moderno (Chrome, Firefox, Safari ou Edge)
- Conta Google com acesso ao Google Ads

## Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/dashboard-google-ads.git
cd dashboard-google-ads
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_do_google
REACT_APP_GOOGLE_CLIENT_SECRET=seu_client_secret_do_google
REACT_APP_REDIRECT_URI=http://localhost:3000/auth/callback
```

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Configuração da API do Google Ads

### 1. Criar Projeto no Google Cloud Platform

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Navegue até "APIs e Serviços" > "Biblioteca"
4. Ative a API do Google Ads

### 2. Configurar Credenciais OAuth

1. Navegue até "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "ID do Cliente OAuth"
3. Configure a tela de consentimento OAuth
4. Adicione os escopos necessários:
   - `https://www.googleapis.com/auth/adwords`
5. Adicione URIs de redirecionamento autorizados:
   - `http://localhost:3000/auth/callback` (para desenvolvimento)
   - `https://seu-dominio.com/auth/callback` (para produção)

### 3. Obter Credenciais

Após criar o cliente OAuth, você receberá:
- ID do Cliente
- Segredo do Cliente

Adicione essas informações ao arquivo `.env` conforme mostrado anteriormente.

## Configuração da Conta MCC do Google Ads

### 1. Verificar Acesso MCC

Certifique-se de que sua conta do Google tenha acesso a uma conta MCC (My Client Center) do Google Ads.

### 2. Obter ID do Cliente

1. Faça login na sua conta do Google Ads
2. Navegue até "Ferramentas" > "Configurações"
3. O ID do cliente está listado na seção "Informações da Conta"

## Implantação em Produção

### 1. Construir a Aplicação

```bash
npm run build
```

### 2. Implantar em um Servidor Web

Você pode implantar a pasta `build` em qualquer servidor web estático, como:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### 3. Configurar Variáveis de Ambiente de Produção

Configure as mesmas variáveis de ambiente mencionadas anteriormente, mas com valores apropriados para o ambiente de produção.

## Solução de Problemas

### Problemas de Autenticação

Se você encontrar problemas de autenticação:
1. Verifique se as credenciais OAuth estão corretas
2. Certifique-se de que os URIs de redirecionamento estão configurados corretamente
3. Verifique se a API do Google Ads está ativada no projeto

### Erros de CORS

Se você encontrar erros de CORS:
1. Verifique se o servidor de backend está configurado para permitir solicitações do domínio frontend
2. Adicione o domínio frontend à lista de origens permitidas

### Problemas de Desempenho

Se a aplicação estiver lenta:
1. Verifique a conexão com a internet
2. Limpe o cache do navegador
3. Verifique se há muitos dados sendo carregados simultaneamente

## Suporte

Para obter suporte adicional:
- Envie um e-mail para suporte@dashboardgoogleads.com
- Acesse nossa documentação online em docs.dashboardgoogleads.com
- Abra uma issue no repositório GitHub
