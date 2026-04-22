import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/API";
import { allMovies } from "../utils/constant";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // 🔥 Try DB first
        const res = await API.get(`/movies/getmovie/${id}`);
        setMovie(res.data.movie);
      } catch (err) {
        console.log("Not in DB → using static");

        // 🔥 fallback static
        const staticMovie = allMovies.find(
          (m) => String(m.id) === String(id)
        );

        if (staticMovie) {
          setMovie({
            _id: staticMovie.id,
            title: staticMovie.title,
            posterUrl: staticMovie.img,
            genre: [staticMovie.genre],
            language: staticMovie.languages,
            duration: 150,
            description:
              "Experience an amazing cinematic journey with this blockbuster movie.",
          });
        } else {
          setMovie(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-2xl animate-pulse">Loading...</h2>
      </div>
    );
  }

  // ❌ Not found
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-2xl">Movie not found 🎬</h2>
      </div>
    );
  }

  // 🔥 SAFE ID (important)
  const movieId = movie._id || movie.id;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <div className="relative w-full h-[450px] md:h-[520px] overflow-hidden">

        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="absolute w-full h-full object-cover scale-110 blur-sm opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex items-end pb-10">

          <div className="flex flex-col md:flex-row gap-6 items-end">

            {/* Poster */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-[180px] md:w-[220px] rounded-xl shadow-2xl border border-white/10"
            />

            {/* Info */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">
                {movie.title}
              </h1>

              <p className="text-gray-300 mt-2">
                {movie.genre?.join(", ")}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
                  ⭐ 8.5/10
                </span>
                <span className="text-sm text-gray-400">
                  (10K votes)
                </span>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-300">

                <span className="border border-gray-600 px-2 py-1 rounded">
                  {movie.language}
                </span>

                <span className="border border-gray-600 px-2 py-1 rounded">
                  U/A
                </span>

                <span className="border border-gray-600 px-2 py-1 rounded">
                  {movie.duration} min
                </span>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="md:col-span-2">

            <h2 className="text-xl font-semibold mb-3">
              About the movie
            </h2>

            <p className="text-gray-400 leading-relaxed">
              {movie.description || "No description available."}
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Cast
              </h3>
              <p className="text-gray-400">
                Coming soon...
              </p>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-[#1c1c1c] p-5 rounded-xl shadow-lg h-fit">

            <p className="text-sm text-gray-400">Language</p>
            <p className="font-semibold">{movie.language}</p>

            <p className="text-sm text-gray-400 mt-4">Duration</p>
            <p className="font-semibold">{movie.duration} min</p>

            <p className="text-sm text-gray-400 mt-4">Genre</p>
            <p className="font-semibold">
              {movie.genre?.join(", ")}
            </p>

            {/* BOOK BUTTON */}
            <button
              onClick={() => navigate(`/movie/${movieId}/cinemas`)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold text-white"
            >
              Book Tickets
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE BUTTON */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black p-3 border-t border-gray-800">
        <button
          onClick={() => navigate(`/movie/${movieId}/cinemas`)}
          className="w-full bg-red-600 px-6 py-3 rounded-lg font-semibold"
        >
          Book Tickets
        </button>
      </div>

    </div>
  );
};

export default MovieDetails;