const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig);

const getAllUsuarios = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
};

const getUsuarioById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
};

const createUsuario = async (usuario, senha, token) => {
    await pool.query('INSERT INTO usuarios (usuario, senha, token) VALUES (?, ?, ?)', [usuario, senha, token]);
};

const updateUsuario = async (id, usuario, senha, token) => {
    await pool.query('UPDATE usuarios SET usuario = ?, senha = ?, token = ? WHERE id = ?', [usuario, senha, token, id]);
};

const deleteUsuario = async (id) => {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
