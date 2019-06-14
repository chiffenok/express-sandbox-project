const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/products')

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'handling GET /products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(200).json({
        msg: 'handling POST /products',
        product
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        msg: 'handling GET /products',
        id
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        msg: 'handling Patch /products'
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        msg: 'handling DELETE /products',
        id
    });
});

module.exports = router;