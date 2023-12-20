<<<<<<< Updated upstream
const express = require("express");
// const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const CORS = require("cors");
require('dotenv').config()

const routes = require("./routes");

const app = express();
app.use(
  CORS({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(CORS({ origin: "*", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/',express.static(path.join(__dirname, 'public')));

app.use(routes);

/* Not Found MiddleWare */
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
/* Error MiddleWare */
app.use((error, req, res, next) => {
  console.log("in error middleware");
  res.status(500).send(error);
});
module.exports = app;
=======
const express = require("express");
// const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const CORS = require("cors");
const routes = require("./routes");

const app = express();
app.use(
  CORS({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(CORS({ origin: "*", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/',express.static(path.join(__dirname, 'public')));

app.use(routes);

/* Not Found MiddleWare */
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
/* Error MiddleWare */
app.use((error, req, res, next) => {
  console.log("in error middleware");
  res.status(500).send(error);
});
module.exports = app;
>>>>>>> Stashed changes
