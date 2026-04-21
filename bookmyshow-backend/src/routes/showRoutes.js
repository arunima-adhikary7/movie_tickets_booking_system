const express = require("express");
const router = express.Router();

const showController = require("../controllers/showControllers.js");

// CREATE SHOW
router.post("/", showController.addShow);

// GET ALL SHOWS
router.get("/", showController.getShows);

// GET SHOW BY ID
router.get("/:id", showController.getShowById);

module.exports = router;