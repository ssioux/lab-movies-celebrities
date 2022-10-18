const express = require("express");
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// RUTA de CELEBRITIES

const celebritiesRoutes = require("./celebrities.routes.js");
router.use("/celebrities", celebritiesRoutes);

// RUTA de MOVIES

const moviesRoutes = require("./movies.routes.js");
router.use("/movies", moviesRoutes);

module.exports = router;
