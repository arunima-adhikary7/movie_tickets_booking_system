import React, { useEffect, useState } from "react";
import API from "../service/API";
import { useNavigate } from "react-router-dom";
import Header from "../components/shared/Header"; // ✅ import your header

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/getmovie");
        setMovies(res.data.movies);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {/* ✅ HEADER */}
      <Header />

      <div className="min-h-screen bg-gray-100 text-black px-6 py-4">

        <h2 className="text-3xl font-bold mb-6">
          🎬 Now Showing
        </h2>

        {/* 🔄 Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading movies...</p>
        ) : (
          <>
            {/* 🎬 Movie Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {movies.map((movie) => (
                <div
                  key={movie._id}
                  onClick={() => navigate(`/movie/${movie._id}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition overflow-hidden"
                >

                  {/* Poster */}
                  <img
                    src={
                      movie.posterUrl ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {movie.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {movie.language} • {movie.duration} min
                    </p>

                    <p className="text-sm text-gray-500">
                      {movie.genre?.join(", ")}
                    </p>
                  </div>

                </div>
              ))}

            </div>

            {/* ❌ No movies */}
            {movies.length === 0 && (
              <p className="text-center mt-10 text-gray-500">
                No movies available 🎥
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllMovies;