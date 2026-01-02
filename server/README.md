## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js - usada a versão 24
- MySQL
- npm ou yarn

## Instalação

### 1. Clone o repositório e acesse a pasta do servidor

```bash
cd server
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações do banco de dados:

```env
# Environment
NODE_ENV=development
PORT=3333

# Database
DB_USERNAME=root
DB_PASSWORD=sua_senha_aqui
DB_PORT=3306
DB_HOST=localhost
DB_DATABASE=edtech
DB_DIALECT=mysql
```

## Setup do Banco de Dados

### 1. Criar o banco de dados

Acesse o MySQL e crie o banco de dados:

```sql
CREATE DATABASE edtech;
```

### 2. Gerar o Prisma Client

```bash
npm run prisma:generate
```

### 3. Executar as migrations

Este comando criará todas as tabelas no banco de dados:

```bash
npm run prisma:migrate
```

### 4. Popular o banco com dados iniciais (Seed)

```bash
npm run prisma:seed
```

Este comando irá popular o banco com:
- **Usuário admin** (email: `admin@edtech.com`, senha: `123456`)
- **Estudantes** de exemplo
- **Cursos** disponíveis
- **Turmas** criadas
- **Matrículas** de exemplo

## Executando a aplicação

### Modo desenvolvimento (com hot reload)

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## Testes

### Executar todos os testes

```bash
npm test
```

### Executar testes com cobertura

```bash
npm run test:coverage
```

O relatório de cobertura será gerado na pasta `coverage/`.

### Executar testes com saída detalhada

```bash
npm run test:verbose
```