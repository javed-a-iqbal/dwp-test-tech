const Enum = require('enum');

const productMessages = new Enum({
  'Request_data': 'Request for data retrieved',
  'Request_data_london': 'Request has been fulfill for the users with in the london or with in the 50 miles area of london',
  'Error_message': 'Error during exeution',
  'product_name': 'people in London or with in 50 miles',
});


module.exports = {
  'productMessages': productMessages
};
