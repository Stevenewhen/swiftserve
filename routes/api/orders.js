const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

router.get('/', ordersCtrl.getAllOrders);
// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);
// POST /api/orders/cart/items/:id
router.post('/cart/items/:id', ordersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);

router.post('/cart/triage', ordersCtrl.triage);
// POST /api/orders/cart/qty
router.put('/cart/qty', ordersCtrl.setItemQtyInCart);

router.put('/:id/mark-prepared', ordersCtrl.markOrderAsPrepared);

router.get('/unprepared', ordersCtrl.getUnpreparedOrders)


router.get('/unpaid', ordersCtrl.getUnpaidOrders)

router.put('/:id/mark-paid', ordersCtrl.markOrderAsPaid);


module.exports = router;
