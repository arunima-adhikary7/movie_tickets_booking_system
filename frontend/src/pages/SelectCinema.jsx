import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/API";

const SelectCinema = () => {
  const { id } = useParams(); // movieId
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await API.get(`/shows/movie/${id}`);
        setShows(res.data.shows);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cinemas...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">

      <h2 className="text-2xl font-bold mb-6">
        🎬 Select Cinema & Show Time
      </h2>

      <div className="space-y-5 max-w-4xl mx-auto">

        {shows.map((show) => (
          <div
            key={show._id}
            className="bg-white p-5 rounded-xl shadow"
          >

            {/* CINEMA NAME */}
            <h3 className="text-lg font-semibold">
              {show.cinema.name}
            </h3>

            <p className="text-sm text-gray-500">
              {show.cinema.location?.city}
            </p>

            {/* PRICE */}
            <p className="text-sm mt-1 text-gray-600">
              💰 Price: ₹{show.price}
            </p>

            {/* TIME BUTTON */}
            <div className="flex flex-wrap gap-3 mt-4">

              <button
                onClick={() =>
                  navigate(`/movie/${id}/seats`, {
                    state: {
                      showId: show._id,
                      cinema: show.cinema.name,
                      time: show.showTime,
                      price: show.price,
                    },
                  })
                }
                className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-500 hover:text-white"
              >
                {new Date(show.showTime).toLocaleString()}
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SelectCinema;