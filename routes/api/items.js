const express = require('express');
const router = express.Router();
const itemCtrl = require('../../controllers/api/items'); // Adjusted controller import

// Retrieve all items
router.get('/', itemCtrl.index);

// Retrieve a specific item by ID
router.get('/:id', itemCtrl.show);

// Create a new item
router.post('/', itemCtrl.create);

// Update a specific item by ID
router.put('/:id', itemCtrl.edit);

// Delete a specific item by ID
router.delete('/:id', itemCtrl.delete);

module.exports = router;
