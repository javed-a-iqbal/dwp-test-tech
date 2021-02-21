const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const expect = chai.expect;
const nock = require('nock');

const responseData = require('../utils/data');
const controller = require('../../controllers/usersController');
const constants = require('../../lib/constants');

chai.use(chaiHttp);

describe("DWP-TEST-TECH-API usersController", () => {

  it("should return  array of users when a valid city is used", async () => {

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

    return controller.getUsersOfCity("London")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(10);
      });

  });

  
})


