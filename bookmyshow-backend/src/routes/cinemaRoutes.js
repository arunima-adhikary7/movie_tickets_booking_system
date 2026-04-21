const express = require("express");
const router = express.Router();

const cinemaController = require("../controllers/cinemaControllers.js");

// CREATE CINEMA
router.post("/", cinemaController.addCinema);

// GET ALL CINEMAS
router.get("/", cinemaController.getCinemas);

// GET CINEMA BY ID
router.get("/:id", cinemaController.getCinemaById);

module.exports = router;