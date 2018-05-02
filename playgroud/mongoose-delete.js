const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5ae81d1c2d5ecc78e8778fd5';

// Todo.findOneAndRemove('5ae895981ca2fb7f0070f00b').then(todo => {
//   console.log(todo);
// })


Todo.remove({}).then(todo => {
  console.log(todo);
})