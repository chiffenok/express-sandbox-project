const moment = require('moment');

// Create midddleware
const logger = (req, res, next) => {
    console.log(
        `${req.protocol}://${req.get('host')}${req.url} ${
            req.method
        }: ${moment().format()}`
    ); // add to file with fs module
    next();
};

module.exports = logger;
