import React from "react";
import { movies } from "../utils/constant.js";
import BannerSlider from "../components/shared/BannerSlider";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import dividerImg from '../assets/divider-img.jpg';
import Events from "./Events.jsx";
import { useNavigate } from "react-router-dom"; // ✅ import

const Home = () => {
  const navigate = useNavigate(); // ✅ init

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      
      {/* 🔴 Header */}
      <Header />

      {/* 🔴 Banner Section */}
      <BannerSlider />

      {/* 🔴 Movies Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Recommended Movies
          </h2>
        <span
  onClick={() => navigate("/getallmovies")}
  className="text-red-500 cursor-pointer hover:underline"
>
  See All
</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-7">
          
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)} // ✅ IMPORTANT
              className="cursor-pointer hover:scale-105 hover:shadow-lg transition"
            >
              
              {/* Poster */}
              <div className="relative rounded-lg overflow-hidden">
                
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full aspect-[2/3] md:aspect-[2/3.2] lg:aspect-[2/3.3] object-cover"
                />

                {/* ⭐ Rating Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black/90 text-white text-sm px-3 py-2 flex justify-between items-center">
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    ⭐ {movie.rating}/10
                  </span>
                  <span className="text-gray-300 text-xs">
                    {movie.votes} Votes
                  </span>
                </div>

                {/* Promoted Tag */}
                {movie.promoted && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                    Promoted
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="mt-2">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {movie.title}
                </h3>

                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {movie.genre}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Divider */}
      <div className="my-10 flex justify-center">
        <img
          src={dividerImg}
          alt="divider"
          className="w-full max-w-5xl object-contain"
        />
      </div>

      {/* Events */}
      <Events />

      {/* 🔴 Footer */}
      <Footer />
    </div>
  );
};

export default Home;