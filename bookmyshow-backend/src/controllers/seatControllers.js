const seatService = require("../services/seatService");

// CREATE SEATS FOR SHOW
const createSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    const result = await seatService.createSeats(showId, seats);

    res.status(201).json({
      message: "Seats created successfully",
      seats: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET SEATS
const getSeats = async (req, res) => {
  try {
    const seats = await seatService.getSeatsByShow(req.params.showId);

    res.status(200).json({
      message: "Seats fetched successfully",
      seats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOCK SEAT
const lockSeat = async (req, res) => {
  try {
    const seat = await seatService.lockSeat(req.params.id);

    res.status(200).json({
      message: "Seat locked successfully",
      seat,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UNLOCK SEAT
const unlockSeat = async (req, res) => {
  try {
    const seat = await seatService.unlockSeat(req.params.id);

    res.status(200).json({
      message: "Seat unlocked successfully",
      seat,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSeats,
  getSeats,
  lockSeat,
  unlockSeat,
};