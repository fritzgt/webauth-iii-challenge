//import express library
const express = require('express');

//implement router
const router = express.Router();

//import model
const db = require('../model/users-model');

//creating a new user
router.post('/register', async (req, res) => {
  const newUser = req.body;
  try {
    const data = await db.add(newUser);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Server side err' });
  }
});

module.exports = router;
