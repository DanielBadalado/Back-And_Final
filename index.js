require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const clientesController = require('./controllers/clientesController');
const produtosController = require('./controllers/produtosController');

const app = express();
const port = 3090;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Middleware para parsing de JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem Vindo a minha Aplicação!');
});

// Rotas para clientes
app.get('/clientes', clientesController.getAll);
app.get('/clientes/:id', clientesController.getById);
app.post('/clientes', clientesController.create); // Rota para criar um novo cliente

// Rotas para produtos
app.get('/produtos', produtosController.getAll);
app.get('/produtos/:id', produtosController.getById);
app.post('/produtos', produtosController.create);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

(async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database');

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1);
    }
})();
