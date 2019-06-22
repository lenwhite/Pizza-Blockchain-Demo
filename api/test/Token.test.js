process.env.NODE_ENV = 'test';
// TODO: connect to a test blockchain for testing purposes

const CONFIG = require('../dist/CONFIG').default;

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = process.env.API_URL || 'http://localhost:3001';

const assert = chai.assert;

chai.use(chaiHttp);

const token = {
  id: 1234567890,
  data: {
    foo: `qwerty`,
    name: `Vic Phu`
  },
};

describe('Token', () => {

  describe('Mint & Burn', () => {
    it('Mint empty token', async () => {
      const response = await chai.request(app).put(`/Token/${token.id}`).auth('pizza', '');
      assert.equal(response.status, 201);
    });

    it('Another party burns the minted token', async () => {
      const response = await chai.request(app).delete(`/Token/${token.id}`).auth('flour', '');
      // TODO: replace with proper error code check
      assert.notEqual(response.status, 200);
    });

    it('Burn the minted token', async () => {
      const response = await chai.request(app).delete(`/Token/${token.id}`).auth('pizza', '');
      assert.equal(response.status, 200);
    });
  });

  describe('Data set & get', () => {
    it('Mint token with data', async () => {
      const response = await chai.request(app).put(`/Token/${token.id}`).send(token.data).auth('pizza', '');
      assert.equal(response.status, 201);
    });

    it('Retrieve data from token', async () => {
      const response = await chai.request(app).get(`/Token/${token.id}`).auth('pizza', '');
      assert.equal(response.status, 200);
      assert.deepEqual(response.body.data, token.data);
    });

    it('Update data in token', async () => {
      let response = await chai.request(app).post(`/Token/${token.id}`).auth('pizza', '').send(
        { ...token.data, lastUpdated: '6666-66-66' }
      );
      assert.equal(response.status, 200);

      response = await chai.request(app).get(`/Token/${token.id}`).auth('pizza', '');
      assert.equal(response.body.data.lastUpdated, '6666-66-66');
    });

    it('Burn the token with data', async () => {
      const response = await chai.request(app).delete(`/Token/${token.id}`).auth('pizza', '');
      assert.equal(response.status, 200);
    });
  });

  describe('Transfer', () => {

    before(async () => {
      await chai.request(app).put(`/Token/${token.id}`).auth('pizza', '');
    });

    it('Transfer a token', async () => {
      const response = await chai.request(app).post(`/Token/${token.id}/transfer`)
        .auth('pizza', '')
        .send({
          address: CONFIG.flour.address,
        });
      assert.equal(response.status, 200);
    });

    it('New party burns the token', async () => {
      const response = await chai.request(app).delete(`/Token/${token.id}`).auth('flour', '');
      assert.equal(response.status, 200);
    });
  });

  describe('Enumerate', () => {

    before(async () => {
      await chai.request(app).put(`/Token/1234`).auth('pizza', '');
      await chai.request(app).put(`/Token/5678`).auth('pizza', '');
      await chai.request(app).put(`/Token/${token.id}`).send(token.data).auth('pizza', '');
    });

    after(async () => {
      await chai.request(app).delete(`/Token/1234`).auth('pizza', '');
      await chai.request(app).delete(`/Token/5678`).auth('pizza', '');
      await chai.request(app).delete(`/Token/${token.id}`).auth('pizza', '');
    });

    it('Enumerates owned tokens', async () => {
      const response = await chai.request(app).get(`/Token/`).auth('pizza', '');
      assert.equal(response.status, 200);

      assert.isTrue(response.body.data.hasOwnProperty('1234'));
      assert.isTrue(response.body.data.hasOwnProperty('5678'));
      assert.deepEqual(response.body.data[token.id], token.data);
    });

  });

});

