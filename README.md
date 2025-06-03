# Trabalho Prático – TWT1 REST API (Gonçalo Cacheira)

##  Links do Projeto

-  Frontend (Vercel): twt1-rest-api-goncalocacheira-649248nm7-gcacheiras-projects.vercel.app
-  Backend (Render): https://twt1-rest-api-goncalocacheira.onrender.com

---

##  Estrutura do Projeto

/frontend → página HTML + JS com Fetch API
/backend → API real com Node.js + Express + MongoDB Atlas
/mock-server → API simulada com JSON Server
/mock-data → Base de dados inicial (bd.json)
/tests → Coleção de testes Postman


---

##  Funcionalidades

- Ver alunos
- Adicionar aluno
- Editar aluno
- Apagar aluno
- Fetch API para consumir dados
- API RESTful real e simulada

---

##  Tecnologias usadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON Server
- Vercel & Render
- Swagger UI *(bónus opcional)*

---

##  Instruções locais

```bash
# Mock Server
cd mock-server
npm install
npm run server  # http://localhost:3001/alunos

# Backend real
cd backend
npm install
node index.js   # http://localhost:3002/alunos

# Frontend
Abre frontend/index.html com Live Server ou navegador
yaml
Copiar
Editar
