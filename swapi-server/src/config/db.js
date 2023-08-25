const Sequelize = require("sequelize");

module.exports = () => {
  const sequelize = new Sequelize("swapidb", "root", "swapi_secret", {
    host: "localhost",
    dialect: "mysql",
  });

  return sequelize;
};
