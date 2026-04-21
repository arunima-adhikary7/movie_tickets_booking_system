import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx'; // 👈 create this
import CinemaList from './pages/CinemaList.jsx'; 
function App() {
  return (
   
     <Routes>
  <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/cinemas" element={<CinemaList />} />
      </Routes>
    
    
     
      
  );
}

export default App;