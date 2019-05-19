const express = require('express');
const exphbs = require('express-handlebars');
const members = require('./Members');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// app.get('/', (req, res) => {
//     //res.send('<h1>hello2</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
app.use('/api/members', require('./routes/api/members'));

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running`));