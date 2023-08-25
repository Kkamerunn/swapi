const express = require("express");

const {
  getVehicles,
  createVehicle,
  getVehicle,
  setVehicleCount,
  incrementVehicleCount,
} = require("../controllers/vehiclesController.js");

const router = express.Router();

router.route("/").get(getVehicles).post(createVehicle);

router
  .route("/:id")
  .get(getVehicle)
  .post(setVehicleCount)
  .put(incrementVehicleCount);

module.exports = router;
