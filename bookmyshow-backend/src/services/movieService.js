const Movie = require("../models/Movie");

// CREATE MOVIE
const createMovie = async (data) => {
  const movie = await Movie.create(data);
  return movie;
};

// GET ALL MOVIES
const getAllMovies = async () => {
  return await Movie.find();
};

// GET MOVIE BY ID
const getMovieById = async (id) => {
  return await Movie.findById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
};