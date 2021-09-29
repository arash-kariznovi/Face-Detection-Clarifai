// import libraries
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const bcrypt = require('bcryptjs');
const cors = require('cors');
// start server
const app = express();
// use middleware to parse objects to json
app.use(bodyParser.json());
app.use(cors());
// get for showing all users information
app.get('/', (req, res) => {
  db('users').then(user => {
    res.json(user);
  })
})
//get for showing information by ID
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.json('Invalid ID')
      }
    })
    .catch(err => {
      res.json('Unable to open profile')
    })
})
//post for signing in 
app.post('/signin', (req, res) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => {
            res.status(400).json('Unable to response')
          })
      } else {
        res.status(400).json('wrong credentials')
      }
    }).catch(err => res.status(400).json('wrong credentials'))
})
//register using transation and bcrypt.js
//add to 2 dbs in one trx
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  var hash = bcrypt.hashSync(stringify(password), 10);
  db.transaction(trx => {
    trx.insert({
      email, hash
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .insert({
            name: name,
            email: loginEmail[0],
            entries: 0,
            joined: new Date()
          })
          .returning('*')
           .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => {
      res.status(400).json('Unable to register');
    })
})
//put for updating image entries
app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => {
      res.status(400).json('Unable to get entires')
    })
})
// listen to port
app.listen(3000, () => {
  console.log('server is running!');
})


