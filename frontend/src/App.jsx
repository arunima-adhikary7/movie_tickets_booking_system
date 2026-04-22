import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './components/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx'; // 👈 create this
import CinemaList from './pages/CinemaList.jsx'; 
import Signup from './pages/Signup.jsx'; 
import Login from './pages/Login.jsx';
function App() {
  return (
   
     <Routes>
  <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/cinemas" element={<CinemaList />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
      </Routes>
    
    
     
      
  );
}

export default App;