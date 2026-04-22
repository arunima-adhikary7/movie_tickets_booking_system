const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieControllers.js");

const authMiddleware = require("../middlewares/authMiddleware.js");
const isAdmin = require("../middlewares/isAdmin.js");

// ==========================
// 🎬 ADMIN ONLY ROUTES
// ==========================

// CREATE MOVIE (ADMIN ONLY)
router.post(
  "/createmovie",
  authMiddleware,
  isAdmin,
  movieController.addMovie
);

// UPDATE MOVIE (ADMIN ONLY)
router.put(
  "/updatemovie/:id",
  authMiddleware,
  isAdmin,
  movieController.updateMovie
);

// DELETE MOVIE (ADMIN ONLY)
router.delete(
  "/deletemovie/:id",
  authMiddleware,
  isAdmin,
  movieController.deleteMovie
);

// ==========================
// 🌍 PUBLIC ROUTES (USER + ADMIN)
// ==========================

// GET ALL MOVIES
router.get("/getmovie", movieController.getMovies);

// GET MOVIE BY ID
router.get("/getmovie/:id", movieController.getMovieById);

module.exports = router;