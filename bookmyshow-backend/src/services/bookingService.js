const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const paymentGateway = require("../utils/paymentGateway");

// CREATE BOOKING (INITIATE PAYMENT)
const createBooking = async ({ userId, showId, seatIds, price }) => {

  // ✅ FIX: use seatNumber instead of _id
  const seats = await Seat.find({
    seatNumber: { $in: seatIds },
    show: showId,
  });

  if (seats.length !== seatIds.length) {
    throw new Error("Invalid seats");
  }

  for (let seat of seats) {
    if (seat.isBooked) {
      throw new Error(`Seat ${seat.seatNumber} already booked`);
    }
  }

  // 🔒 LOCK SEATS
  await Seat.updateMany(
    { seatNumber: { $in: seatIds }, show: showId },
    { isLocked: true, lockedAt: new Date() }
  );

  // 💳 PAYMENT
  const totalAmount = seatIds.length * price;
  const payment = paymentGateway.createPayment(totalAmount);

  // 🧾 CREATE BOOKING (store seatNumbers)
  const booking = await Booking.create({
    user: userId,
    show: showId,
    seats: seatIds, // ✅ ["A1", "C7"]
    totalPrice: totalAmount,
    status: "PENDING",
  });

  return { booking, payment };
};


// CONFIRM PAYMENT
const confirmBooking = async (bookingId, paymentId) => {
  const payment = paymentGateway.verifyPayment(paymentId);

  const booking = await Booking.findById(bookingId);

  if (!booking) throw new Error("Booking not found");

  if (payment.status === "SUCCESS") {

    booking.status = "CONFIRMED";
    await booking.save();

    // ✅ FIX: update using seatNumber
    await Seat.updateMany(
      { seatNumber: { $in: booking.seats } },
      { isBooked: true, isLocked: false }
    );

    return booking;

  } else {

    await Seat.updateMany(
      { seatNumber: { $in: booking.seats } },
      { isLocked: false }
    );

    booking.status = "CANCELLED";
    await booking.save();

    throw new Error("Payment Failed, Booking Cancelled");
  }
};


// GET BOOKING BY ID
const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId)
    .populate({
      path: "show",
      populate: [
        { path: "movie" },
        { path: "theatre" }
      ]
    });
    // ❌ REMOVE THIS:
    // .populate("seats")  ← seats are strings now
};

module.exports = {
  createBooking,
  confirmBooking,
  getBookingById,
};