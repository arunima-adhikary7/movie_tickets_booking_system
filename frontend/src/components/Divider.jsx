import React from "react";
import dividerImg from "../assets/divider-img.jpg"; // adjust path if needed

const Divider = () => {
  return (
    <div className="w-full flex justify-center my-6">
      <img
        src={dividerImg}
        alt="divider"
        className="w-full max-w-5xl object-contain"
      />
    </div>
  );
};

export default Divider;