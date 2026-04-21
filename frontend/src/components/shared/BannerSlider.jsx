import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ✅ Import images
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.avif";
import banner3 from "../../assets/banner3.avif";
import banner4 from "../../assets/banner4.avif";

const BannerSlider = () => {
  const images = [banner1, banner2, banner3, banner4];

  const [current, setCurrent] = useState(0);

  // ✅ Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Next / Prev
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 px-2">
      
      {/* Slider Container */}
      <div className="relative overflow-hidden rounded-xl">
        
        {/* Image */}
        <img
          src={images[current]}
          alt="banner"
          className="w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[300px] object-cover transition-all duration-500"
        />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black"
        >
          <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition ${
              current === index ? "bg-red-500 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;