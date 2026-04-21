const bookingService = require("../services/bookingService.js");

/**
 * STEP 1: CREATE BOOKING (INITIATE PAYMENT)
 */
const createBooking = async (req, res) => {
  try {
    const { showId, seatIds, price } = req.body;

    const result = await bookingService.createBooking({
      userId: req.user.id,
      showId,
      seatIds,
      price,
    });

    res.status(201).json({
      message: "Payment initiated successfully",
      booking: result.booking,
      payment: result.payment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * STEP 2: CONFIRM PAYMENT → FINAL BOOKING
 */
const confirmBooking = async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;

    const booking = await bookingService.confirmBooking(
      bookingId,
      paymentId
    );

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET USER BOOKINGS
 */
const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);

    res.status(200).json({
      message: "User bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  confirmBooking,
  getUserBookings,
};