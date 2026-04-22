import React, { useState, useEffect } from "react";
import API from "../service/API";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  // 🔐 ADMIN PROTECTION
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/"); // block non-admin
    }
  }, [navigate]);

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    duration: "",
    language: "",
    releaseDate: "",
    genre: "",
    posterUrl: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/movies/createmovie",
        {
          ...movie,
          duration: Number(movie.duration),
          genre: movie.genre
            ? movie.genre.split(",").map((g) => g.trim())
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎬 Movie Added Successfully");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding movie");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-xl shadow-xl border border-white/20">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          🎬 Add New Movie
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Movie Title"
            value={movie.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={movie.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
          />

          <input
            name="duration"
            type="number"
            placeholder="Duration (minutes)"
            value={movie.duration}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
            required
          />

          <input
            name="language"
            placeholder="Language (e.g. Hindi, English)"
            value={movie.language}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
            required
          />

          <input
            name="releaseDate"
            type="date"
            value={movie.releaseDate}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
            required
          />

          <input
            name="genre"
            placeholder="Genre (comma separated: Action, Drama)"
            value={movie.genre}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
          />

          <input
            name="posterUrl"
            placeholder="Poster Image URL"
            value={movie.posterUrl}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border"
          />

          <button
            type="submit"
            className="w-full bg-[#f84464] text-white p-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Add Movie
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddMovie;