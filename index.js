const clientesController = require('./controllers/clientesController');
const produtosController = require('./controllers/produtosController');
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = 4001; // Alteração da porta para 4000

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

app.get('/', (req, res) => {
  res.send('Bem Vindo a minha Aplicação!');
});

app.get('/clientes', (req, res) => {
    const clientes = clientesController.getAllClientes();
    res.json(clientes);
  });

app.get('/produtos', (req, res) => {
    const produtos = produtosController.getAllProdutos();
    res.json(produtos);
  });

(async () => {
  try {
    await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    
    // Inicie o servidor apenas se a conexão com o banco de dados for bem-sucedida
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
})();
