const express = require('express');
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

// Server listening
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
