import React from "react";
import { events } from "../utils/constant";

const Events = () => {
  return (
    <div className="bg-[#f5f5f5]">

      {/* Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        <h2 className="text-2xl font-bold mb-6">
          The Best of Live Events
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

          {events.map((event, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden cursor-pointer group"
            >
              
              {/* Image Only */}
              <img
                src={event.img}
                alt="event"
                className="w-full h-[180px] md:h-[220px] object-cover rounded-lg group-hover:scale-105 transition duration-300"
              />

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Events;