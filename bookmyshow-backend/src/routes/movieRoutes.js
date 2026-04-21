const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieControllers.js");

// CREATE MOVIE
router.post("/", movieController.addMovie);

// GET ALL MOVIES
router.get("/", movieController.getMovies);

// GET MOVIE BY ID
router.get("/:id", movieController.getMovieById);

module.exports = router;