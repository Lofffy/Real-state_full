import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Properties from "./Components/Pages/Properties/Properties";
import Blog from "./Components/Pages/Blog/Blog";
import Services from "./Components/Pages/Services/Services";
import Home from "./Components/Pages/Home/Home";
import PropertiesDetails from "./Components/Pages/PropertiesDetials/PropertiesDetails";
import About from "./Components/Pages/About/AboutUs"
import Contact from "./Components/Pages/Contact/ContactUs"
import Register from "./Components/Pages/Register/Register";
import Login from "./Components/Pages/Login/Login";
import ProfilePage from './Components/Pages/Profile/Profile';
import OfferPropertyPage from './Components/Pages/OfferProp/OfferProperty'; // Adjust the path as needed

import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/properties" element={<Properties/>}/>
          <Route path="/Services" element={<Services />} />
          <Route path="/Blog" element={<Blog/>}/>
          <Route path="/properties/:propertyId" element={<PropertiesDetails />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/offer-property" element={<OfferPropertyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
