const axios = require('axios');
const geolib = require('geolib');
const _ = require('lodash');
const constants = require('../lib/constants');
require('dotenv').config()
const successLog = require('../logger/logger').successLog;
const errorLog = require('../logger/logger').errorLog;
const auditLog = require('../logger/logger').auditLog;


const getAllUsers = () => axios.get(`${process.env.API_URL}/users`);
const getUsersOfCity = (city) => axios.get(`${process.env.API_URL}/city/${city}/users`);

const getDistance = (from, to) => {
  const distanceInMetres = geolib.getDistance(from, to);
  return geolib.convertDistance(distanceInMetres, "mi");
}

const getUsersInGivenDistance = async (city, distance) => {
  const allUsers = await getAllUsers();
  return allUsers.data.filter(({latitude, longitude}) => {
    return getDistance(city, {latitude, longitude}) <= distance;
  });
}

const getUsers = async (req, res) => {
  try {
    const usersByCity = getUsersOfCity(req.params.city);
    const usersByDistance = getUsersInGivenDistance(constants[req.params.city], 50);
    
    const [UsersInLondon, UsersInGivenDistance] = await Promise.all([usersByCity, usersByDistance]);
    successLog.info("Data retrieved");
    auditLog.info(`Request has been fulfill for the users with in the london or with in the 50 miles area of london `, { type: "audit", archetype: "CN01", product: "people in London or with in 50 miles", emailId: "xyx@xyz.com",  productType: "api data", "tags": "analytics" });
    res.status(200).json(_.union(UsersInLondon.data, UsersInGivenDistance));
  } catch(errors) {
    errorLog.error("Error during exeution ", { error: errors }); 
    res.send(errors);
  }
}

module.exports = {
  getUsers,
  getUsersOfCity,
  getAllUsers,
  getDistance,
  getUsersInGivenDistance
}
