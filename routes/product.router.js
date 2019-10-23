const express = require('express');
const router = express.Router();
const productService = require('../controllers/productController');

router.get('/', productService.getProducts);
router.get('/:idProducto', productService.getProduct);
router.post('/', productService.saveProduct);
router.put('/:idProducto', productService.updateProduct);
router.delete('/:idProducto', productService.deleteProduct);

module.exports = router;