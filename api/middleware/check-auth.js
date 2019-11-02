const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(process.env.JWT_KEY);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Auth failed/ Check auth' });
    }
};