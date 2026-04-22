import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bookMyScreen.png";
import API from "../service/API.js";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(res.data);

      // 🎉 show custom popup
      setShowPopup(true);

      // redirect after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">

      {/* 🔥 Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#f84464] opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-10 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* 🎥 Background logo */}
      <img
        src={logo}
        alt="bg-logo"
        className="absolute w-[500px] opacity-5 blur-2xl"
      />

      {/* 🧊 Signup Card */}
      <div className="relative z-10 w-96 p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        <p className="text-center text-gray-300 text-sm mb-6">
          Step into the world of movies 🎬
        </p>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-[#f84464]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-[#f84464]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-[#f84464]"
          />

          <button
            type="submit"
            className="w-full bg-[#f84464] text-white p-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Create Account
          </button>

        </form>

        {/* Login link */}
        <p className="text-center mt-5 text-sm text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#f84464] font-medium hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

      {/* 🎉 SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">

          <div className="bg-white p-6 rounded-2xl shadow-2xl text-center w-72 animate-bounce">

            <img
              src={logo}
              alt="logo"
              className="h-10 mx-auto mb-3"
            />

            <h2 className="text-lg font-bold text-gray-800">
              Signup Successful 🎉
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Welcome to BookMyScreen
            </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default Signup;