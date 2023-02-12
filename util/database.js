const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "1234567899", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
