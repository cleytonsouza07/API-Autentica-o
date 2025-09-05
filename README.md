# API-Autentica-o
# 📌 API de Autenticação e CRUD com Node.js, MongoDB e JWT

Este projeto é uma **API REST** construída com **Node.js + Express + MongoDB + JWT** que permite:

- Registro e autenticação de usuários com **JWT (access + refresh tokens)**
- CRUD de tarefas (**/todos**) protegido por autenticação
- Boas práticas de segurança: senhas com bcrypt, CORS, Helmet, validação de entrada com Zod

---

## 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Zod](https://zod.dev/) – validação
- [Cors](https://www.npmjs.com/package/cors) e [Helmet](https://helmetjs.github.io/) – segurança

---

## 📂 Estrutura de pastas
```bash
src/
  ├── config/        # Configurações (db, jwt)
  ├── controllers/   # Lógica das rotas
  ├── middlewares/   # Middlewares (auth, error handler)
  ├── models/        # Schemas do Mongoose
  ├── routes/        # Definição das rotas
  └── server.js      # Ponto de entrada
⚙️ Configuração
1. Clone o repositório
bash
Copiar código
git clone https://github.com/seu-usuario/node-auth-crud-jwt.git
cd node-auth-crud-jwt
2. Instale as dependências
bash
Copiar código
npm install
3. Configure o .env
Crie um arquivo .env baseado no .env.example:

env
Copiar código
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/node_auth_crud_jwt?retryWrites=true&w=majority
PORT=3000
JWT_ACCESS_SECRET=umSegredoMuitoForteAqui
JWT_REFRESH_SECRET=outroSegredoMaisForteAinda
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
⚠️ Substitua <usuario>, <senha> e o host pelo seu cluster Atlas ou outra instância MongoDB.

4. Rodar em modo desenvolvimento
bash
Copiar código
npm run dev
Servidor disponível em:

arduino
Copiar código
http://localhost:3000
📌 Rotas da API
🔐 Autenticação
POST /auth/register → Cria usuário (hash de senha com bcrypt)

json
Copiar código
{ "name": "Cleyton", "email": "cleyton@email.com", "password": "123456" }
POST /auth/login → Retorna { user, accessToken, refreshToken }

POST /auth/refresh → Recebe { refreshToken } e devolve novos tokens

👤 Usuário
GET /me → Retorna dados do usuário autenticado
Header:

makefile
Copiar código
Authorization: Bearer <accessToken>
✅ Todos (CRUD protegido)
POST /todos → cria tarefa { title, done? }

GET /todos → lista todos do usuário autenticado

GET /todos/:id → busca tarefa por ID

PUT /todos/:id → atualiza { title?, done? }

DELETE /todos/:id → remove

🛠️ Boas práticas implementadas
Access token expira em 15 minutos

Refresh token expira em 7 dias

Middleware de autenticação JWT

Validação de entrada com Zod

Senhas armazenadas com bcrypt

Segurança extra: CORS + Helmet

🧪 Testes
Você pode testar a API usando:

Postman (coleção incluída no repositório)

Insomnia

Ou curl no terminal

Exemplo de registro via curl:

bash
Copiar código
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Cleyton","email":"cleyton@email.com","password":"123456"}'
