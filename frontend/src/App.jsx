import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './components/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx'; // 👈 create this
// import CinemaList from './pages/CinemaList.jsx'; 
import Signup from './pages/Signup.jsx'; 
import Login from './pages/Login.jsx';
import AddMovie from './pages/AddMovie.jsx'; 
import AllMovies from './pages/AllMovies.jsx';
import SeatSelection from './pages/SeatSelection.jsx';

import SeatCountModal from './pages/SeatCountModal.jsx';
import CheckoutPage from './pages/Checkoutpage.jsx';
import ContactDetails from './pages/ContactDetails.jsx';
import SelectCinema from "./pages/SelectCinema";
import CreateShow from "./pages/CreateShow.jsx";

function App() {
  return (
   
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* <Route path="/movie/:id/cinemas" element={<CinemaList />} /> */}
        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         <Route path="/createmovie" element={<AddMovie />} />
       <Route path="/getallmovies" element={<AllMovies />} />
       <Route path="/seatselection" element={<SeatSelection />} />
        <Route path="/s" element={<SeatCountModal />} />
       <Route path="/checkout" element={<CheckoutPage />} />
       <Route path="/contactdetails" element={<ContactDetails />} />

        <Route path="/movie/:id/cinemas" element={<SelectCinema />} />
         <Route path="/createshow" element={<CreateShow />} />
      </Routes>
    
    
     
      
  );
}

export default App;