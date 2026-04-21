import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-gray-400 pt-10 pb-6 px-6">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        
        {/* Column 1 */}
        <div>
          <h2 className="text-white font-semibold mb-4">Movies Now Showing</h2>
          <ul className="space-y-2 text-sm">
            <li>Action Movies</li>
            <li>Comedy Movies</li>
            <li>Drama Movies</li>
            <li>Romantic Movies</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-white font-semibold mb-4">Upcoming Movies</h2>
          <ul className="space-y-2 text-sm">
            <li>Latest Releases</li>
            <li>Top Rated</li>
            <li>Trending</li>
            <li>Trailers</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-white font-semibold mb-4">Help</h2>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="text-white font-semibold mb-4">BookMyShow</h2>
          <p className="text-sm">
            Book tickets for movies, events, plays, sports and activities near you.
          </p>
        </div>
      </div>

      {/* Middle Section (Social Icons) */}
      <div className="flex justify-center space-x-6 py-6 text-xl">
        <i className="fab fa-facebook hover:text-white cursor-pointer"></i>
        <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
        <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
        <i className="fab fa-youtube hover:text-white cursor-pointer"></i>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookMyShow Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;