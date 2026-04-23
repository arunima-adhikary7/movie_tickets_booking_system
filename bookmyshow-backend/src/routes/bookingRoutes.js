const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingControllers.js");

// CREATE BOOKING
router.post("/", bookingController.createBooking);

// CONFIRM BOOKING
router.post("/confirm", bookingController.confirmBooking);

// GET USER BOOKINGS
router.get("/", bookingController.getUserBookings);

// LOCK SEATS
router.post("/lock", bookingController.lockSeats);
router.get("/summary/:id", bookingController.getBookingSummary);

module.exports = router;