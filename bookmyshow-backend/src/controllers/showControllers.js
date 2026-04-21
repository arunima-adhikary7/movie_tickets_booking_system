const showService = require("../services/showService");

// ADD SHOW
const addShow = async (req, res) => {
  try {
    const show = await showService.createShow(req.body);

    res.status(201).json({
      message: "Show created successfully",
      show,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL SHOWS
const getShows = async (req, res) => {
  try {
    const shows = await showService.getAllShows();

    res.status(200).json({
      message: "Shows fetched successfully",
      shows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SHOW BY ID
const getShowById = async (req, res) => {
  try {
    const show = await showService.getShowById(req.params.id);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({
      message: "Show fetched successfully",
      show,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addShow,
  getShows,
  getShowById,
};