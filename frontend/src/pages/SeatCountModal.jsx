import React, { useState } from "react";

const SeatCountModal = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(2);
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Real-world Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px] transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl w-full max-w-[420px] shadow-2xl transform transition-all scale-100 flex flex-col">
        
        <div className="p-8 text-center">
          {/* Title */}
          <h2 className="text-[19px] font-bold text-slate-800 mb-8">
            How many seats?
          </h2>

          {/* Illustration with subtle "ground" shadow */}
          <div className="relative mb-10 h-28 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt="scooter"
              className="w-32 z-10"
            />
            <div className="absolute bottom-2 w-20 h-2 bg-slate-100 rounded-[100%] blur-sm"></div>
          </div>

          {/* Seat Numbers Selector */}
          <div className="flex justify-between items-center mb-10 px-1">
            {seatNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setSelected(num)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-bold transition-all duration-200
                  ${
                    selected === num
                      ? "bg-[#F84464] text-white shadow-lg shadow-pink-200 scale-110"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-3 gap-2 py-6 border-t border-slate-100">
            <PriceOption label="ROYALE" price="180" />
            <PriceOption label="DRESS CIRCLE" price="180" border />
            <PriceOption label="GALLERIA" price="180" />
          </div>
        </div>

        {/* Promo Section (Grey Bar) */}
        <div className="bg-[#F5F7FA] px-6 py-3 flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-amber-400 bg-white rounded-sm shrink-0"></div>
          <p className="text-[11px] leading-tight text-slate-500 font-medium">
            Book the <span className="font-bold text-slate-800 uppercase italic tracking-tighter">Bestseller Seats</span> in this cinema at no extra cost!
          </p>
        </div>

        {/* Action Button Container */}
        <div className="p-4 bg-white border-t border-slate-50">
          <button
            onClick={() => onSelect(selected)}
            className="w-full bg-[#F84464] hover:bg-[#E03A58] text-white py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-pink-100"
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for pricing to keep main code clean
const PriceOption = ({ label, price, border }) => (
  <div className={`text-center ${border ? "border-x border-slate-100" : ""}`}>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">{label}</p>
    <p className="text-sm font-black text-slate-800 leading-none">₹{price}</p>
    <p className="text-[9px] font-bold text-[#4ABD5D] mt-1.5 uppercase">Available</p>
  </div>
);

export default SeatCountModal;