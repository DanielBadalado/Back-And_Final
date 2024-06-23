const pool = require('../configs/db');

// Obter todos os produtos
exports.getAll = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// Obter produto por ID
exports.getById = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

// Criar novo produto
exports.create = async (req, res, next) => {
    try {
        const { nome, descricao, preco, data_atualizado } = req.body;
        const [result] = await pool.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

// Atualizar produto
exports.update = async (req, res, next) => {
    try {
        const { nome, descricao, preco, data_atualizado } = req.body;
        await pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?', [nome, descricao, preco, data_atualizado, req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

// Deletar produto
exports.delete = async (req, res, next) => {
    try {
        await pool.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
