const { users } = require("../src/models/index");

function bearerAuth(req, res, next) {
  if (req.headers.authorization) {
    let arr = req.headers.authorization.split(" "); // ['bearer' , 'token']
    let token = arr.pop(); //[token]
    
      users.validateToken(token).then((user) => {
        req.user = user;
        next();
      }).catch ((error) => {
        next(`invalid token ${error}`)
      })
  
  }
}

module.exports = bearerAuth;

