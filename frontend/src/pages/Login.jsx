import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/bookMyScreen.png";
import API from "../service/API.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login successful 🎉");

      navigate("/");

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#f84464] opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-10 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* Logo bg */}
      <img
        src={logo}
        alt="bg-logo"
        className="absolute w-[500px] opacity-5 blur-2xl"
      />

      {/* Card */}
      <div className="relative z-10 w-96 p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="h-10" />
        </div>

        <h2 className="text-2xl font-bold text-center text-white">
          Welcome Back
        </h2>

        <p className="text-center text-gray-300 text-sm mb-6">
          Login to continue booking 🎬
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        <p className="text-center mt-5 text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#f84464] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;