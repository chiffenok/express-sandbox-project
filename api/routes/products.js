const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsCtrl = require('../controllers/products');

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

router.get('/', ProductsCtrl.products_get_all);

router.post(
    '/',
    checkAuth,
    upload.single('productImg'),
    ProductsCtrl.products_post_product
);

router.get('/:productId', ProductsCtrl.products_get_product);

router.patch('/:productId', checkAuth, ProductsCtrl.products_patch_product);

router.delete('/:productId', checkAuth, ProductsCtrl.products_delete_product);

module.exports = router;
