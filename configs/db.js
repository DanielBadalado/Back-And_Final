require('dotenv').config();
const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10
});

// Função para criar a tabela clientes
const createClientesTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            sobrenome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            idade INT NOT NULL
        )
    `);
};

// Função para criar a tabela produtos
const createProdutosTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            descricao VARCHAR(255) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            data_atualizado DATETIME NOT NULL
        )
    `);
};

// Função para criar a tabela usuarios
const createUsuariosTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario VARCHAR(255) NOT NULL,
            senha VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL
        )
    `);
};

// Crie as tabelas apenas se elas não existirem
const createTables = async () => {
    try {
        await createClientesTable();
        await createProdutosTable();
        await createUsuariosTable();
        console.log('Tabelas criadas com sucesso.');
    } catch (err) {
        console.error('Erro ao criar as tabelas:', err);
    }
};

// Executa a criação das tabelas
createTables();

module.exports = pool;
