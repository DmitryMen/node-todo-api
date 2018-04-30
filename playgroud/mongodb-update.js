// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp');
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  };

  console.log('Connected to MongoDb server');

  db.collection('Users').findOneAndUpdate(
    {_id: new ObjectID('5ae6a0ab7b57046e038024cb')},
    {
      $set: {name: 'Pahan the best'},
      $inc: {age: 1}
    },
    {returnOriginal: false}
    ).then(res => {
    console.log(res);
  });

  // client.close();
});