const axios = require('axios')
const geolib = require('geolib')
const _ = require('lodash')
const constants = require('../lib/constants')
require('dotenv').config()
const successLog = require('../logger/logger').successLog
const errorLog = require('../logger/logger').errorLog
const auditLog = require('../logger/logger').auditLog
const productMessages = require('../common-enum').productMessages

const getAllUsers = () => axios.get(`${process.env.API_URL}/users`)
const getUsersOfCity = (city) => axios.get(`${process.env.API_URL}/city/${city}/users`)

const userById = (id) => axios.get(`${process.env.API_URL}/user/${id}`)

const getDistance = (from, to) => {
  const distanceInMetres = geolib.getDistance(from, to)
  return geolib.convertDistance(distanceInMetres, 'mi')
}

const getUsersInGivenDistance = async (city, distance) => {
  const allUsers = await getAllUsers()
  return allUsers.data.filter(({ latitude, longitude }) => {
    return getDistance(city, { latitude, longitude }) <= distance
  })
}

const getUsers = async (req, res) => {
  try {
    const usersByCity = getUsersOfCity(req.params.city)
    const usersByDistance = getUsersInGivenDistance(constants[req.params.city], 50)

    const [UsersInLondon, UsersInGivenDistance] = await Promise.all([usersByCity, usersByDistance])
    auditLog.info(productMessages.RequestData.value)
    auditLog.info(productMessages.RequestDataLondon.value, { type: 'audit', archetype: 'CN01', product: productMessages.productName.value, emailId: process.env.EMAIL_ADDRESS, productType: 'api data', tags: 'analytics' })
    res.status(200).json(_.union(UsersInLondon.data, UsersInGivenDistance))
  } catch (errors) {
    errorLog.error(productMessages.ErrorMessage.value + errors)
    res.send(errors)
  }
}

const getUsersByID = async (req, res) => {
  const id=req.params.id
  userById(1).then((data)=>{
    auditLog.info(productMessages.RequestData.value)
    auditLog.info(productMessages.RequestDataLondon.value, { type: 'audit', archetype: 'CN01', product: productMessages.productName.value, emailId: process.env.EMAIL_ADDRESS, productType: 'api data', tags: 'analytics' })
 
    res.status(200).json(data.data)
  })

}

module.exports = {
  getUsers,
  getUsersOfCity,
  getAllUsers,
  getDistance,
  getUsersInGivenDistance,
  userById,
  getUsersByID
}
