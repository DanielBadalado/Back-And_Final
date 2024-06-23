require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const pool = require('./db'); // Arquivo para configuração do pool de conexões
const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração da View Engine
app.set('views', './views');
app.set('view engine', 'jade');

// Rotas
app.use('/', indexRouter);
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

// Middleware de tratamento de erros
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
