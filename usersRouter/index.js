//import express library
const express = require('express');

//importing bcryptjs library to hash
//passsword during registration
const bcrypt = require('bcryptjs');

//import JWT for login signature
const jwt = require('jsonwebtoken');
//importing secret for jwt
const secret = require('../config/secrets');

//importing restricted middleware
const restricted = require('../auth/restricted-middleware.js');

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
      //place token in the response so then can be copy
      //and paste in the headers for testing
      res.status(200).json({ message: 'You are logged in!', token });
    } else {
      res.status().json({ message: 'Incorrect credentials' });
    }
  } catch {
    res.status(500).json({ message: 'Server error!' });
  }
});

//creating function to creat token
function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    //getting the department to then display users based on
    //the current user's dep
    department: user.department
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

//get all users
router.get('/users', restricted, async (req, res) => {
  //getting the department of the current user to
  //display only users from the same dep
  const currentDep = req.decodedJWT.department;
  try {
    //pass the dep us an argument to filter users
    const users = await db.find(currentDep);
    console.log(currentDep);
    res.status(200).json({ users });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
