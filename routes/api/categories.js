const express = require('express');
const router = express.Router();
const categoryCtrl = require('../../controllers/api/categories'); // Adjusted controller import

// Retrieve all categories
router.get('/', categoryCtrl.index);

// Retrieve a specific category by ID
router.get('/:id', categoryCtrl.show);

// Create a new category
router.post('/', categoryCtrl.create);

// Update a specific category by ID
router.put('/:id', categoryCtrl.edit);

// Delete a specific category by ID
router.delete('/:id', categoryCtrl.delete);

module.exports = router;
