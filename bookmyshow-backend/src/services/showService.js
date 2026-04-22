const Show = require("../models/Show.js");

// CREATE SHOW
const createShow = async (data) => {
  return await Show.create(data);
};

// GET ALL SHOWS
const getAllShows = async () => {
  return await Show.find()
    .populate("movie")
    .populate("cinema");
};

// GET SHOW BY ID
const getShowById = async (id) => {
  return await Show.findById(id)
    .populate("movie")
    .populate("cinema");
};

// ✅ IMPORTANT FIX: GET SHOWS BY MOVIE
const getShowsByMovie = async (movieId) => {
  try {
    const shows = await Show.find({ movie: movieId })
      .populate("cinema")
      .populate("movie");

    return shows;
  } catch (error) {
    console.log("Service Error:", error);
    throw error;
  }
};

module.exports = {
  createShow,
  getAllShows,
  getShowById,
  getShowsByMovie,
};