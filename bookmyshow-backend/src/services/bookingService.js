const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const paymentGateway = require("../utils/paymentGateway");

// CREATE BOOKING (INITIATE PAYMENT)
const createBooking = async ({ userId, showId, seatIds, price }) => {
  const seats = await Seat.find({ _id: { $in: seatIds }, show: showId });

  if (seats.length !== seatIds.length) {
    throw new Error("Invalid seats");
  }

  for (let seat of seats) {
    if (seat.isBooked) {
      throw new Error(`Seat ${seat.seatNumber} already booked`);
    }
  }

  // LOCK SEATS TEMPORARILY
  await Seat.updateMany(
    { _id: { $in: seatIds } },
    { isLocked: true, lockedAt: new Date() }
  );

  // CREATE FAKE PAYMENT
  const payment = paymentGateway.createPayment(seatIds.length * price);

  // CREATE BOOKING (PENDING)
  const booking = await Booking.create({
    user: userId,
    show: showId,
    seats: seatIds,
    totalAmount: payment.amount,
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
    // CONFIRM BOOKING
    booking.status = "CONFIRMED";
    await booking.save();

    // MARK SEATS AS BOOKED
    await Seat.updateMany(
      { _id: { $in: booking.seats } },
      { isBooked: true, isLocked: false }
    );

    return booking;
  } else {
    // RELEASE SEATS
    await Seat.updateMany(
      { _id: { $in: booking.seats } },
      { isLocked: false }
    );

    booking.status = "CANCELLED";
    await booking.save();

    throw new Error("Payment Failed, Booking Cancelled");
  }
};

module.exports = {
  createBooking,
  confirmBooking,
};