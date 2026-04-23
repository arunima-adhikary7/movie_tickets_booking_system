const bookingService = require("../services/bookingService");
const redis = require("../config/redis");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { showId, seatIds, price } = req.body;

    const result = await bookingService.createBooking({
      userId: req.user?.id || "660000000000000000000001", // fallback for testing
      showId,
      seatIds,
      price,
    });

    res.status(201).json({
      message: "Booking created",
      booking: result.booking,
      payment: result.payment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONFIRM BOOKING
const confirmBooking = async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;

    const booking = await bookingService.confirmBooking(
      bookingId,
      paymentId
    );

    res.status(200).json({
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET USER BOOKINGS
const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);

    res.status(200).json({
      message: "Bookings fetched",
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOCK SEATS (Redis)
const lockSeats = async (req, res) => {
  try {
    const { showId, seatIds } = req.body;
    const userId = req.user?.id;

    if (!showId || !seatIds) {
      return res.status(400).json({
        message: "showId and seatIds required",
      });
    }

    const key = `lock:${showId}`;
    const existing = await redis.get(key);

    let lockedSeats = existing ? JSON.parse(existing) : [];

    const conflict = seatIds.some((seat) =>
      lockedSeats.some((s) => s.seatId === seat)
    );

    if (conflict) {
      return res.status(400).json({
        message: "Seats already locked",
      });
    }

    const newLocks = [
      ...lockedSeats,
      ...seatIds.map((seatId) => ({
        seatId,
        userId,
        lockedAt: Date.now(),
      })),
    ];

    await redis.setEx(key, 300, JSON.stringify(newLocks));

    res.json({
      message: "Seats locked",
      lockedSeats: newLocks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BOOKING SUMMARY
const getBookingSummary = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await bookingService.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      bookingId: booking._id,
      movie: booking?.show?.movie?.title || "N/A",
      theatre: booking?.show?.theatre?.name || "N/A",
      screen: booking?.show?.screen || "N/A",
      seats: booking.seats.map((s) => s.seatNumber),
      ticketPrice: booking.totalAmount,
      convenienceFee: booking.totalAmount * 0.1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  confirmBooking,
  getUserBookings,
  lockSeats,
  getBookingSummary,
};