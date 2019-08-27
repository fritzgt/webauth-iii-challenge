//import express library
const express = require('express');

//importing bcryptjs library
const bcrypt = require('bcryptjs');

//implement router
const router = express.Router();

//import model
const db = require('../model/users-model');

//creating a new user
router.post('/register', async (req, res) => {
  const credentials = req.body;
  //creating hash using bcrypt
  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;

  try {
    const data = await db.add(credentials);
    res.status(200).json({ message: 'You are registered!' });
  } catch {
    res.status(500).json({ message: 'Server side error' });
  }
});

module.exports = router;
