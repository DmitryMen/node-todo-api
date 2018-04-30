const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello app</h1>')
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, e => {
    res.status(404).send(e);
  });

});

app.listen(4201, () => {
  console.log('App running po port 4201');
});