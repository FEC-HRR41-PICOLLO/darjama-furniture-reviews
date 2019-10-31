const request = require('supertest');
const { app } = require('../server/index.js');

describe('Testing MYSQL response from server', () => {
  test('Sends a get request for reviews for product', (done) => {
    request(app)
      .get('/api-reviews')
      .query({ product_id: '922.603.34' })
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(JSON.parse(res.text)).toHaveLength(5);
      })
      .end((err, res) => {
        if (err) { return done(err); }
        done();
      });
  });
});
