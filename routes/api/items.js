const express = require('express');
const router = express.Router();
const itemCtrl = require('../../controllers/api/items'); // Adjusted controller import

router.get('/', itemCtrl.index);

router.get('/:id', itemCtrl.show);

router.post('/', itemCtrl.create);

router.put('/:id', itemCtrl.edit);

router.delete('/:id', itemCtrl.delete);

module.exports = router;
