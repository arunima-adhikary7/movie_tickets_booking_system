const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingControllers.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// CREATE BOOKING (LOGIN REQUIRED)
router.post("/", authMiddleware, bookingController.createBooking);

// GET USER BOOKINGS
router.get("/", authMiddleware, bookingController.getUserBookings);
router.post("/confirm", authMiddleware, bookingController.confirmBooking);

module.exports = router;