const Movie = require("../models/Movie");

// CREATE
const createMovie = async (data) => {
  return await Movie.create(data);
};

// GET ALL
const getAllMovies = async () => {
  return await Movie.find();
};

// GET BY ID
const getMovieById = async (id) => {
  return await Movie.findById(id);
};

// UPDATE
const updateMovie = async (id, data) => {
  return await Movie.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};