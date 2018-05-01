const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5ae81d1c2d5ecc78e8778fd5';

if (!ObjectID.isValid(id)) {
  return console.log('ID is not valid');
}

// Todo.find({_id: id}).then(todos => {
//   console.log(todos)
// });
//
// Todo.findOne({_id: id}).then(todo => {
//   console.log(todo)
// });


User.findById('5ae7749334c7b9743e92587e').then(user => {
  console.log('user', user)
});