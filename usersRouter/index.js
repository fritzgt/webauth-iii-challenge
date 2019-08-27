//import express library
const express = require('express');

//importing bcryptjs library to hash
//passsword during registration
const bcrypt = require('bcryptjs');

//import JWT for login signature
const jwt = require('jsonwebtoken');
//importing secret for jwt
const secret = require('../config/secrets');

//implement router
const router = express.Router();

//import model
const db = require('../model/users-model');

//creating a new user
router.post('/register', async (req, res) => {
  const credentials = req.body;
  //creating hash using bcrypt
  const hash = bcrypt.hashSync(credentials.password, 14);
  //set the password to the new hash to be send to the DB
  credentials.password = hash;
  try {
    //now the credentials include the password as a hash
    const data = await db.add(credentials);
    res.status(200).json({ message: 'You are registered!' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

//login
router.post('/login', async (req, res) => {
  //check the body for username and passwaord
  const { username, password } = req.body;
  try {
    //connect to the db to find a matching username
    //and return the user object
    const user = await db.findByUser(username);
    //check if the user exist and if the hash password matches
    if (user && bcrypt.compareSync(password, user.password)) {
      //creating token for JWT
      const token = genToken(user);
      res.status(200).json({ message: 'You are logged in!', token });
    } else {
      res.status().json({ message: 'Incorrecct credentials' });
    }
  } catch {
    res.status(500).json({ message: 'Server error!' });
  }
});
//creating function to creat token
function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
