const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersCtrl = require('../controllers/orders');

router.get('/', checkAuth, OrdersCtrl.orders_get_all);

router.post('/', checkAuth, OrdersCtrl.orders_post_order);

router.get('/:orderId', checkAuth, OrdersCtrl.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersCtrl.orders_delete_order);

module.exports = router;
