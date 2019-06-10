const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        msg: 'Order was created'
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        msg: 'order details',
        orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        msg: 'order deleted',
        orderId
    });
});

module.exports = router;