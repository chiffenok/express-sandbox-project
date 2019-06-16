const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/products')

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
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
            res.status(200).json({
                msg: 'handling POST /products',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then( doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            } else {
                res.status(404).json({msg: "Entry with current Id is not found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.update({_id: id})
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

module.exports = router;