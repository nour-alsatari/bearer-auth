const express = require("express");
// const router = express.Router();
const bcrypt = require("bcrypt");
const { users } = require("../src/models/index");

async function signup(req, res, next) {
  console.log("testing");
  const { username, password } = req.body;
  console.log(`${username}:${password}`);

  try {
    let hashed = await bcrypt.hash(password, 5);
    let newUser = await users.create({
      username: username,
      password: hashed,
    });
    console.log(newUser);
    res.status(201).json(newUser);
    next(); // next has to be inside the try
  } catch (error) {
    next("something went wrong");
  }

  // next() if i write the next outside the try, it will execute the next and skip the try/cach 
}

module.exports = signup;
