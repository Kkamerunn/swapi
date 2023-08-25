const express = require("express");

const {
  getStarships,
  createStarship,
  getStarShip,
  setStarShipCount,
  incrementStarShipCount,
} = require("../controllers/starshipsController.js");

const router = express.Router();

router.route("/").get(getStarships).post(createStarship);

router
  .route("/:id")
  .get(getStarShip)
  .post(setStarShipCount)
  .put(incrementStarShipCount);

module.exports = router;
