const pool = require('../configs/db');

// Obter todos os Usuarios
exports.getAll = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// Obter usuarios por ID
exports.getById = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};

// Criar novo usuarios
exports.create = async (req, res, next) => {
    try {
        const { } = req.body;
        const [result] = await pool.query('INSERT INTO usuarios (usuario, senha, token) VALUES (?, ?, ?)', [usuario, senha, token]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

// Atualizar usuarios
exports.update = async (req, res, next) => {
    try {
        const { usuario, senha, token } = req.body;
        await pool.query('UPDATE usuarios SET usuario = ?, senha = ?, token = ? WHERE id = ?', [usuario, senha, token, req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

// Deletar usuarios
exports.delete = async (req, res, next) => {
    try {
        await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
