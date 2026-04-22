const movieService = require("../services/movieService.js");

// ADD MOVIE
const addMovie = async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);

    res.status(201).json({
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL MOVIES
const getMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();

    res.status(200).json({
      message: "Movies fetched successfully",
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MOVIE BY ID
const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie fetched successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//////////////////////////////////////////////////////
// ⭐ ADD THIS (MISSING PART)
// UPDATE MOVIE
const updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  try {
    const movie = await movieService.deleteMovie(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};