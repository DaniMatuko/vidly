const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided');

    try {
        // the jwt.verify returns a payload object
        const decodedToken = jwt.verify(token, process.env.jwtPrivateKey);
        // add the payload object to the request , so in the next routes we can access it (like: req.user._id)
        req.user = decodedToken;
        next();
    } catch (e) {
        return res.status(400).send('Invalid token');
    }
}