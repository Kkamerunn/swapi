const axios = require("axios");
const { DataTypes } = require("sequelize");
const dbInstance = require("../config/db.js");
const sequelize = dbInstance();

const Vehicle = require("../../models/vehicle.js")(sequelize, DataTypes);

const url = "https://swapi.dev/api/vehicles/";

const fillDatabase = async (data) => {
  for (item of data) {
    const {
      name,
      model,
      manufacturer,
      cost_in_credits,
      length,
      max_atmosphering_speed,
      crew,
      passengers,
      cargo_capacity,
      consumables,
      vehicle_class,
      pilots,
      films,
      created,
      edited,
      url,
      count,
    } = item;
    await Vehicle.create({
      name,
      model,
      manufacturer,
      cost_in_credits,
      length,
      max_atmosphering_speed,
      crew,
      passengers,
      cargo_capacity,
      consumables,
      vehicle_class,
      pilots,
      films,
      created,
      edited,
      url,
      count,
    });
  }
};

const getVehicles = async (req, res) => {
  let vehicles;

  try {
    const results = await Vehicle.findAll({
      attributes: ["id", "name", "model", "count"],
    });
    if (results.length !== 0) {
      vehicles = results;
    } else {
      try {
        const { data } = await axios(url);
        fillDatabase(data.results);
        vehicles = [...data.results];
      } catch (error) {
        res.status(400).json(error);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }

  res.status(200).json(vehicles);
};

const createVehicle = async (req, res) => {
  const {
    name,
    model,
    manufacturer,
    cost_in_credits,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    consumables,
    vehicle_class,
    pilots,
    films,
    created,
    edited,
    url,
    count,
  } = req.body;

  try {
    const results = await Vehicle.create({
      name,
      model,
      manufacturer,
      cost_in_credits,
      length,
      max_atmosphering_speed,
      crew,
      passengers,
      cargo_capacity,
      consumables,
      vehicle_class,
      pilots,
      films,
      created,
      edited,
      url,
      count,
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(id, {
      attributes: ["id", "name", "model", "count"],
    });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json(error);
  }
};

const setVehicleCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  if (count < 0) {
    res.status(404).json({ message: "This value can't be negative" });
  }

  try {
    const vehicle = await Vehicle.findByPk(id, {
      attributes: ["id", "name", "model", "count"],
    });

    if (
      (vehicle.count === 0 && count < 0) ||
      (count < 0 && count * -1 > vehicle.count)
    ) {
      res.status(400).json({
        message: "The amount of vehicles can't be negative",
      });
    } else {
      vehicle.count = count;

      await vehicle.save({ fields: ["count"] });

      res.status(200).json(vehicle);
    }
  } catch (err) {
    const error = new Error("This Vehicle doesn't exist");
    res.status(404).json({ msg: error.message });
  }
};

const incrementVehicleCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const vehicle = await Vehicle.findByPk(id, {
      attributes: ["id", "name", "model", "count"],
    });

    if (
      (vehicle.count === 0 && count < 0) ||
      (count < 0 && count * -1 > vehicle.count)
    ) {
      res.status(400).json({
        message: "The amount of vehicles can't be negative",
      });
    } else {
      const incrementResult = await vehicle.increment("count", { by: count });
      await vehicle.save({ fields: ["count"] });
      const vehicleUpdated = await Vehicle.findByPk(id, {
        attributes: ["id", "name", "count"],
      });
      res.status(200).json(vehicleUpdated);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getVehicles,
  createVehicle,
  getVehicle,
  setVehicleCount,
  incrementVehicleCount,
};
