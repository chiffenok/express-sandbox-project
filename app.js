const express = require('express');
const exphbs = require('express-handlebars');
const members = require('./Members');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// app.get('/', (req, res) => {
//     //res.send('<h1>hello2</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'app.html'));
// });

mongoose.connect(
    'mongodb+srv://annn:' +
        process.env.MONGO_ATLAS_PWD +
        '@cluster0-gbr14.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);

// Handlebars Midlleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Homepage route
app.get('/', (req, res) =>
    res.render('home', {
        title: 'Mambers App. Home Page',
        members
    })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, PUT, POST, DELETE, PATCH'
        );
        return res.status(200).json({});
    }
    next();
});

// Init midddleware for logging
// app.use(logger);
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Members API Routes
app.use('/api/members', require('./api/routes/members'));

// Products API Routes
const productRoutes = require('./api/routes/products');
app.use('/api/products', productRoutes);

// Orders API Routes
const orderRoutes = require('./api/routes/orders');
app.use('/api/orders', orderRoutes);

const userRoutes = require('./api/routes/user');
app.use('/api/user', userRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    });
});

// Set the static folder
// app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
