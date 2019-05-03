process.env.NODE_ENV = 'test';
// TODO: switch to a test blockchain for testing purposes

const chai = require('chai');
const chaiHttp = require('chai-http');
//const app = require('../dist/app');

const app = process.env.API_URL || 'http://localhost:3001';

const assert = chai.assert;

chai.use(chaiHttp);

const token = {
  id: 1234567890
}

describe('Token', () => {

  it('Mint empty token', async () => {
    const response = await chai.request(app).put(`/Token/${token.id}`);
    assert.equal(response.status, 201);
  });

  it('Burn the minted token', async() => {
    const response = await chai.request(app).delete(`/Token/${token.id}`);
    assert.equal(response.status, 200);
  })
});