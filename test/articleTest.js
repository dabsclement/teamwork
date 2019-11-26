/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsInVzZXJJZCI6OCwibGFzdE5hbWUiOiJrYXJlZW0iLCJpYXQiOjE1NzQyNjc4NjIsImV4cCI6MTU3NDM1NDI2Mn0.8efiXz9xuJ3g4tkm3nPoSfgD9zqqJ7MAmEWDNvcE4Bo';


chai.use(chaiHttp);
const { expect } = chai;

// eslint-disable-next-line no-undef
describe('test for posting article', () => {
  it('should check if the user posting is auth before posting the article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Content-Type', 'application/json')
      .set({ Authorization: token })
      .field('title', 'my new article')
      .field('content', 'Lorem ipsum ffghggzgdggggdkuhkhkhjkjhkhk jhhbdbbwibdiblaibwilbliuiugfug8grfggwlygflgwggug')
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          message: 'Article succesfully posted'
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    done();
  });
});

describe('test for updating', () => {
  it('should check if the user is the original poster of the article', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/4')
      .set('Content-Type', 'application/json')
      .set({ Authorization: token })
      .field('articleid', '1')
      .field('title', 'my article edit')
      .field('content', 'lorem lorem lorem lorem updated')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          status: 'success'
        });
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    done();
  });
});
// EMPLOYEE CAN DELETE ARTICLE
describe('delete article', () => {
  it('should check if the user is the original poster of the article', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/4')
      .set('Content-Type', 'application/json')
      .set({ Authorization: token })
      .field('articleid', '1')
      .field('title', 'my article edit')
      .field('content', 'lorem lorem lorem lorem updated')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({
          status: 'success',
          message: 'Article Succesfully Deleted'
        });
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    done();
  });
});