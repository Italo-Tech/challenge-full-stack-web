# Comentários sobre o Projeto

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

### 2. Lista de Bibliotecas de Terceiros Utilizadas

**Produção:**
- `express` (4.19.2): Framework web para criação da API REST
- `@prisma/client` (5.22.0): ORM para acesso ao banco de dados MySQL
- `bcryptjs` (2.4.3): Hash de senhas para segurança
- `jsonwebtoken` (9.0.2): Geração e validação de tokens JWT para autenticação
- `zod` (3.23.8): Validação de schemas e DTOs
- `cors` (2.8.5): Configuração de CORS para requisições cross-origin
- `dotenv` (16.4.5): Gerenciamento de variáveis de ambiente
- `express-async-errors` (3.1.1): Tratamento automático de erros assíncronos

**Desenvolvimento:**
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
- **Paginação**: Adicionar paginação nas listagens de alunos, cursos e turmas
- **Filtros Avançados**: Busca de alunos por nome, email, curso, etc.
- **Logs Estruturados**: Sistema de logs.
- **Rate Limiting**: Proteção contra abuso da API
- **Documentação da API**: Swagger/OpenAPI para documentação interativa
- **Soft Delete**: Exclusão lógica ao invés de física para manter histórico
- **Validação de CPF**: Implementar validação real de CPF (algoritmo de dígitos verificadores)
- **Docker**: Containerização da aplicação para facilitar deploy

### 4. Requisitos Obrigatórios Entregues

**Todos os requisitos obrigatórios foram atendidos:**
---

## Frontend

### 1. Decisão da Arquitetura Utilizada

**[A ser implementado]**