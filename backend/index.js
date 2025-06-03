require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunosRoutes = require('./routes/alunos.routes');

const app = express();
app.use(cors());
app.use(express.json());

console.log("🔍 URI:", process.env.MONGO_URI); 
app.get('/', (req, res) => {
  res.send('🎉 API de alunos está online!');
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor a correr em http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => console.error('❌ Erro ao ligar à base de dados:', err));
