const express = require("express");
const router = express.Router();

const seatController = require("../controllers/seatControllers.js");

// CREATE SEATS FOR A SHOW
router.post("/", seatController.createSeats);

// GET SEATS BY SHOW
router.get("/:showId", seatController.getSeats);

// LOCK SEAT
router.put("/lock/:id", seatController.lockSeat);

// UNLOCK SEAT
router.put("/unlock/:id", seatController.unlockSeat);

module.exports = router;