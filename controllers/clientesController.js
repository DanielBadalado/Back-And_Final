const clientesService = require('../services/clientesService');

exports.getAll = async (req, res, next) => {
    try {
        const clientes = await clientesService.getAll();
        res.json(clientes);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const cliente = await clientesService.getById(id);
        res.json(cliente);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    const { nome, sobrenome, email, idade } = req.body;
    try {
        await clientesService.create(nome, sobrenome, email, idade);
        res.send('Cliente criado com sucesso');
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { nome, sobrenome, email, idade } = req.body;
    try {
        await clientesService.update(id, nome, sobrenome, email, idade);
        res.send('Cliente atualizado com sucesso');
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await clientesService.remove(id);
        res.send('Cliente removido com sucesso');
    } catch (err) {
        next(err);
    }
};
