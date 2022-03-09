"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET;

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
    },
  });

  User.authenticate = async function (username, password) {
    try {
      let user = await this.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      // console.log(Boolean(valid)); pending promise is equal to true
      if (valid) {
        // create token
        let newToken = jwt.sign({ username: user.username }, SECRET);

        user.token = newToken; // wanna return the token with the user

        return user; // will have username + pass + token
      } else {
        throw new Error("ops not valid"); // will stop the execusion of my code
      }
    } catch (error) {
      throw new Error("not valid credentials");
    }
  };

  User.validateToken = async function (token) {
    let verifiedToken = jwt.verify(token, SECRET); // this will return an object that has the username
    console.log(verifiedToken);
    const user = await this.findOne({
      where: { username: verifiedToken.username },
    });
    if (user) {
      return user;
    } else {
      throw new Error("invalid token");
    }
  };

  return User;
};

module.exports = UserModel;
