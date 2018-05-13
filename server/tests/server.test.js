
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {populateTodos, todos, users, populateUsers} = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('GET /users/me', () => {
  // it('should return user if authenticated', (done) => {
  //   request(app)
  //     .get('/users/me')
  //     .set('x-auth', users[0].tokens[0].token)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body._id).toBe(users[0]._id.toHexString());
  //       expect(res.body.email).toBe(users[0].email);
  //     })
  //     .end(done);
  // });

  it('should return 401 if user not authenticated', (done) => {
    request(app)
    .get('/users/me')
    // .set('x-auth', users[0].tokens[0].token)
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    })
    .end(done);

  });

});


describe('POST /users', () => {
  it('should create a user', (done) => {

    var email = 'dmitry@test.com';
    var password = '123abc';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(typeof res.header['x-auth']).toBe('string');
        expect(typeof res.body._id).toBe('string');
        expect(res.body.email).toBe(email);
      })
    .end(err => {
      if (err) {
        return done(err);
      }

      User.findOne({email}).then(user => {
        expect(user.password === password).toBe(false);
        done();
      })

    })

  });

  it('should return validation errors if request invalid', (done) => {

    var email = 'test.com';
    var password = '123bc';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);


  });

  it('it should not create user if email already used', (done) => {
    var email = users[0].email;
    var password = '123bc1!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });
  
});
