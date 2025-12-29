# Edtech - Frontend

Frontend da aplicação de gestão acadêmica desenvolvido com Vue.js 3 e Vuetify 3.

## 🚀 Tecnologias

- **Vue.js 3** - Framework JavaScript progressivo
- **TypeScript** - Tipagem estática
- **Vuetify 3** - Framework de UI Material Design
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── assets/           # Arquivos estáticos (CSS)
│   ├── plugins/          # Plugins do Vue (Vuetify)
│   ├── router/           # Configuração de rotas
│   ├── services/         # Serviços de API
│   ├── stores/           # Stores Pinia (estado)
│   ├── types/            # Tipos TypeScript
│   ├── views/            # Páginas
│   ├── App.vue           # Componente raiz
│   └── main.ts           # Ponto de entrada
├── .env                  # Variáveis de ambiente
└── package.json
```

## 🔧 Instalação

```bash
npm install
```

## ⚙️ Configuração

Configure a URL da API no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3333/api
```

## 🏃 Executar

```bash
# Desenvolvimento
npm run dev
```

## ✨ Funcionalidades

### ✅ Implementadas
- Autenticação (Login/Logout)
- Gerenciamento de Alunos (CRUD completo)
  - Listagem com busca
  - Cadastro
  - Edição (nome e email)
  - Exclusão com confirmação
  - Validações (email, RA e CPF únicos)

### 🔄 Em Desenvolvimento
- Gerenciamento de Cursos
- Gerenciamento de Turmas
- Gerenciamento de Matrículas

## 🔑 Credenciais Padrão

- **Email**: admin@edtech.com
- **Senha**: 123456

## 📚 Arquitetura

### Services
- `api.ts` - Cliente HTTP configurado
- `authService.ts` - Autenticação
- `studentService.ts` - Gerenciamento de alunos

### Stores (Pinia)
- `auth.ts` - Estado de autenticação
- `student.ts` - Estado de alunos

### Views
- `LoginView.vue` - Tela de login
- `StudentsView.vue` - Gerenciamento de alunos
- `CoursesView.vue`, `ClassesView.vue`, `EnrollmentsView.vue` - Placeholders
