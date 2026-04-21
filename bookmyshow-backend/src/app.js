const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const movieRoutes = require("./routes/movieRoutes");

const cinemaRoutes = require("./routes/cinemaRoutes");
const showRoutes = require("./routes/showRoutes");
const seatRoutes = require("./routes/seatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🎬 BookMyShow Backend is Running");
});


app.use("/api/auth", authRoutes);



app.use("/api/movies", movieRoutes);


app.use("/api/cinemas", cinemaRoutes);


app.use("/api/shows", showRoutes);


app.use("/api/seats", seatRoutes);

app.use("/api/bookings", bookingRoutes);

module.exports = app;