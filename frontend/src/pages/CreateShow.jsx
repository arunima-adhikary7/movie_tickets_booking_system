import React, { useEffect, useState } from "react";
import API from "../service/API";
import { useNavigate } from "react-router-dom";
import {
  Film,
  MapPin,
  Monitor,
  Clock,
  IndianRupee,
  Users,
  PlusCircle,
  Loader2,
} from "lucide-react";

const CreateShow = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    movie: "",
    cinema: "",
    screen: 1,
    showTime: "",
    price: "",
    availableSeats: 100,
  });

  // FETCH MOVIES + CINEMAS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await API.get("/movies/getmovie");
        const cinemaRes = await API.get("/cinemas");

        setMovies(movieRes.data.movies);
        setCinemas(cinemaRes.data.cinemas);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/shows",
        {
          movie: form.movie,               // ✅ OBJECT ID
          cinema: form.cinema,             // ✅ OBJECT ID
          screen: Number(form.screen),
          showTime: new Date(form.showTime),
          price: Number(form.price),
          availableSeats: Number(form.availableSeats),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎬 Show created successfully");
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error creating show");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 md:p-8">

      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT PANEL */}
        <div className="bg-red-600 md:w-1/3 p-8 text-white flex flex-col justify-center">
          <PlusCircle className="w-12 h-12 mb-4" />
          <h2 className="text-3xl font-bold mb-3">Create Show</h2>
          <p className="text-red-100 text-sm">
            Schedule movies in cinemas with time, screen and pricing.
          </p>
        </div>

        {/* FORM */}
        <div className="flex-1 p-8 md:p-10">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              {/* MOVIE SELECT */}
              <div>
                <label className="text-xs font-bold text-gray-500 flex gap-2 items-center">
                  <Film className="w-3 h-3" /> Movie
                </label>

                <select
                  name="movie"
                  value={form.movie}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  required
                >
                  <option value="">Select Movie</option>
                  {movies.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* CINEMA SELECT */}
              <div>
                <label className="text-xs font-bold text-gray-500 flex gap-2 items-center">
                  <MapPin className="w-3 h-3" /> Cinema
                </label>

                <select
                  name="cinema"
                  value={form.cinema}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  required
                >
                  <option value="">Select Cinema</option>
                  {cinemas.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name} - {c.location?.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* SHOW TIME */}
              <div>
                <label className="text-xs font-bold text-gray-500 flex gap-2 items-center">
                  <Clock className="w-3 h-3" /> Show Time
                </label>

                <input
                  type="datetime-local"
                  name="showTime"
                  value={form.showTime}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  required
                />
              </div>

              {/* PRICE */}
              <div>
                <label className="text-xs font-bold text-gray-500 flex gap-2 items-center">
                  <IndianRupee className="w-3 h-3" /> Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  required
                />
              </div>

              {/* SCREEN */}
              <div>
                <label className="text-xs font-bold text-gray-500 flex gap-2 items-center">
                  <Monitor className="w-3 h-3" /> Screen
                </label>

                <input
                  type="number"
                  name="screen"
                  value={form.screen}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                />
              </div>

              {/* SEATS */}
              <div>
                <label className="text-xs font-bold text-gray-500 flex gap-2 items-center">
                  <Users className="w-3 h-3" /> Seats
                </label>

                <input
                  type="number"
                  name="availableSeats"
                  value={form.availableSeats}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                />
              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F84464] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "➕ Create Show"
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateShow;