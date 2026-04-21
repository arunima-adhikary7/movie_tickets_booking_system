import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { theatres } from "../utils/constant";

const CinemaList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const availableCinemas = theatres.filter((t) =>
    t.movies?.includes(Number(id))
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Select Cinema
      </h1>

      <div className="space-y-4">

        {availableCinemas.map((cinema, index) => (
          <div
            key={index}
            className="bg-[#1c1c1c] p-4 rounded-lg flex justify-between items-center"
          >

            <div>
              <h2 className="text-lg font-semibold">
                {cinema.name}
              </h2>

              <p className="text-gray-400 text-sm">
                {cinema.distance}
              </p>

              {/* Showtimes */}
              <div className="flex gap-2 mt-2">
                {cinema.timings.map((time, i) => (
                  <span
                    key={i}
                    className="border border-gray-600 px-2 py-1 rounded text-sm cursor-pointer hover:bg-red-600"
                    onClick={() =>
                      navigate(`/movie/${id}/seats`)
                    }
                  >
                    {time.time}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default CinemaList;