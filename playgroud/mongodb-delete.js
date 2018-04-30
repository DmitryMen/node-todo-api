// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp');
  if (err) {
    return console.log(`Unable to connect to mongodb server`)
  };

  console.log('Connected to MongoDb server');

  // delete many
  // db.collection('Todos').deleteMany({text: 'Fly to the moon'}).then((res) => {
  //   console.log(res);
  // });
  // delete one

  // find one and delete
  db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
    console.log(result);
  });

  // client.close();
});