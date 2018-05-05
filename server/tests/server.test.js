
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');


const todos = [{
  text: 'first test todo',
  _id: new ObjectID()
},{
  text: 'second test todo',
  _id: new ObjectID(),
  completed: true,
  completedAt: 333
}];


beforeEach((done) => {
  Todo.remove({}).then(()  => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos', () => {
  it('shoud create new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find({text}).then(todos => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
    }).catch(e => done(e))
  });

  });

it('shoud not create todo', (done) => {

request(app)
  .post('/todos')
  .send({})
  .expect(400)
.end((err, res) => {
  if (err) {
    return done(err);
  }
  Todo.find().then(todos => {
  expect(todos.length).toBe(2);
done();
}).catch(e => done(e))
});

});



});


describe('GET /todos route', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);

  });
});

describe('Get /todos:/id route', () => {
  it('should get todo by id', (done) => {

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should return 404 if no todo was found', (done) => {
    request(app)
      .get(`/todos/${ObjectID('5ae81bd3ecf8f378bbbde8f9').toHexString()}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 for invalid ID', (done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done)
  });

});


describe('DELETE /todos/:id route', () => {
  it('should remove todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then(todo => {
          expect(todo).toBeNull();
          done();
        }).catch(e => done(e));
      })
  });

  it('should return 404 if no todo was found', (done) => {
    request(app)
    .delete(`/todos/${ObjectID('5ae81bd3ecf8f378bbbde8f9').toHexString()}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done)
  });

});


describe('PATCH /todos/:id route', () => {
  it('should update todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'this next text';

  request(app)
    .patch(`/todos/${hexId}`)
    .send({text: text, completed: true})
    .expect(200)
    .expect((res) => {
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(true);
    expect(typeof res.body.todo.completedAt).toBe('number');
  })
  .end(done);

  });

  it('should clear completedAt when todo is not completed', (done) => {

    var hexId = todos[1]._id.toHexString();
    var text = 'this next text11';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text: text, completed: false})
      .expect(200)
      .expect((res) => {
      expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(false);
    expect(res.body.todo.completedAt).toBe(null);
    })
    .end(done);

  });






});