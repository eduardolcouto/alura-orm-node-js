# API Escola — ORM com Node.js

API REST para gerenciamento de uma escola online, desenvolvida com **Node.js**, **Express** e **Sequelize** (SQLite). Cobre o cadastro de pessoas, cursos, categorias e matrículas.

---

## Tecnologias

| Pacote | Versão | Função |
|--------|--------|--------|
| Node.js | ≥ 18 | Runtime |
| Express | 4.18.2 | Framework HTTP |
| Sequelize | 6.32.1 | ORM |
| sequelize-cli | 6.6.1 | Migrations e seeders |
| SQLite3 | 5.1.6 | Banco de dados |
| swagger-jsdoc | 6.x | Geração da spec OpenAPI |
| swagger-ui-express | 5.x | Interface da documentação |
| Jest | 30.x | Testes unitários |
| Nodemon | 3.x | Hot reload em desenvolvimento |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd orm-com-nodejs

# Instale as dependências
npm install
```

---

## Banco de dados

O projeto usa **SQLite** com arquivo local em `src/database/storage/database.sqlite`.

```bash
# Executar todas as migrations
npx sequelize-cli db:migrate

# Popular o banco com dados de exemplo
npx sequelize-cli db:seed:all

# Desfazer todas as migrations (caso necessário)
npx sequelize-cli db:migrate:undo:all
```

---

## Executando o servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Servidor disponível em:
# http://localhost:3000
```

---

## Documentação da API

Com o servidor em execução, acesse a interface Swagger UI:

```
http://localhost:3000/api-docs
```

---

## Endpoints

### Pessoas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/pessoas` | Lista pessoas ativas |
| GET | `/pessoas/todos` | Lista todas as pessoas (incluindo inativas) |
| GET | `/pessoas/:id` | Busca uma pessoa pelo ID |
| POST | `/pessoas` | Cria uma nova pessoa |
| PUT | `/pessoas/:id` | Atualiza uma pessoa |
| DELETE | `/pessoas/:id` | Remove uma pessoa (soft delete) |

### Matrículas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/pessoas/:estudanteId/matriculas` | Lista matrículas ativas do estudante |
| GET | `/pessoas/:estudanteId/matriculas/todos` | Lista todas as matrículas do estudante |
| GET | `/pessoas/:estudanteId/matriculas/:id` | Busca uma matrícula pelo ID |
| POST | `/pessoas/:estudanteId/matriculas` | Cria uma matrícula para o estudante |

### Cursos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/cursos` | Lista todos os cursos |
| GET | `/cursos/:id` | Busca um curso pelo ID |
| POST | `/cursos` | Cria um novo curso |
| PUT | `/cursos/:id` | Atualiza um curso |
| DELETE | `/cursos/:id` | Remove um curso (soft delete) |

### Categorias

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/categorias` | Lista todas as categorias |
| GET | `/categorias/:id` | Busca uma categoria pelo ID |
| POST | `/categorias` | Cria uma nova categoria |
| PUT | `/categorias/:id` | Atualiza uma categoria |
| DELETE | `/categorias/:id` | Remove uma categoria (soft delete) |

---

## Testando com REST Client

O arquivo `api.http` na raiz do projeto contém todas as chamadas prontas para uso com a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VSCode.

---

## Testes

```bash
# Executar todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch

# Com relatório de cobertura
npm run test:coverage
```

### Cobertura atual

| Módulo | Testes |
|--------|--------|
| `utils/validaCpfHelper` | Comprimento, dígitos iguais, dígitos verificadores |
| `services/Services` | CRUD completo (findAll, findByPk, create, update, destroy) |
| `services/PessoaServices` | Matrículas por estudante, listagem com escopo |
| `controllers/Controller` | Todos os handlers HTTP (200, 400, 500) |
| `controllers/PessoaController` | Matrículas ativas e listagem completa |

---

## Estrutura do projeto

```
orm-com-nodejs/
├── src/
│   ├── app.js                        # Configuração do Express e Swagger
│   ├── controllers/
│   │   ├── Controller.js             # Controller base (CRUD)
│   │   ├── CategoriaController.js
│   │   ├── CursoController.js
│   │   ├── MatriculaController.js
│   │   └── PessoaController.js
│   ├── database/
│   │   ├── config/config.json        # Configuração do Sequelize
│   │   ├── migrations/               # Migrations do banco
│   │   ├── models/                   # Models do Sequelize
│   │   ├── seeders/                  # Dados de exemplo
│   │   └── storage/database.sqlite   # Arquivo do banco SQLite
│   ├── routes/
│   │   ├── index.js
│   │   ├── categoriasRoute.js
│   │   ├── cursosRoute.js
│   │   └── pessoasRoute.js
│   ├── services/
│   │   ├── Services.js               # Service base (CRUD)
│   │   ├── CategoriaServices.js
│   │   ├── CursoServices.js
│   │   ├── MatriculaServices.js
│   │   └── PessoaServices.js
│   └── utils/
│       ├── validaCpfHelper.js        # Validação de CPF
│       └── swagger.js                # Configuração OpenAPI
├── tests/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── api.http                          # Chamadas HTTP (REST Client)
├── server.js                         # Entry point
└── package.json
```

---

## Validações

- **CPF**: comprimento de 11 dígitos, rejeita sequências repetidas e valida os dois dígitos verificadores pelo algoritmo módulo 11
- **Nome**: entre 3 e 255 caracteres
- **E-mail**: formato válido de e-mail
- **Soft delete**: todos os models usam `paranoid: true` — registros excluídos não são removidos do banco

---

## Licença

ISC
