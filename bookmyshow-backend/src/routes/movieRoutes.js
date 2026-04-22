const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieControllers.js");

const authMiddleware = require("../middlewares/authMiddleware.js");
const isAdmin = require("../middlewares/isAdmin.js");

// ✅ IMPORT UPLOAD
const upload = require("../middlewares/upload.js");

// ==========================
// 🎬 ADMIN ONLY ROUTES
// ==========================

// ✅ CREATE MOVIE (WITH IMAGE UPLOAD)
router.post(
  "/createmovie",
  authMiddleware,
  isAdmin,
  upload.single("poster"),   // 🔥 VERY IMPORTANT
  movieController.addMovie
);

// UPDATE MOVIE
router.put(
  "/updatemovie/:id",
  authMiddleware,
  isAdmin,
  upload.single("poster"),   // 🔥 optional (for updating image)
  movieController.updateMovie
);

// DELETE MOVIE
router.delete(
  "/deletemovie/:id",
  authMiddleware,
  isAdmin,
  movieController.deleteMovie
);

// ==========================
// 🌍 PUBLIC ROUTES
// ==========================

// GET ALL
router.get("/getmovie", movieController.getMovies);

// GET BY ID
router.get("/getmovie/:id", movieController.getMovieById);

module.exports = router;