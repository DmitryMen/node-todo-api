// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp');
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  };

  console.log('Connected to MongoDb server');

  // db.collection('Todos').insertOne({
  //   text: 'Somethind to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Dmitry',
  //   age: 22,
  //   location: 'Odessa, Ukraine'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


  client.close();
});