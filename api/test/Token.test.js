process.env.NODE_ENV = 'test';
// TODO: connect to a test blockchain for testing purposes

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
}

describe('Token', () => {

  it('Mint empty token', async () => {
    const response = await chai.request(app).put(`/Token/${token.id}`).auth('pizza', '');
    assert.equal(response.status, 201);
  });

  it('Burn the minted token', async () => {
    const response = await chai.request(app).delete(`/Token/${token.id}`).auth('pizza', '');
    assert.equal(response.status, 200);
  });

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

  it('Burn the minted token', async () => {
    const response = await chai.request(app).delete(`/Token/${token.id}`).auth('pizza', '');
    assert.equal(response.status, 200);
  });
});
