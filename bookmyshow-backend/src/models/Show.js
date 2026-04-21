const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },

    screen: {
      type: Number,
      required: true,
    },

    showTime: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);