const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const router = require('./routes/index');
const connMySql = require('./controllers/connection');

app.use(cors());
app.use(bodyParser.json());
app.use(router);

connMySql.connect();

app.use(express.json());

app.use((req, res) => res.status(404).json({
  error: true,
  msg: 'Peticion incorrecta',
}));

process.env.NODE_ENV = 'test';
// Server listening
if (process.env.NODE_ENV === 'test') {
  app.listen(5000, () => {
    console.log(`Server started on port 5000...`);
  });
}

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
  });
}

module.exports = app;