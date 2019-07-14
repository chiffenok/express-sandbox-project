const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                orders: result
            });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
};

exports.orders_post_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    msg: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
};

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    msg: 'Order not found'
                });
            }
            res.status(200).json({
                order
            });
        })
        .catch(err => {
            res.status(500).json({
                err
            });
        });
};

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                msg: 'Order deleted '
            });
        })
        .catch(err => {
            res.status(500).json({
                err
            });
        });
};
