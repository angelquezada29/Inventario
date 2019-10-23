var chai = require('chai');
var request = require('supertest')
    , server = require('../app');

var expect = chai.expect;

var foo = 'bar';
var beverages = { tea: ['chai', 'matcha', 'oolong'] };

describe('App', function () {
    it('should return codigo status 200', function (done) {
        request(server).get('/producto')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body.error).to.equal(false);
                expect(res.body.response).to.be.an('array');
                expect(res.body.response).to.not.be.empty;
                done()
            });
    });
    it('deberia cargar un producto', function (done) {
        request(server).post('/producto')
            .send({
                nombre: 'portest',
                marca: 'TEST',
                precio: 55555,
                fecha: ''
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body.error).to.equal(false);
                done()
            });
    });
});
