"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { users } = require("../src/models/index");

async function signin(req, res, next) {
  if (req.headers.authorization) {
    // i need to make sure that i have the username:password inside the authorization header
    // 'basic hghgidjddoj'
    let arr = req.headers.authorization.split(" ");
    console.log(arr);
    let usernameandpass = arr.pop();
    console.log(usernameandpass);
    let decoded = base64.decode(usernameandpass);
    console.log(decoded);
    let [username, password] = decoded.split(":");
    console.log(username);
    console.log(password);
    try {
      let user = await users.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password,user.password);
      // console.log(Boolean(valid)); pending promise is equal to true
      if (valid) { 
        res.status(200).json({
          user: user,
        });
      } else {
        res.send("not valid credentials");
      }
    } catch (error) {
      next("not valid credentials");
    }
  } else {
    next("username doesn't exist");
  }
}

module.exports = signin;
