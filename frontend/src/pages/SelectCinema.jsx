import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const cinemas = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "City Centre",
    timings: ["10:00 AM", "1:00 PM", "4:00 PM", "9:00 PM"],
  },
  {
    id: 2,
    name: "INOX",
    location: "Mall Road",
    timings: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
  },
  {
    id: 3,
    name: "Cinepolis",
    location: "City Mall",
    timings: ["9:00 AM", "12:00 PM", "3:00 PM", "8:00 PM"],
  },
];

const SelectCinema = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">

      <h2 className="text-2xl font-bold mb-6">
        🎬 Select Cinema
      </h2>

      <div className="space-y-5 max-w-4xl mx-auto">

        {cinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="bg-white p-5 rounded-xl shadow"
          >

            {/* Cinema Name */}
            <h3 className="text-lg font-semibold">
              {cinema.name}
            </h3>

            <p className="text-sm text-gray-500">
              {cinema.location}
            </p>

            {/* Timings */}
            <div className="flex flex-wrap gap-3 mt-4">

              {cinema.timings.map((time, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(`/movie/${id}/seats`, {
                      state: { cinema: cinema.name, time },
                    })
                  }
                  className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-500 hover:text-white"
                >
                  {time}
                </button>
              ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SelectCinema;