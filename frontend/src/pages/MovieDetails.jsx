import React from "react";

import { allMovies } from "../utils/constant";
import { useParams, useNavigate } from "react-router-dom";
const MovieDetails = () => {
  const { id } = useParams();

const navigate = useNavigate();
  const movie = allMovies.find((m) => m.id === Number(id));
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-2xl">Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO BACKGROUND */}
      <div className="relative w-full h-[450px] md:h-[520px] overflow-hidden">

        <img
          src={movie.img}
          alt={movie.title}
          className="absolute w-full h-full object-cover scale-110 blur-sm opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* CONTENT OVER IMAGE */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex items-end pb-10">

          <div className="flex flex-col md:flex-row gap-6 items-end">

            {/* Poster */}
            <img
              src={movie.img}
              alt={movie.title}
              className="w-[180px] md:w-[220px] rounded-xl shadow-2xl border border-white/10"
            />

            {/* Info */}
            <div>

              <h1 className="text-3xl md:text-5xl font-bold">
                {movie.title}
              </h1>

              <p className="text-gray-300 mt-2">{movie.genre}</p>

              {/* Rating like BMS */}
              <div className="mt-3 flex items-center gap-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
                  ⭐ {movie.rating}/10
                </span>
                <span className="text-sm text-gray-400">
                  ({movie.votes} votes)
                </span>
              </div>

              {/* Extra Info Row */}
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-300">

                <span className="border border-gray-600 px-2 py-1 rounded">
                  {movie.languages}
                </span>

                <span className="border border-gray-600 px-2 py-1 rounded">
                  {movie.age}
                </span>

                <span className="border border-gray-600 px-2 py-1 rounded">
                  Action / Drama
                </span>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* BODY SECTION */}
      <div className="max-w-6xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="md:col-span-2">

            <h2 className="text-xl font-semibold mb-3">About the movie</h2>

            <p className="text-gray-400 leading-relaxed">
              Experience the ultimate cinematic journey with {movie.title}.
              Enjoy high-quality visuals, immersive sound, and blockbuster
              storytelling designed for big screens.
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Cast</h3>
              <p className="text-gray-400">Actor 1, Actor 2, Actor 3</p>
            </div>

          </div>

          {/* RIGHT SIDEBAR (LIKE BOOKMYSHOW) */}
          <div className="bg-[#1c1c1c] p-5 rounded-xl shadow-lg h-fit">

            <p className="text-sm text-gray-400">Movie Language</p>
            <p className="font-semibold">{movie.languages}</p>

            <p className="text-sm text-gray-400 mt-4">Censor</p>
            <p className="font-semibold">{movie.age}</p>

            <p className="text-sm text-gray-400 mt-4">Format</p>
            <p className="font-semibold">2D</p>

            {/* BOOK BUTTON */}
            <button className="mt-6 w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold text-white">
              Book tickets
            </button>

          </div>

        </div>
      </div>

      {/* FIXED BOOK BUTTON (MOBILE STYLE LIKE BMS) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black p-3 border-t border-gray-800">
      <button
          onClick={() => navigate(`/movie/${movie.id}/cinemas`)}
         className="mt-6 bg-red-600 px-6 py-2 rounded"
>
  Book Tickets
</button>
      </div>

    </div>
  );
};

export default MovieDetails;