const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Bem Vindo à minha Aplicação!' });
});

module.exports = router;
