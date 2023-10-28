const jwt = require('jsonwebtoken');

const extractBearer = (authorization) => {
    if (typeof authorization !== 'string') {
        return false;
    }

    // On isole le token
    const match = authorization.match(/(bearer)\s+(\S+)/i);

    return match && match[2];
};

// Vérification présence du token
const checkToken = (req, res, next) => {
    const token =
        req.headers.authorization && extractBearer(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'I got you !' });
    }

    // Vérification validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next();
    });
};

module.exports = checkToken;
