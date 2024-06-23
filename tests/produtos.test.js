const request = require('supertest');
const app = require('../app');

describe('Produtos API', () => {
    it('GET /produtos - Deve retornar todos os produtos', async () => {
        const res = await request(app).get('/produtos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });

    // Outros testes para POST, PUT e DELETE
});
