const cinemaService = require("../services/cinemaService.js");

// ADD CINEMA
const addCinema = async (req, res) => {
  try {
    const cinema = await cinemaService.createCinema(req.body);

    res.status(201).json({
      message: "Cinema added successfully",
      cinema,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL CINEMAS
const getCinemas = async (req, res) => {
  try {
    const cinemas = await cinemaService.getAllCinemas();

    res.status(200).json({
      message: "Cinemas fetched successfully",
      cinemas,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CINEMA BY ID
const getCinemaById = async (req, res) => {
  try {
    const cinema = await cinemaService.getCinemaById(req.params.id);

    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    res.status(200).json({
      message: "Cinema fetched successfully",
      cinema,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCinema,
  getCinemas,
  getCinemaById,
};