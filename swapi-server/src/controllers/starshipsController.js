const axios = require("axios");
const { DataTypes } = require("sequelize");
const dbInstance = require("../config/db.js");
const sequelize = dbInstance();

const Starship = require("../../models/starship.js")(sequelize, DataTypes);

const url = "https://swapi.dev/api/starships/";

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
      hyperdrive_rating,
      MGLT,
      starship_class,
      pilots,
      films,
      created,
      edited,
      url,
      count,
    } = item;
    await Starship.create({
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
      hyperdrive_rating,
      MGLT,
      starship_class,
      pilots,
      films,
      created,
      edited,
      url,
      count,
    });
  }
};

const getStarships = async (req, res) => {
  let starShips;

  try {
    const results = await Starship.findAll();
    if (results.length !== 0) {
      starShips = results;
    } else {
      try {
        const { data } = await axios(url);
        fillDatabase(data.results);
        starShips = [...data.results];
      } catch (error) {
        res.status(400).json(error);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }

  res.status(200).json(starShips);
};

const createStarship = async (req, res) => {
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
    hyperdrive_rating,
    MGLT,
    starship_class,
    pilots,
    films,
    created,
    edited,
    url,
    count,
  } = req.body;

  try {
    const results = await Starship.create({
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
      hyperdrive_rating,
      MGLT,
      starship_class,
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

const getStarShip = async (req, res) => {
  const { id } = req.params;

  try {
    const starShip = await Starship.findByPk(id, {
      attributes: ["id", "name", "model", "count"],
    });
    res.status(200).json(starShip);
  } catch (error) {
    res.status(400).json(error);
  }
};

const setStarShipCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const starShip = await Starship.findByPk(id, {
      attributes: ["id", "name", "model", "count"],
    });

    starShip.count = count;

    await starShip.save({ fields: ["count"] });

    res.status(200).json(starShip);
  } catch (err) {
    const error = new Error("This starship doesn't exist");
    res.status(404).json({ msg: error.message });
  }
};

const incrementStarShipCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const starShip = await Starship.findByPk(id, {
      attributes: ["id", "name", "model", "count"],
    });

    if (
      (starShip.count === 0 && count < 0) ||
      (count < 0 && count * -1 > starShip.count)
    ) {
      res.status(200).json({
        message: "The amount of vehicles can't be negative",
      });
    } else {
      const incrementResult = await starShip.increment("count", { by: count });
      await starShip.save({ fields: ["count"] });
      const starshipUpdated = await Starship.findByPk(id, {
        attributes: ["id", "name", "count"],
      });
      res.status(200).json(starshipUpdated);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getStarships,
  createStarship,
  getStarShip,
  setStarShipCount,
  incrementStarShipCount,
};
