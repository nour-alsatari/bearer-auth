"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { users } = require("../src/models/index");

 function signin(req, res, next) { // no need for async if i dont have await 
  if (req.headers.authorization) {
    // i need to make sure that i have the username:password inside the authorization header
    // 'basic hghgidjddoj'
    let arr = req.headers.authorization.split(" ");
    // console.log(arr);
    let usernameandpass = arr.pop();
    // console.log(usernameandpass);
    let decoded = base64.decode(usernameandpass);
    // console.log(decoded);
    let [username, password] = decoded.split(":");
    // console.log(username);
    // console.log(password);

    users.authenticate(username, password).then(validUser => {
      req.user = validUser;
      next();
    }).catch(error=>next(`invalid user ${error}`));

    

  } 
}

module.exports = signin;
