var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

var products = require('./controllers/product');
var inventory = require('./controllers/inventory');

app.use('/api', products);
app.use('/api', inventory);

app.use((req, res) => {
	return res.status(404).json({
		'error': true,
		'msg': 'Peticion incorrecta'
	});
});

//Server listening
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});