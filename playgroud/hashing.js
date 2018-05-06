const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123ab');

var decoded = jwt.verify(token, '123ab');
console.log(token, decoded);

// var message = "I'm cool string";
//
// var hash = SHA256(message).toString();
//
// console.log(hash);
//
// var data = {
//  id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
//
// console.log(resultHash === token.hash)

