const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = '123abc!';


// bcrypt.getSalt(10, (err, salt) => {
//   // bcrypt.hash(password, salt, (hashErr, hash) => {
//   //   console.log(hash)
//   // });
//   console.log(salt);
// })

bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(password, salt, (hashErr, hash) => {
    console.log(hash);
  });
  console.log(salt);
});

var hashPassword = '$2a$10$Ocwn0Ka3kltAbZNrovsuBu3kT0xzjOs1JpuXMmAPYBHPSCX0mMge.';

bcrypt.compare(password, hashPassword, (err, res) => {
  console.log(res)
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123ab');
//
// var decoded = jwt.verify(token, '123ab');
// console.log(token, decoded);

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

