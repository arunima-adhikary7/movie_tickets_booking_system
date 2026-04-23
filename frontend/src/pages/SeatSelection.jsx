import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const rows = ["A", "B", "C", "D", "E", "F"];
const seatsPerRow = 10;

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { price, seatCount, showId } = location.state || {};

  const seatPrice = price || 150;
  const maxSeats = seatCount || 10;

  const [selectedSeats, setSelectedSeats] = useState([]);

  // ❗ this is still UI-only booked seats
  const bookedSeats = ["A2", "B4", "C6", "D8", "D9"];

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < maxSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const getSeatStyle = (seat) => {
    if (bookedSeats.includes(seat))
      return "bg-gray-200 text-gray-400 cursor-not-allowed border-transparent";

    if (selectedSeats.includes(seat))
      return "bg-green-500 text-white border-green-500 shadow-sm";

    return "bg-white text-green-600 border-green-600 hover:bg-green-50 hover:shadow-md";
  };

  // ✅ FIXED: Convert seatNumber → backend format
  const handleProceed = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 🔥 IMPORTANT (if using auth)
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          showId: showId,
          seatIds: selectedSeats, // ⚠️ sending seatNumbers
          price: seatPrice,
        }),
      });

      const data = await res.json();
      console.log("BOOKING RESPONSE 👉", data);

      if (data?.booking?._id) {
        navigate(`/checkout/${data.booking._id}`, {
          state: {
            totalPrice: selectedSeats.length * seatPrice,
            seats: selectedSeats,
          },
        });
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      
      {/* HEADER */}
      <header className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <button className="text-xl">✕</button>
          <div>
            <h1 className="text-sm font-bold">Interstellar</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              Grand Cinema: Hall 4 | Today, 08:30 PM
            </p>
          </div>
        </div>

        <div className="px-3 py-1 border border-gray-200 rounded text-xs font-semibold">
          {selectedSeats.length} / {maxSeats} Tickets
        </div>
      </header>

      {/* SEAT AREA */}
      <main className="flex-1 overflow-auto bg-gray-50/50 py-12 px-4 flex flex-col items-center">
        
        <div className="w-full max-w-md mb-12 flex flex-col items-center">
          <div className="w-full h-1 bg-gray-300 rounded-full shadow-[0_-4px_10px_rgba(0,0,0,0.1)] mb-2"></div>
          <p className="text-[10px] text-gray-400 font-bold tracking-[0.4em] uppercase">
            All eyes this way
          </p>
        </div>

        <div className="flex flex-col gap-4 min-w-max">
          {rows.map((row) => (
            <div key={row} className="flex gap-4 items-center">
              
              <span className="w-4 text-[10px] font-bold text-gray-400 uppercase">
                {row}
              </span>

              <div className="flex gap-2">
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatNumber = i + 1;
                  const seat = `${row}${seatNumber}`;
                  const isAisle = seatNumber === 3 || seatNumber === 8;

                  return (
                    <React.Fragment key={seat}>
                      <button
                        disabled={bookedSeats.includes(seat)}
                        onClick={() => handleSeatClick(seat)}
                        className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md border text-[10px] md:text-xs font-bold transition-all duration-150 ${getSeatStyle(seat)}`}
                      >
                        {seatNumber}
                      </button>

                      {isAisle && <div className="w-6" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* LEGEND */}
        <div className="flex gap-6 mt-16 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border border-green-600 rounded-sm"></div>
            Available
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            Selected
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            Sold
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] sticky bottom-0">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">

          {selectedSeats.length > 0 ? (
            <>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                  Total Price
                </span>

                <span className="text-xl font-extrabold text-slate-900">
                  ₹{selectedSeats.length * seatPrice}
                </span>
              </div>

              <button
                onClick={handleProceed}
                className="flex-1 max-w-[240px] bg-[#f84464] hover:bg-[#e03a58] text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-pink-100"
              >
                Pay ₹{selectedSeats.length * seatPrice}
              </button>
            </>
          ) : (
            <div className="w-full text-center py-2 text-gray-400 text-sm font-medium italic">
              Please select at least one seat to proceed
            </div>
          )}

        </div>
      </footer>
    </div>
  );
};

export default SeatSelection;