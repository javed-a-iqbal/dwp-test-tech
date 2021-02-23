const Enum = require('enum');

const productMessages = new Enum({
  'RequestData': 'Request for data retrieval',
  'RequestDataLondon': 'Request has been fulfill for the users with in the london or with in the 50 miles area of london',
  'ErrorMessage': 'Error during exeution',
  'productName': 'people in London or with in 50 miles',
});


module.exports = {
  'productMessages': productMessages
};
