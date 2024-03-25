const pool = require('../configs/database');

exports.getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM produtos');
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
};

exports.create = async (nome, descricao, preco, data_atualizado) => {
    await pool.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
};

exports.update = async (id, nome, descricao, preco, data_atualizado) => {
    await pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?', [nome, descricao, preco, data_atualizado, id]);
};

exports.remove = async (id) => {
    await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
};
