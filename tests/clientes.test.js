const request = require('supertest');
const app = require('../app');

describe('Clientes API', () => {
    it('GET /clientes - Deve retornar todos os clientes', async () => {
        const res = await request(app).get('/clientes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });

    // Outros testes para POST, PUT e DELETE
});
