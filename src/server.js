"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const signup = require("../auth/signup");
const signin = require("../auth/signin")

app.get('/', (req,res)=> {
    res.send("up and runnig")
})

app.post("/signup", signup, (req, res) => {
  console.log("signed up successfully");
});

app.post("/signin", signin , (req, res) => {

  res.status(200).send(
    req.user
  );


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
