const pool = require('../db');

// Obter todos os clientes
exports.getAll = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// Obter cliente por ID
exports.getById = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

// Criar novo cliente
exports.create = async (req, res, next) => {
    try {
        const { nome, sobrenome, email, idade } = req.body;
        const [result] = await pool.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

// Atualizar cliente
exports.update = async (req, res, next) => {
    try {
        const { nome, sobrenome, email, idade } = req.body;
        await pool.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

// Deletar cliente
exports.delete = async (req, res, next) => {
    try {
        await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
