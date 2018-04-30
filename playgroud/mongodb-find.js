// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp');
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  };

  console.log('Connected to MongoDb server');

//   db.collection('Todos').find({
//     _id: new ObjectID('5ae62e958fb6b66cfa3d15f0')
//   }).toArray().then((document) => {
//     console.log(document);
//   }, (err) => {
//     console.log('Unable to find', err);
// });

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to find', err);
  });


  // client.close();
});