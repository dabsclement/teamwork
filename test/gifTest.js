/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('test for posting gif', () => {
  it('should check if the user posting is auth before posting the gif ', (done) => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoxMCwibGFzdE5hbWUiOiJrYXJlZW0iLCJpYXQiOjE1NzM3NTg0MTMsImV4cCI6MTU3Mzc2MjAxM30.z-dm0INcaPB9TNWwNNLNfByIToYn-x1tdxezEjZkFR4';
    chai.request(app)
      .post('/api/v1/gifs')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set({ Authorization: token })
      .field('title', 'my title')
      .attach('gif', fs.readFileSync('images/giphy.gif'), 'giphy.gif')
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          message: 'Gif has been succesfully posted',

        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    done();
  });
});
