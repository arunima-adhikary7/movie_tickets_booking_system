const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    genre: {
      type: [String], // ["Action", "Drama"]
      default: [],
    },

    posterUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);