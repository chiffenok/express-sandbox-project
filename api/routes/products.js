const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter
});
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id productImg')
        .exec()
        .then(docs => {
            const responseBody = {
                productCount: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        productImg: doc.productImg,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/api/products/' + doc._id
                        }
                    };
                }) 
            };
            res.status(200).json(responseBody);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
});

router.post('/', checkAuth, upload.single('productImg'), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImg: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('_id name price productImg')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    msg: 'Entry with current Id is not found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
});

router.patch('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                msg: 'Product updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
});

router.delete('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                msg: 'Product deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
});

module.exports = router;
