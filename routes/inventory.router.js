const express = require('express');
const router = express.Router();
const inventoryService = require('../controllers/inventoryController');

router.get('/', inventoryService.getInventories);
router.post('/', inventoryService.saveInventory);
router.put('/:id', inventoryService.updateInventory);
router.delete('/:id', inventoryService.deleteInventory);

module.exports = router;