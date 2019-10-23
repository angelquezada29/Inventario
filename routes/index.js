const express = require('express');
const router = express.Router();

router.use('/producto', require('./product.router'));
router.use('/inventario', require('./inventory.router'));

module.exports = router;