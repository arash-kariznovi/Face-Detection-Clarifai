const knex = require('knex');

//use knex.js to connect server to database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'faceRecognition'
  }
});



module.exports = db;
