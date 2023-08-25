const express = require("express");
const db = require("./src/config/db.js");
const cors = require("cors");
const starshipsRoutes = require("./src/routes/starshipsRoutes.js");
const vehiclesRoutes = require("./src/routes/vehiclesRoutes.js");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Connect to the database
db();

// Config cors
const whitelist = [process.env.FRONT_END_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Config body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routing
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/starships", starshipsRoutes);

const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log(`Listening from port ${port}`);
});
