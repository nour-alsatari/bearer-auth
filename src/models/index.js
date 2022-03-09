const { Sequelize, DataTypes } = require('sequelize');

const dotenv = require ("dotenv");
dotenv.config();

const UserModel = require ("./users.model.js");

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
// Connecting to a database by creating sequelize instance 
let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};

const sequelize = new Sequelize (DATABASE_URL , sequelizeOptions)

module.exports = {
    db : sequelize,
    users : UserModel (sequelize, DataTypes)
}