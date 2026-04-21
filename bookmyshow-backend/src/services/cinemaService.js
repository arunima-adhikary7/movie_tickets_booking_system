const Cinema = require("../models/Cinema");

// CREATE CINEMA
const createCinema = async (data) => {
  const cinema = await Cinema.create(data);
  return cinema;
};

// GET ALL CINEMAS
const getAllCinemas = async () => {
  return await Cinema.find();
};

// GET CINEMA BY ID
const getCinemaById = async (id) => {
  return await Cinema.findById(id);
};

module.exports = {
  createCinema,
  getAllCinemas,
  getCinemaById,
};