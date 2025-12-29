# Arquitetura do Projeto

## Visão Geral

O projeto segue uma **arquitetura em camadas (Layered Architecture)** combinada com princípios de **Clean Architecture** e **SOLID**, garantindo separação de responsabilidades, testabilidade e manutenibilidade do código.

## Padrões Arquiteturais

### 1. Arquitetura em Camadas

A aplicação está organizada nas seguintes camadas:

```
Routes (Rotas)                ->    Definição de endpoints
Controllers (Controladores)   ->    Orquestração de requisições
Use Cases (Casos de Uso)      ->    Regras de negócio
Repositories (Repositórios)   ->    Acesso a dados
Database (Prisma ORM)         ->    Camada de persistência
```

### 2. Estrutura de Pastas

```
server/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── migrations/            # Migrações do banco
│   └── seed.ts                # Script de seed
├── src/
│   ├── config/                # Configurações (Prisma, etc)
│   ├── controllers/           # Controladores HTTP
│   ├── dtos/                  # Data Transfer Objects
│   ├── middlewares/           # Middlewares Express
│   ├── repositories/          # Camada de acesso a dados
│   ├── routes/                # Definição de rotas
│   ├── use-cases/             # Casos de uso (regras de negócio)
│   ├── utils/                 # Utilitários e helpers
│   └── server.ts              # Ponto de entrada da aplicação
└── package.json
```

## Descrição das Camadas

### Routes (Rotas)

- **Responsabilidade**: Definir os endpoints da API e mapear para os controladores correspondentes

### Controllers (Controladores)

- **Responsabilidade**: 
  - Receber requisições HTTP
  - Orquestrar a execução dos use-cases
  - Retornar respostas HTTP apropriadas
  - **NÃO contém regras de negócio**

### Use Cases (Casos de Uso)

- **Responsabilidade**: 
  - Implementar as regras de negócio da aplicação
  - Executar validações específicas do domínio
  - Coordenar operações entre repositórios
  - Lançar exceções de negócio quando necessário

- **Localização**: `src/use-cases/`
- **Organização**: Separados por domínio (student, course, class, enrollment, auth)

### Repositories (Repositórios)

- **Responsabilidade**: 
  - Abstrair o acesso ao banco de dados
  - Executar queries e operações CRUD
  - Isolar a lógica de persistência da lógica de negócio

### Middlewares

- **Responsabilidade**: 
  - Interceptar requisições antes de chegarem aos controladores
  - Implementar funcionalidades transversais (autenticação, logs, tratamento de erros)

### DTOs (Data Transfer Objects)

- **Responsabilidade**: 
  - Definir estruturas de dados para transferência entre camadas
  - Validar entrada de dados

- **Localização**: `src/dtos/`

### Utils (Utilitários)

- **Responsabilidade**: 
  - Funções auxiliares e classes utilitárias
  - Exceções customizadas (ex: `AppError`)

- **Localização**: `src/utils/`

## Princípios Aplicados

### 1. Dependency Inversion (Inversão de Dependência)

Os Use Cases dependem de abstrações (interfaces/contratos) dos repositórios, não de implementações concretas:

```typescript
// Use Case depende da interface, não da implementação
constructor(private studentRepository: StudentRepository) {}
```

### 2. Single Responsibility (Responsabilidade Única)

Cada classe tem uma única responsabilidade:
- **Controller**: Apenas orquestra
- **Use Case**: Apenas implementa regras de negócio
- **Repository**: Apenas acessa dados

### 3. Separation of Concerns (Separação de Responsabilidades)

Cada camada cuida de um aspecto específico:
- Rotas → Roteamento
- Controllers → HTTP
- Use Cases → Negócio
- Repositories → Persistência

## Fluxo de Requisição

```
1. Cliente faz requisição HTTP
         ↓
2. Express Router direciona para Controller
         ↓
3. Controller instancia Repository e Use Case
         ↓
4. Use Case executa regras de negócio
         ↓
5. Repository acessa banco de dados via Prisma
         ↓
6. Resultado retorna pela cadeia: Repository → Use Case → Controller
         ↓
7. Controller formata resposta HTTP
         ↓
8. Cliente recebe resposta
```

## Tecnologias e Ferramentas

- **Node.js** + **TypeScript**: Base da aplicação
- **Express**: Framework web
- **Prisma ORM**: Acesso ao banco de dados
- **MySQL**: Banco de dados relacional
- **JWT**: Autenticação e autorização
- **bcryptjs**: Hash de senhas
- **express-async-errors**: Tratamento de erros assíncronos

## Banco de Dados

### Modelos Principais

- **User**: Usuários do sistema (autenticação)
- **Student**: Alunos cadastrados
- **Course**: Cursos disponíveis
- **Class**: Turmas de cursos
- **Enrollment**: Matrículas de alunos em turmas

### Relações

- Um **Course** possui várias **Classes** (1:N)
- Uma **Class** pertence a um **Course** (N:1)
- Um **Student** pode ter várias **Enrollments** (1:N)
- Uma **Class** pode ter várias **Enrollments** (1:N)
- Um **Enrollment** pertence a um **Student** e uma **Class** (N:1)

## Vantagens desta Arquitetura

✅ **Testabilidade**: Cada camada pode ser testada isoladamente  
✅ **Manutenibilidade**: Código organizado e fácil de localizar  
✅ **Escalabilidade**: Fácil adicionar novos recursos  
✅ **Baixo Acoplamento**: Mudanças em uma camada não afetam outras  
✅ **Reutilização**: Use Cases podem ser reutilizados em diferentes contextos  
✅ **Separação de Responsabilidades**: Cada componente tem um propósito claro

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

## Conclusão

Essa arquitetura garante um código limpo, testável e escalável, seguindo as melhores práticas de engenharia de software.

Com **100% de cobertura nos Use Cases**, a camada de negócio está completamente validada, garantindo confiabilidade e qualidade do código.
