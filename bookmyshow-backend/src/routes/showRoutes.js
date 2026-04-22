const express = require("express");
const router = express.Router();

const showController = require("../controllers/showControllers.js");

// CREATE SHOW
router.post("/", showController.addShow);

// GET ALL SHOWS
router.get("/", showController.getShows);

// ✅ MUST BE FIRST (specific route)
router.get("/movie/:movieId", showController.getShowsByMovie);

// GET SHOW BY ID (keep last among GET routes)
router.get("/:id", showController.getShowById);

module.exports = router;