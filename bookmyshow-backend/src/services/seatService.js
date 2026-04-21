const Seat = require("../models/Seat");

// CREATE SEATS FOR A SHOW
const createSeats = async (showId, seatList) => {
  const seats = seatList.map((seat) => ({
    show: showId,
    seatNumber: seat,
  }));

  return await Seat.insertMany(seats);
};

// GET SEATS BY SHOW
const getSeatsByShow = async (showId) => {
  return await Seat.find({ show: showId });
};

// LOCK SEAT (temporary hold)
const lockSeat = async (seatId) => {
  const seat = await Seat.findById(seatId);

  if (!seat) throw new Error("Seat not found");

  if (seat.isBooked) throw new Error("Seat already booked");

  seat.isLocked = true;
  seat.lockedAt = new Date();

  await seat.save();
  return seat;
};

// UNLOCK SEAT
const unlockSeat = async (seatId) => {
  const seat = await Seat.findById(seatId);

  if (!seat) throw new Error("Seat not found");

  seat.isLocked = false;
  seat.lockedAt = null;

  await seat.save();
  return seat;
};

module.exports = {
  createSeats,
  getSeatsByShow,
  lockSeat,
  unlockSeat,
};