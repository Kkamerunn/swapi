"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicle.init(
    {
      name: DataTypes.STRING,
      model: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      cost_in_credits: DataTypes.STRING,
      length: DataTypes.STRING,
      max_atmosphering_speed: DataTypes.STRING,
      crew: DataTypes.STRING,
      passengers: DataTypes.STRING,
      cargo_capacity: DataTypes.STRING,
      consumables: DataTypes.STRING,
      vehicle_class: DataTypes.STRING,
      pilots: DataTypes.JSON,
      films: DataTypes.JSON,
      created: DataTypes.STRING,
      edited: DataTypes.STRING,
      url: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
