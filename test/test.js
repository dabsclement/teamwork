/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;


describe('Auth endpoint', () => {
  describe('test for the create-account', () => {
    it('should create user account', (done) => {
      const user = {
        firstName: 'fawas',
        lastName: 'kareem',
        email: 'test@gmail.com',
        password: '123456789',
        gender: 'male',
        jobRole: 'deveoper',
        department: 'tech',
        address: '5 oyinbo street, abuja',
        isAdmin: true
      };
      chai.request(app)
        .post('/api/v1/auth/create-user')
        .set('Accept', 'application/json')
        .send(user)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(201);
          expect(res.body.data).to.have.property('firstName');
        })
        .catch((err) => {
          throw err;
        });
      done();
    });
  });

  describe('this test for the signUp', () => {
    it('should log the user in', () => {
      // eslint-disable-next-line no-unused-vars
      const userDetails = {
        email: 'phawazzzy@gmail.com',
        password: 'Hardemola29'
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userDetails)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            firstName: 'oluwaseun',
            lastName: 'Dabiri',
            // message: 'login succesful'
          });
        });
    });
  });
});
