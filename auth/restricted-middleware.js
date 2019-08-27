//import jwt
const jwt = require('jsonwebtoken');
//importing the secrete
const secret = require('../config/secrets');

module.exports = (req, res, next) => {
  //get token from headers
  const token = req.headers.authorization;
  if (token) {
    //decoding token
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      //if error means is an invalid or tempered token
      if (err) {
        res.status(401).json({ message: 'Invalid token!' });
      } else {
        //if no error then it was decoded and is valid
        req.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    //No token
    res.status(401).json({ message: 'Missing token!' });
  }
};
