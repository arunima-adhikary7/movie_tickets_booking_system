const Show = require("../models/Show");

// CREATE SHOW
const createShow = async (data) => {
  const show = await Show.create(data);
  return show;
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

module.exports = {
  createShow,
  getAllShows,
  getShowById,
};