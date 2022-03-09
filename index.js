const server = require("./src/server");
const dotenv = require("dotenv");
const { db } = require("./src/models/index");
dotenv.config();
const PORT = process.env.PORT;

db.sync().then(() => {
  server.start(PORT);
});


