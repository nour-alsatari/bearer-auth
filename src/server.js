"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const signup = require("../auth/signup");
const signin = require("../auth/signin");
const bearerAuth = require("../auth/bearerAuth");

app.get("/", (req, res) => {
  res.send("up and runnig");
});

app.get("/user", bearerAuth, (req, res) => {
  res.send(req.user);
});

app.post("/signup", signup, (req, res) => {
  console.log("signed up successfully");
});

app.post("/signin", signin, (req, res) => {
  res.status(200).send(req.user);
});

function start(PORT) {
  app.listen(PORT || 5000, () => {
    console.log(`listening on ${PORT}`);
  });
}

module.exports = {
  app,
  start,
};
