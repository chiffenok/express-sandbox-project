const express = require('express');
const exphbs = require('express-handlebars');
const members = require('./Members');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// app.get('/', (req, res) => {
//     //res.send('<h1>hello2</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'app.html'));
// });

// Handlebars Midlleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Homepage route 
app.get('/', (req, res) => res.render('home', {
    title: 'Mambers App. Home Page',
    members
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Init midddleware
app.use(logger); 

// Members API Routes
app.use('/api/members', require('./api/routes/members'));

// Products API Routes
const productRoutes = require('./api/routes/products');
app.use('/api/products', productRoutes);

// Orders API Routes
const orderRoutes = require('./api/routes/orders');
app.use('/api/orders', orderRoutes);

// Set the static folder
// app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;