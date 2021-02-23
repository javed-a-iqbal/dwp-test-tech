const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const expect = chai.expect;
const nock = require('nock');

const responseData = require('../utils/data');
const controller = require('../../controllers/usersController');
const constants = require('../../lib/constants');

chai.use(chaiHttp);

describe('DWP-TEST-TECH-API usersController', () => {

describe("usersController.getUsersOfCity", () => {
  it("should return list of users when use valid city", async () => {

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

    return controller.getUsersOfCity("London")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(6);
      });

  });

  it("return empty array if no valid city name is used", async () => {

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/city/INVALID/users')
      .reply(200, []);

    return controller.getUsersOfCity("INVALID")
      .then( result => {
        expect(result).to.have.status(200);
        expect(result.data).to.have.lengthOf(0);
      });

  });
});

describe("usersController.getDistance", () => {
  it("calculate distance between two  valid co-ordinate sets", async () => {
    const p1 = { latitude: 51.509865, longitude: -0.118092 };
    const p2 = { latitude: 51.752022, longitude: -1.257677 };
    const result = controller.getDistance(p1, p2);
    return expect(result).to.equal(51.716102958721066);
  })
});

describe("usersController.userById", () => {
  it("return sigle user when valid id is passed", async () => {
    nock('https://dwp-techtest.herokuapp.com/')
      .get('/user/1')
      .reply(200, responseData.userById);
   return controller.userById(1)
   then((result)=>{
    expect(result).to.have.lengthOf(1)
   })
    
  })

  it("return no user when invalid id is passed", async () => {
    nock('https://dwp-techtest.herokuapp.com/')
      .get('/user/2a')
      .reply(200, responseData.userById);
   return controller.userById('2a')
   then((result)=>{
    expect(result).to.have.lengthOf(0)
   })
    
  })

});

describe("usersController.getUsersInGivenDistance", () => {
  it("should return users with in given distance", async () => {
    nock('https://dwp-techtest.herokuapp.com/')
      .get('/users')
      .reply(200, responseData.allUsersMockData);

      return controller.getUsersInGivenDistance(constants.London, 50)
      .then(result => {
              expect(result).to.have.lengthOf(2);
      });
  });

  it("return an empty array when no users found within filter distance", async () => {

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/users')
      .reply(200, responseData.outSideLondonUsersData);
    return controller.getUsersInGivenDistance( constants.London, 50)
      .then(result => {
        expect(result).to.have.lengthOf(0);
      });
  });
});



describe("usersController.getUsers", () => {
  it("should return mix array of users when retrieved users", async () => {

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/users')
      .reply(200, responseData.allUsersMockData);

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

      chai.request(server)
        .get('/users/people-living-in-london-or-within-50-miles/London')
        .end((error, result) => {
            expect(result.body).to.have.lengthOf(8);
        })

  });

  it("should return 200 with an error when data retrieval throws error", async () => {

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/users')
      .reply(404, responseData.allUsersMockData);

    nock('https://dwp-techtest.herokuapp.com/')
      .get('/city/London/users')
      .reply(200, responseData.usersByCityData);

      chai.request(server)
        .get('/users/people-living-in-london-or-within-50-miles/London')
        .end((error, result) => {
          expect(result).to.have.status(200);
          expect(result.body.message).to.contain('404');
        });

  })
})
})

