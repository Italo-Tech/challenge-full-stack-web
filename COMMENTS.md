# Comentários sobre o Projeto

## GERAL

Para instalação e testes, acompanhe os README.md dentro de \client e \server.

## Backend

### 1. Decisão da Arquitetura Utilizada

Optei por uma **Arquitetura em Camadas (Layered Architecture)** combinada com princípios de **Clean Architecture** e **SOLID** pelos seguintes motivos:

- **Separação de Responsabilidades**: Cada camada tem uma função específica (Routes → Controllers → Use Cases → Repositories → Database)
- **Testabilidade**: Use Cases isolados permitem testes unitários sem dependências externas
- **Manutenibilidade**: Código organizado facilita localização e correção de bugs
- **Escalabilidade**: Fácil adicionar novos recursos seguindo o mesmo padrão
- **Baixo Acoplamento**: Mudanças em uma camada não afetam as outras

A estrutura segue o fluxo:
```
Request → Routes → Controllers → Use Cases → Repositories → Database
```

Onde:
- **Routes**: Definem endpoints HTTP
- **Controllers**: Orquestram requisições (sem lógica de negócio)
- **Use Cases**: Contêm toda a lógica de negócio
- **Repositories**: Abstraem acesso ao banco de dados
- **DTOs**: Validam entrada de dados com Zod

### 2. Lista de Bibliotecas de Terceiros usadas

- `express` (4.19.2): Framework web para criação da API REST
- `@prisma/client` (5.22.0): ORM para acesso ao banco de dados MySQL
- `bcryptjs` (2.4.3): Hash de senhas para segurança
- `jsonwebtoken` (9.0.2): Geração e validação de tokens JWT para autenticação
- `zod` (3.23.8): Validação de schemas e DTOs
- `cors` (2.8.5): Configuração de CORS para requisições cross-origin
- `dotenv` (16.4.5): Gerenciamento de variáveis de ambiente
- `express-async-errors` (3.1.1): Tratamento automático de erros assíncronos

- `typescript` (5.6.3): Tipagem estática e segurança de tipos
- `tsx` (4.19.2): Execução de TypeScript em modo watch
- `prisma` (5.22.0): CLI do Prisma para migrations e gerenciamento do banco
- `jest` (30.2.0): Framework de testes unitários
- `ts-jest` (29.4.6): Preset do Jest para TypeScript
- `@types/*`: Definições de tipos TypeScript para as bibliotecas

### 3. O que Melhoraria com Mais Tempo

- **Testes de Integração**: Testar a integração entre Controllers, Repositories e banco de dados real
- **Testes E2E**: Testar fluxos completos da API usando Supertest
- **CI/CD**: Pipeline automatizado com GitHub Actions para rodar testes e deploy
- **Cache**: Implementar Redis para cache de consultas frequentes
- **Logs Estruturados**: Sistema de logs.
- **Rate Limiting**: Proteção contra abuso da API
- **Documentação da API**: Swagger/OpenAPI para documentação interativa
- **Docker**: Containerização da aplicação para facilitar deploy

### 4. Requisitos Obrigatórios Entregues

**Todos os requisitos obrigatórios foram atendidos:**
---

## Frontend

### 1. Decisão da Arquitetura Utilizada

Optei por uma **Arquitetura baseada em Componentes** utilizando **Vue 3 Composition API** com **Pinia** para gerenciamento de estado, pelos seguintes motivos:

- **Composabilidade**: Composition API permite reutilização lógica através de composables
- **Reatividade Granular**: Sistema reativo do Vue 3 com Ref e Reactive oferece performance otimizada
- **Separação de Concerns**: Divisão clara entre Views, Stores, Services e Types
- **Gerenciamento de Estado Centralizado**: Pinia fornece store TypeScript-first com DevTools integrado
- **Type Safety**: TypeScript garante tipagem forte em toda aplicação

A estrutura segue o padrão:
```
Views (UI) → Stores (Estado) → Services (API) → Backend
              ↓
           Types (DTO's)
```

Onde:
- **Views**: Componentes de página com lógica de apresentação
- **Stores**: Gerenciamento de estado global com Pinia
- **Services**: Camada de comunicação com API (axios)
- **Types**: Interfaces TypeScript compartilhadas
- **Router**: Navegação e proteção de rotas

### 2. Lista de Bibliotecas de Terceiros Usadas

- `vue` (3.5.13): Framework progressivo para construção de interfaces
- `vue-router` (4.4.5): Roteamento oficial do Vue com navegação programática
- `pinia` (2.3.0): Store oficial do Vue 3, substituto do Vuex
- `vuetify` (3.7.4): Framework de componentes Material Design
- `axios` (1.7.9): Cliente HTTP para requisições à API
- `@mdi/font` (7.4.47): Ícones Material Design

- `typescript` (5.6.3): Tipagem estática e segurança de tipos
- `vite` (6.0.3): Build tool moderna e rápida com HMR
- `@vitejs/plugin-vue` (5.2.1): Plugin Vite para suporte Vue 3
- `vite-plugin-vuetify` (2.0.4): Auto-import de componentes Vuetify

### 3. O que Melhoraria com mais tempo

- **Testes Unitários**: Implementar testes com Vitest/Jest para componentes críticos
- **Testes E2E**: Adicionar Cypress ou Playwright para testar fluxos completos
- **Validação de Formulários**: Biblioteca dedicada como Vee-Validate
- **Dark Mode**: Tema escuro alternativo
- **Exportação de Dados**: Excel/CSV para relatórios
- **Gráficos e Dashboards**: Visualização de métricas com Chart.js
- **Animações**: Melhor UX para o usuário final 

### 4. Funcionalidades Implementadas

**Todas as funcionalidades CRUD foram implementadas:**

**Autenticação**
- Login com JWT
- Proteção de rotas (middleware de autenticação)
- Logout com limpeza de token

**Gestão de Alunos**
- Listar alunos com busca
- Criar novo aluno
- Editar aluno existente
- Excluir aluno (soft delete)
- Validações de formulário

**Gestão de Cursos**
- Listar cursos com busca
- Criar novo curso
- Editar curso existente
- Excluir curso
- Interface visual com badges

**Gestão de Turmas**
- Listar turmas com busca
- Criar nova turma
- Editar turma existente
- Excluir turma
- Datas no formato brasileiro (DD/MM/YYYY)
- Exibição de quantidade de alunos matriculados
- Relacionamento visual com cursos

**Gestão de Matrículas**
- Listar matrículas com busca
- Criar nova matrícula
- Cancelar matrícula
- Excluir matrícula
- Exibição de status (Ativa/Cancelada)
- Relacionamento visual entre aluno, turma e curso

**Design e UX**
- Interface responsiva com Vuetify
- Feedback visual
- Dialogs de confirmação para ações destrutivas
- Loading states em operações assíncronas
- Skeleton loaders durante carregamento
- Ícones intuitivos para ações
- Chips coloridos para status e datas

### 5. Segurança

- **Token JWT**: Armazenado no localStorage e enviado em todas requisições
- **Proteção de Rotas**: Middleware verifica autenticação antes de acessar páginas
- **Validação de Formulários**: Regras client-side antes de enviar ao backend
- **Sanitização**: TypeScript previne injection através de tipagem forte
- **HTTPS Ready**: Preparado para produção com HTTPS

## Testes

### Estratégia de Testes

O sistema tem uma estratégia de testes em múltiplas camadas, focando somente em **testes unitários** para a camada de Use Cases, que contém a lógica de negócio da aplicação.

### Testes Unitários (Use Cases)

#### Cobertura de Testes

✅ **100% de cobertura** em todos os Use Cases (62 testes):

**Student (27 testes)**

**Course (6 testes)**

**Class (8 testes)**

**Enrollment (15 testes)**

**Auth (7 testes)**

**Utils (5 testes)**

#### Padrão AAA (Arrange, Act, Assert)

Todos os testes seguem o padrão AAA

### Scripts de Teste

```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:verbose": "jest --verbose"
}
```

### Resultados dos Testes

```
Test Suites: 14 passed, 14 total
Tests: 62 passed, 62 total
Cobertura Use Cases: 100%
```