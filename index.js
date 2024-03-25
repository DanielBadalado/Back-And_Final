const clientesController = require('./controllers/clientesController');
const produtosController = require('./controllers/produtosController');
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = 3090; 

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

app.get('/', (req, res) => {
  res.send('Bem Vindo a minha Aplicação!');
});

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await clientesController.getAllClientes();
    res.json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter clientes' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await produtosController.getAllProdutos();
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

(async () => {
  try {
    await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    
  
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
})();
