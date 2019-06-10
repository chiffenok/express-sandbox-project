const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'handling GET /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        msg: 'handling POST /products'
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