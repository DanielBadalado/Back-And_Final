const produtosService = require('../services/produtosService');

exports.getAll = async (req, res, next) => {
    try {
        const produtos = await produtosService.getAll();
        res.json(produtos);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const produto = await produtosService.getById(id);
        res.json(produto);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    const { nome, descricao, preco, data_atualizado } = req.body;
    try {
        await produtosService.create(nome, descricao, preco, data_atualizado);
        res.send('Produto criado com sucesso');
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, data_atualizado } = req.body;
    try {
        await produtosService.update(id, nome, descricao, preco, data_atualizado);
        res.send('Produto atualizado com sucesso');
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await produtosService.remove(id);
        res.send('Produto removido com sucesso');
    } catch (err) {
        next(err);
    }
};
