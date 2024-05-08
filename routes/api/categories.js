const express = require('express');
const router = express.Router();
const categoryCtrl = require('../../controllers/api/categories'); // Adjusted controller import

router.get('/', categoryCtrl.index);

router.get('/:id', categoryCtrl.show);

router.post('/', categoryCtrl.create);

router.put('/:id', categoryCtrl.edit);

router.delete('/:id', categoryCtrl.delete);

module.exports = router;
